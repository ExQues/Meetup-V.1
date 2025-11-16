import { Handler } from '@netlify/functions'

// Função de login ultra-simples sem dependências externas
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
    console.log('=== LOGIN SIMPLES ===')
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

    // Verificar senha
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: '✅ Login bem sucedido!',
        token: 'admin-token-' + Date.now(),
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