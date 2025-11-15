import { Handler } from '@netlify/functions'
import serverless from 'serverless-http'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})

// Criar aplicação Express
const app = express()

// Middleware de segurança
app.use(helmet())
app.use(cors({
  origin: ['https://meetuptrae.netlify.app', 'http://localhost:5173'],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
})
app.use(limiter)

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Middleware de autenticação
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' })
  }
}

// Rotas de autenticação
app.post('/api/auth/login', async (req, res) => {
  try {
    const { password } = req.body
    const adminPassword = process.env.ADMIN_PASSWORD

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    res.json({ token })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Rotas de formulário
app.post('/api/forms/submit', async (req, res) => {
  try {
    const { nome, email, telefone, discord } = req.body

    // Verificar se já existe
    const { data: existing } = await supabase
      .from('submissions')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return res.status(409).json({ 
        error: 'Este email já foi cadastrado',
        message: 'Você já enviou seu formulário anteriormente'
      })
    }

    // Criar nova submissão
    const { data, error } = await supabase
      .from('submissions')
      .insert([{
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        telefone: telefone.replace(/\D/g, ''),
        discord: discord.trim(),
        ip_address: req.ip,
        user_agent: req.get('User-Agent') || null,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ 
          error: 'Este email já foi cadastrado',
          message: 'Você já enviou seu formulário anteriormente'
        })
      }
      throw error
    }

    res.status(201).json({
      message: 'Formulário enviado com sucesso!',
      submission: data
    })

  } catch (error) {
    console.error('Erro ao salvar submissão:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: 'Erro ao processar formulário'
    })
  }
})

// Rotas protegidas (admin)
app.get('/api/forms/submissions', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 50
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    res.json({
      submissions: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Erro ao buscar submissões:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: 'Erro ao buscar submissões'
    })
  }
})

app.get('/api/forms/stats', authenticateToken, async (req, res) => {
  try {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const [
      totalResult,
      todayResult,
      weekResult,
      lastSubmissionResult
    ] = await Promise.all([
      supabase.from('submissions').select('*', { count: 'exact', head: true }),
      supabase.from('submissions').select('*', { count: 'exact', head: true }).gte('created_at', startOfDay.toISOString()),
      supabase.from('submissions').select('*', { count: 'exact', head: true }).gte('created_at', startOfWeek.toISOString()),
      supabase.from('submissions').select('*').order('created_at', { ascending: false }).limit(1).single()
    ])

    res.json({
      total: totalResult.count || 0,
      today: todayResult.count || 0,
      thisWeek: weekResult.count || 0,
      lastSubmission: lastSubmissionResult.data || null,
    })

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: 'Erro ao buscar estatísticas'
    })
  }
})

// Tratamento de erros
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Erro não tratado:', error)
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado!'
  })
})

// Rota 404
app.use('*', (req: any, res: any) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// Exportar handler serverless
const serverlessHandler = serverless(app)

export const handler: Handler = async (event, context) => {
  return serverlessHandler(event, context)
}