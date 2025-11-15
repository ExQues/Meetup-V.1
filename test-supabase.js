import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config()

// Testar conexão com Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE

console.log('=== TESTE DE CONEXÃO SUPABASE ===')
console.log('URL:', supabaseUrl ? 'Configurada' : 'FALTANDO')
console.log('Service Key:', supabaseServiceKey ? 'Configurada' : 'FALTANDO')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente faltando!')
  process.exit(1)
}

try {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })

  console.log('✅ Cliente Supabase criado com sucesso')
  
  // Testar conexão
  supabase.from('submissions').select('*', { count: 'exact', head: true }).then(result => {
    if (result.error) {
      console.error('❌ Erro ao conectar com Supabase:', result.error.message)
      process.exit(1)
    } else {
      console.log('✅ Conexão com Supabase estabelecida com sucesso!')
      console.log('Total de registros:', result.count)
      process.exit(0)
    }
  }).catch(error => {
    console.error('❌ Erro na consulta:', error.message)
    process.exit(1)
  })

} catch (error) {
  console.error('❌ Erro ao criar cliente Supabase:', error.message)
  process.exit(1)
}