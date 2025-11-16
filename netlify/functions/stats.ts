import { Handler } from '@netlify/functions'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json',
}

const handler: Handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    }
  }

  try {
    // Simple authentication check
    const authHeader = event.headers['authorization'] || event.headers['Authorization']
    if (!authHeader) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Token não fornecido' })
      }
    }

    const token = authHeader.replace('Bearer ', '')
    if (!token.startsWith('admin-token-')) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Token inválido' })
      }
    }

    // Return mock stats
    const mockStats = {
      total: 3,
      today: 0,
      week: 1
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockStats)
    }

  } catch (error) {
    console.error('Error in stats function:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno do servidor' })
    }
  }
}

export { handler }