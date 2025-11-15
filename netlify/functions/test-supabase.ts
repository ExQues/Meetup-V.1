import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

// Função de teste simples para verificar conexão com Supabase
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
    console.log('=== TESTE SUPABASE DIRETO ===')
    console.log('Method:', event.httpMethod)
    console.log('Body:', event.body)

    // Configuração do Supabase
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE

    console.log('SUPABASE_URL:', supabaseUrl ? '✅ Configurado' : '❌ Ausente')
    console.log('SUPABASE_SERVICE_ROLE:', supabaseServiceKey ? '✅ Configurado' : '❌ Ausente')

    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Variáveis de ambiente não configuradas',
          details: {
            supabase_url: !!supabaseUrl,
            supabase_service_key: !!supabaseServiceKey
          }
        })
      }
    }

    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })

    console.log('✅ Cliente Supabase criado')

    // Testar conexão simples
    console.log('Testando conexão...')
    const { data, error } = await supabase
      .from('submissions')
      .select('id')
      .limit(1)

    if (error) {
      console.error('❌ Erro ao conectar com Supabase:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Erro ao conectar com Supabase',
          details: error.message,
          code: error.code,
          hint: error.hint
        })
      }
    }

    console.log('✅ Conexão bem sucedida!')
    console.log('Dados retornados:', data)

    // Testar inserção simples
    console.log('Testando inserção...')
    const testData = {
      nome: 'Teste Conexão',
      email: `teste${Date.now()}@teste.com`,
      telefone: '11999999999',
      discord: 'teste#1234',
      created_at: new Date().toISOString()
    }

    const { data: insertData, error: insertError } = await supabase
      .from('submissions')
      .insert([testData])
      .select()
      .single()

    if (insertError) {
      console.error('❌ Erro ao inserir:', insertError)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Erro ao inserir dados',
          details: insertError.message,
          code: insertError.code
        })
      }
    }

    console.log('✅ Inserção bem sucedida!')

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: '✅ Conexão com Supabase funcionando perfeitamente!',
        test_connection: {
          success: true,
          data_count: data?.length || 0
        },
        test_insertion: {
          success: true,
          inserted_id: insertData?.id
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
        error: 'Erro crítico no servidor',
        details: error.message,
        stack: error.stack
      })
    }
  }
}