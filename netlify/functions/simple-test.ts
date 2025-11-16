import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

// Configuração direta do Supabase (temporário para teste)
const SUPABASE_URL = 'https://cruvgucbbvxlvyffpskm.supabase.co'
const SUPABASE_SERVICE_ROLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyNDgxMiwiZXhwIjoyMDc4ODAwODEyfQ.55p-Bt1vWm0ZtShl7N1OHV3O1xbejtR4TmIfKe3OMxc'

// Criar cliente Supabase
let supabase: any = null
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })
  console.log('✅ Cliente Supabase criado com sucesso (config direta)')
} catch (error) {
  console.error('❌ Erro ao criar cliente Supabase:', error)
}

const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    console.log('=== SIMPLE SUPABASE TEST ===')
    
    if (!supabase) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Supabase não configurado',
          details: 'Cliente Supabase não foi inicializado'
        })
      }
    }

    // Testar conexão com Supabase
    console.log('🔄 Testando conexão com Supabase...')
    
    // Test 1: Buscar quantidade de submissões
    const { count, error: countError } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.log('❌ Erro ao contar submissões:', countError)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Erro ao acessar tabela submissions',
          details: countError.message,
          code: countError.code
        })
      }
    }

    console.log('✅ Conexão bem sucedida! Total de submissões:', count)

    // Test 2: Buscar algumas submissões (limitar a 5)
    const { data: submissions, error: dataError } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (dataError) {
      console.log('❌ Erro ao buscar submissões:', dataError)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Erro ao buscar dados',
          details: dataError.message,
          code: dataError.code
        })
      }
    }

    console.log('✅ Dados recuperados com sucesso!')

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Supabase conectado com sucesso!',
        stats: {
          total_submissions: count,
          recent_submissions: submissions?.length || 0
        },
        sample_data: submissions?.map(sub => ({
          id: sub.id,
          nome: sub.nome,
          email: sub.email,
          created_at: sub.created_at
        })) || []
      })
    }

  } catch (error) {
    console.error('❌ Erro crítico:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro crítico no servidor',
        details: error.message 
      })
    }
  }
}

export { handler }