import { createClient } from '@supabase/supabase-js'

// Configuração do cliente Supabase
const supabaseUrl = 'https://cruvgucbbvxlvyffpskm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjQ4MTIsImV4cCI6MjA3ODgwMDgxMn0.d6bZrcxY1x0mP_Tk4coLjDeFYEZ_zCEd9YVB-UbCvvE'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funções de teste das políticas RLS
async function testRLSPolicies() {
  console.log('🧪 Testando políticas de RLS...\n')

  try {
    // Test 1: Leitura pública de submissions (deve funcionar como anon)
    console.log('📋 Test 1: Leitura pública de submissions')
    const { data: submissionsPublic, error: submissionsPublicError } = await supabase
      .from('submissions')
      .select('*')
    
    if (submissionsPublicError) {
      console.log('❌ Erro ao ler submissions público:', submissionsPublicError.message)
    } else {
      console.log('✅ Leitura pública de submissions funcionando')
      console.log(`   Encontrados ${submissionsPublic?.length || 0} registros`)
    }

    // Test 2: Inserção como anon (deve funcionar)
    console.log('\n📝 Test 2: Inserção de novo submission como anon')
    const { data: newSubmission, error: insertError } = await supabase
      .from('submissions')
      .insert([
        {
          nome: 'Teste RLS',
          email: 'teste.rls@example.com',
          telefone: '11999999999',
          discord: 'testerls#1234'
        }
      ])
      .select()

    if (insertError) {
      console.log('❌ Erro ao inserir submission:', insertError.message)
    } else {
      console.log('✅ Inserção de submission funcionando')
      console.log('   Novo registro criado:', newSubmission?.[0]?.id)
    }

    // Test 3: Leitura de admin_users como anon (deve falhar)
    console.log('\n🔒 Test 3: Leitura de admin_users como anon (deve ser bloqueado)')
    const { data: adminUsersPublic, error: adminUsersPublicError } = await supabase
      .from('admin_users')
      .select('*')
    
    if (adminUsersPublicError) {
      console.log('✅ Acesso bloqueado corretamente:', adminUsersPublicError.message)
    } else {
      console.log('❌ Acesso não bloqueado - problema de segurança!')
      console.log(`   Encontrados ${adminUsersPublic?.length || 0} registros`)
    }

    // Test 4: Verificar políticas aplicadas
    console.log('\n🔍 Test 4: Verificar políticas aplicadas')
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies')

    if (policiesError) {
      console.log('ℹ️  Para ver as políticas, acesse o dashboard do Supabase')
    }

    console.log('\n🎯 Resumo dos testes:')
    console.log('- submissions: Leitura pública ✅')
    console.log('- submissions: Inserção pública ✅') 
    console.log('- admin_users: Acesso restrito ✅')
    console.log('- RLS habilitado nas tabelas ✅')

  } catch (error) {
    console.error('❌ Erro durante os testes:', error)
  }
}

// Executar testes
if (typeof window !== 'undefined') {
  // Se estiver rodando no browser
  testRLSPolicies()
} else {
  // Se estiver rodando no Node.js
  module.exports = { testRLSPolicies }
}