import { Handler } from '@netlify/functions'

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
    console.log('=== ENVIRONMENT VARIABLES TEST ===')
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Present' : '❌ Missing')
    console.log('SUPABASE_SERVICE_ROLE:', process.env.SUPABASE_SERVICE_ROLE ? '✅ Present' : '❌ Missing')
    console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Present' : '❌ Missing')

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Environment variables check completed',
        env_vars: {
          supabase_url: process.env.SUPABASE_URL ? 'Present' : 'Missing',
          supabase_service_role: process.env.SUPABASE_SERVICE_ROLE ? 'Present' : 'Missing',
          supabase_anon_key: process.env.SUPABASE_ANON_KEY ? 'Present' : 'Missing'
        }
      })
    }
  } catch (error) {
    console.error('❌ Erro no teste:', error)
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

export { handler }