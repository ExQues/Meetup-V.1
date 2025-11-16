import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

// Função para criar usuário admin padrão
export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  try {
    console.log('=== SETUP ADMIN USER ===')

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE

    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Supabase não configurado' })
      }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Senha padrão do seu .env
    const adminPassword = 'F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT'
    
    // Como não temos bcrypt no Netlify, vamos usar um hash simples para teste
    // Em produção, você deve usar bcrypt
    const simpleHash = Buffer.from(adminPassword).toString('base64')

    // Inserir usuário admin
    const { data, error } = await supabase
      .from('admin_users')
      .upsert({
        email: 'admin@meetuptrae.com',
        password_hash: simpleHash, // Usando hash simples para teste
        nome: 'Administrador',
        role: 'admin',
        is_active: true
      }, {
        onConflict: 'email'
      })
      .select()

    if (error) {
      console.error('❌ Erro ao criar usuário:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Erro ao criar usuário', details: error.message })
      }
    }

    console.log('✅ Usuário admin criado com sucesso!')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Usuário admin criado com sucesso',
        user: data[0]
      })
    }

  } catch (error) {
    console.error('❌ Erro crítico:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno', details: error.message })
    }
  }
}