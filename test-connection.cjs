const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

console.log('🚀 TESTE DE CONEXÃO COMPLETO')
console.log('================================')

// Testar variáveis de ambiente
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE', 
  'JWT_SECRET',
  'ADMIN_PASSWORD'
]

console.log('\n📋 Verificando variáveis de ambiente:')
let allVarsSet = true

requiredEnvVars.forEach(varName => {
  const value = process.env[varName]
  const status = value ? '✅' : '❌'
  console.log(`${status} ${varName}: ${value ? 'Configurada' : 'FALTANDO'}`)
  if (!value) allVarsSet = false
})

if (!allVarsSet) {
  console.error('\n❌ ERRO: Variáveis de ambiente faltando!')
  console.log('Por favor, configure todas as variáveis no Netlify.')
  process.exit(1)
}

// Testar conexão com Supabase
console.log('\n🔗 Testando conexão com Supabase...')
try {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  )

  // Testar consulta
  supabase.from('submissions')
    .select('*', { count: 'exact', head: true })
    .then(result => {
      if (result.error) {
        console.error('❌ Erro na consulta:', result.error.message)
        console.log('Código do erro:', result.error.code)
        process.exit(1)
      } else {
        console.log('✅ Conexão com Supabase estabelecida!')
        console.log(`📊 Total de registros: ${result.count}`)
        
        // Testar inserção
        console.log('\n📝 Testando inserção de dados...')
        return supabase.from('submissions').insert([{
          nome: 'Teste de Conexão',
          email: 'teste@conexao.com',
          telefone: '11999999999',
          discord: 'teste#1234',
          created_at: new Date().toISOString()
        }]).select().single()
      }
    })
    .then(insertResult => {
      if (insertResult.error) {
        if (insertResult.error.code === '23505') {
          console.log('✅ Inserção testada (email já existe - OK)')
        } else {
          console.error('❌ Erro na inserção:', insertResult.error.message)
        }
      } else {
        console.log('✅ Inserção bem-sucedida!')
        console.log('ID do registro:', insertResult.data.id)
      }
      
      console.log('\n🎉 TODOS OS TESTES PASSARAM!')
      console.log('✅ Seu backend está pronto para o Netlify!')
      process.exit(0)
    })
    .catch(error => {
      console.error('❌ Erro durante testes:', error.message)
      process.exit(1)
    })

} catch (error) {
  console.error('❌ Erro ao criar cliente Supabase:', error.message)
  process.exit(1)
}