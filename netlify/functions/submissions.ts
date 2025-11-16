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

    // Return mock data for now
    const mockData = {
      submissions: [
        {
          id: '1',
          nome: 'João Silva',
          email: 'joao@example.com',
          telefone: '(11) 98765-4321',
          discord: 'joao_silva',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          nome: 'Maria Santos',
          email: 'maria@example.com',
          telefone: '(21) 99876-5432',
          discord: 'maria_santos',
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          nome: 'Pedro Oliveira',
          email: 'pedro@example.com',
          telefone: '(31) 91234-5678',
          discord: 'pedro_oliveira',
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ],
      total: 3,
      page: 1,
      totalPages: 1
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockData)
    }

  } catch (error) {
    console.error('Error in submissions function:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno do servidor' })
    }
  }
}

export { handler }