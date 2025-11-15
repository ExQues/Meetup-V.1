// Script para debugar conexão com Supabase
import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE

console.log('=== DEBUG SUPABASE ===')
console.log('URL:', supabaseUrl ? '✅ Configurada' : '❌ Não configurada')
console.log('Service Key:', supabaseServiceKey ? '✅ Configurada' : '❌ Não configurada')

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('❌ Erro: Variáveis de ambiente não configuradas')
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
  console.log('\n=== TESTANDO CONEXÃO ===')
  
  // Test 1: Listar tabelas
  supabase.rpc('pg_tables').then(result => {
    console.log('Tabelas disponíveis:', result.data ? result.data.length : 'Erro')
  }).catch(err => {
    console.log('❌ Erro ao listar tabelas:', err.message)
  })

  // Test 2: Verificar permissões na tabela submissions
  console.log('\n=== TESTANDO PERMISSÕES ===')
  supabase.from('submissions').select('id').limit(1).then(result => {
    if (result.error) {
      console.log('❌ Erro ao acessar tabela submissions:', result.error.message)
      console.log('Código do erro:', result.error.code)
    } else {
      console.log('✅ Acesso à tabela submissions funcionando')
      console.log('Dados retornados:', result.data)
    }
  }).catch(err => {
    console.log('❌ Erro crítico:', err.message)
  })

  // Test 3: Verificar RLS (Row Level Security)
  console.log('\n=== VERIFICANDO RLS ===')
  supabase.rpc('get_rls_policies', { table_name: 'submissions' }).then(result => {
    console.log('RLS Policies:', result.data)
  }).catch(err => {
    console.log('RLS não disponível ou erro:', err.message)
  })

} catch (error) {
  console.log('❌ Erro ao criar cliente Supabase:', error.message)
}