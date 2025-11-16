import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// Função de login com email e senha usando Supabase
export const handler: Handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    console.log('=== AUTH LOGIN COM SUPABASE ===')
    console.log('Method:', event.httpMethod)
    console.log('Body:', event.body)

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Método não permitido' })
      }
    }

    const { email, password } = JSON.parse(event.body || '{}')
    console.log('Email recebido:', email ? '✅ Presente' : '❌ Ausente')
    console.log('Password recebido:', password ? '✅ Presente' : '❌ Ausente')

    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email e senha são obrigatórios' })
      }
    }

    // Configurar Supabase
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE

    console.log('SUPABASE_URL:', supabaseUrl ? '✅ Configurado' : '❌ Ausente')
    console.log('SUPABASE_SERVICE_ROLE:', supabaseServiceKey ? '✅ Configurado' : '❌ Ausente')

    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuração do Supabase incompleta',
          details: 'Variáveis de ambiente ausentes'
        })
      }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })

    // Buscar usuário no banco de dados
    const { data: user, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .single()

    if (userError || !user) {
      console.log('❌ Usuário não encontrado ou inativo')
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Email ou senha incorretos',
          details: 'Usuário não encontrado'
        })
      }
    }

    console.log('✅ Usuário encontrado:', user.email)

    // Verificar senha (usando hash simples para teste no Netlify)
    const expectedHash = Buffer.from(password).toString('base64')
    const isPasswordValid = expectedHash === user.password_hash
    
    if (!isPasswordValid) {
      console.log('❌ Senha incorreta')
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Email ou senha incorretos',
          details: 'Senha inválida'
        })
      }
    }

    console.log('✅ Senha correta! Login bem sucedido!')

    // Atualizar último login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)

    // Criar token simples
    const token = `admin-token-${user.id}-${Date.now()}`

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: '✅ Login bem sucedido!',
        token: token,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          role: user.role
        },
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error('❌ Erro crítico:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erro interno do servidor',
        details: error.message
      })
    }
  }
}