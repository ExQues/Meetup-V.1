import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

// Função de login ultra-simples para testar conexão
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
    console.log('=== LOGIN ULTRA-SIMPLES ===')
    console.log('Method:', event.httpMethod)
    console.log('Body:', event.body)

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Método não permitido' })
      }
    }

    const { password } = JSON.parse(event.body || '{}')
    console.log('Password recebido:', password ? '✅ Presente' : '❌ Ausente')

    // Verificar senha sem usar JWT
    const adminPassword = process.env.ADMIN_PASSWORD
    console.log('ADMIN_PASSWORD:', adminPassword ? '✅ Configurado' : '❌ Ausente')

    if (!adminPassword) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'ADMIN_PASSWORD não configurado',
          details: 'Variável de ambiente ausente'
        })
      }
    }

    if (password !== adminPassword) {
      console.log('❌ Senha incorreta')
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Senha incorreta',
          received: password ? 'Presente' : 'Ausente'
        })
      }
    }

    console.log('✅ Senha correta! Login bem sucedido!')

    // Testar conexão com Supabase
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE

    console.log('SUPABASE_URL:', supabaseUrl ? '✅ Configurado' : '❌ Ausente')
    console.log('SUPABASE_SERVICE_ROLE:', supabaseServiceKey ? '✅ Configurado' : '❌ Ausente')

    let supabaseStatus = 'Não testado'
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          }
        })

        const { count, error } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })

        if (error) {
          supabaseStatus = `Erro: ${error.message}`
        } else {
          supabaseStatus = `Conectado - ${count} registros`
        }
      } catch (err) {
        supabaseStatus = `Erro crítico: ${err.message}`
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: '✅ Login bem sucedido!',
        token: 'simple-test-token-12345',
        supabase_status: supabaseStatus,
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