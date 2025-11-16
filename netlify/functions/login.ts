import { Handler } from '@netlify/functions'

const ADMIN_EMAIL = 'admin@meetuptrae.com'
const ADMIN_PASSWORD = 'F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT'

const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    }
  }

  try {
    const { email, password } = JSON.parse(event.body || '{}')

    // Validate credentials
    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email e senha são obrigatórios' 
        })
      }
    }

    // Check credentials against hardcoded values
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          user: {
            email: ADMIN_EMAIL,
            name: 'Administrador'
          }
        })
      }
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email ou senha incorretos' 
        })
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erro interno do servidor' 
      })
    }
  }
}

export { handler }