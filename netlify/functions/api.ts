import { Handler } from '@netlify/functions'
import serverless from 'serverless-http'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

// Criar aplicação Express
const app = express()

// Middleware de logging detalhado
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  console.log('Headers:', JSON.stringify(req.headers, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  next()
})

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: false, // Desabilitar CSP para evitar conflitos
  crossOriginEmbedderPolicy: false // Desabilitar para permitir CORS
}))

app.use(cors({
  origin: ['https://meetuptrae.netlify.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Rate limiting mais permissivo para testes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Aumentar limite para testes
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
})
app.use(limiter)

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Configuração do Supabase com validação
let supabase: any = null
try {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE
  
  console.log('=== SUPABASE CONFIG ===')
  console.log('SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Não configurada')
  console.log('SUPABASE_SERVICE_ROLE:', supabaseServiceKey ? '✅ Configurada' : '❌ Não configurada')
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ ERRO CRÍTICO: Variáveis de ambiente do Supabase não configuradas!')
  } else {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
    console.log('✅ Cliente Supabase criado com sucesso')
  }
} catch (error) {
  console.error('❌ Erro ao criar cliente Supabase:', error)
}

// Middleware de autenticação SIMPLIFICADO para testes
const authenticateToken = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log('=== AUTH SIMPLES ===')
    console.log('Auth Header:', authHeader)
    console.log('Token:', token ? 'Presente' : 'Ausente')

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }

    // Para testes, aceitar qualquer token que comece com 'admin-token-'
    if (token.startsWith('admin-token-')) {
      console.log('✅ Token válido (modo teste)')
      req.user = { role: 'admin' }
      return next()
    }

    // Se tiver JWT_SECRET, tentar verificar o token JWT
    const jwtSecret = process.env.JWT_SECRET
    if (jwtSecret) {
      try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        console.log('✅ Token JWT válido, usuário:', decoded)
        return next()
      } catch (jwtError) {
        console.log('❌ Token JWT inválido')
      }
    }

    console.log('❌ Token inválido')
    return res.status(403).json({ error: 'Token inválido' })
  } catch (error) {
    console.error('❌ Erro na autenticação:', error)
    return res.status(403).json({ error: 'Token inválido' })
  }
}

// Rota de health check detalhada
app.get('/api/health', async (req, res) => {
  try {
    console.log('=== HEALTH CHECK ===')
    
    let supabaseStatus = '❌ Não conectado'
    if (supabase) {
      try {
        const { data, error } = await supabase.from('submissions').select('id').limit(1)
        if (error) {
          supabaseStatus = `❌ Erro: ${error.message}`
        } else {
          supabaseStatus = '✅ Conectado'
        }
      } catch (err) {
        supabaseStatus = `❌ Erro crítico: ${err.message}`
      }
    }
    
    const health = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      supabase: supabaseStatus,
      environment: {
        supabase_url: process.env.SUPABASE_URL ? '✅ Configurado' : '❌ Ausente',
        supabase_service_role: process.env.SUPABASE_SERVICE_ROLE ? '✅ Configurado' : '❌ Ausente',
        jwt_secret: process.env.JWT_SECRET ? '✅ Configurado' : '❌ Ausente',
        admin_password: process.env.ADMIN_PASSWORD ? '✅ Configurado' : '❌ Ausente'
      }
    }
    
    console.log('Health Check Result:', health)
    res.json(health)
  } catch (error) {
    console.error('❌ Erro no health check:', error)
    res.status(500).json({ 
      status: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Rota de login SIMPLIFICADA para testes
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('=== LOGIN SIMPLES ===')
    const { password } = req.body
    const adminPassword = process.env.ADMIN_PASSWORD

    console.log('Password recebido:', password ? '✅ Presente' : '❌ Ausente')
    console.log('ADMIN_PASSWORD:', adminPassword ? '✅ Configurado' : '❌ Ausente')

    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD não configurado')
      return res.status(500).json({ 
        error: 'Erro de configuração',
        details: 'ADMIN_PASSWORD não configurado'
      })
    }

    if (password !== adminPassword) {
      console.log('❌ Senha incorreta')
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    console.log('✅ Senha correta! Login bem sucedido!')
    
    // Criar token simples sem JWT para testes
    const simpleToken = 'admin-token-' + Date.now()
    
    res.json({ 
      token: simpleToken, 
      message: 'Login realizado com sucesso',
      type: 'simple-token'
    })
  } catch (error) {
    console.error('❌ Erro no login:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    })
  }
})

// Rota de estatísticas com proteção
app.get('/api/forms/stats', authenticateToken, async (req, res) => {
  try {
    console.log('=== GET STATS ===')
    
    if (!supabase) {
      return res.status(500).json({ 
        error: 'Supabase não configurado',
        details: 'Verifique as variáveis de ambiente'
      })
    }

    const { count, error } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('❌ Erro ao buscar estatísticas:', error)
      return res.status(500).json({ 
        error: 'Erro ao buscar estatísticas',
        details: error.message 
      })
    }

    console.log('✅ Estatísticas recuperadas:', count)
    res.json({ total: count || 0 })
  } catch (error) {
    console.error('❌ Erro crítico nas estatísticas:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    })
  }
})

// Rota de submissões com proteção
app.get('/api/forms/submissions', authenticateToken, async (req, res) => {
  try {
    console.log('=== GET SUBMISSIONS ===')
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 50
    const offset = (page - 1) * limit

    if (!supabase) {
      return res.status(500).json({ 
        error: 'Supabase não configurado',
        details: 'Verifique as variáveis de ambiente'
      })
    }

    const { data, error, count } = await supabase
      .from('submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('❌ Erro ao buscar submissões:', error)
      return res.status(500).json({ 
        error: 'Erro ao buscar submissões',
        details: error.message 
      })
    }

    console.log(`✅ ${data?.length || 0} submissões recuperadas`)
    res.json({
      submissions: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('❌ Erro crítico ao buscar submissões:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    })
  }
})

// Rota de submissão pública (sem autenticação)
app.post('/api/forms/submit', async (req, res) => {
  try {
    console.log('=== FORM SUBMISSION ===')
    const { nome, email, telefone, discord } = req.body

    console.log('Dados recebidos:', { nome, email, telefone, discord })

    if (!supabase) {
      console.error('❌ Supabase não configurado')
      return res.status(500).json({ 
        error: 'Erro de configuração do servidor',
        details: 'Supabase não configurado'
      })
    }

    // Validação básica
    if (!nome || !email) {
      console.log('❌ Campos obrigatórios ausentes')
      return res.status(400).json({ 
        error: 'Nome e email são obrigatórios' 
      })
    }

    console.log('Verificando email existente...')
    const { data: existing } = await supabase
      .from('submissions')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      console.log('❌ Email já cadastrado')
      return res.status(409).json({ 
        error: 'Este email já foi cadastrado',
        message: 'Você já enviou seu formulário anteriormente'
      })
    }

    console.log('Criando nova submissão...')
    const { data, error } = await supabase
      .from('submissions')
      .insert([{
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        telefone: telefone ? telefone.replace(/\D/g, '') : null,
        discord: discord ? discord.trim() : null,
        ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown',
        user_agent: req.get('User-Agent') || null,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Erro ao inserir no Supabase:', error)
      if (error.code === '23505') {
        return res.status(409).json({ 
          error: 'Este email já foi cadastrado',
          message: 'Você já enviou seu formulário anteriormente'
        })
      }
      return res.status(500).json({ 
        error: 'Erro ao salvar formulário',
        details: error.message 
      })
    }

    console.log('✅ Submissão criada com sucesso:', data?.id)
    res.status(201).json({
      message: 'Formulário enviado com sucesso!',
      id: data?.id
    })
  } catch (error) {
    console.error('❌ Erro crítico na submissão:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    })
  }
})

// Middleware de erro global
app.use((error: any, req: any, res: any, next: any) => {
  console.error('=== ERRO GLOBAL ===')
  console.error('Erro:', error)
  console.error('Stack:', error.stack)
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: error.message,
    timestamp: new Date().toISOString()
  })
})

// Rota 404
app.use('*', (req, res) => {
  console.log(`=== 404 - Rota não encontrada: ${req.method} ${req.originalUrl}`)
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method
  })
})

// Handler para Netlify
const handler = serverless(app)

export { handler }