// Testar se a URL da API está configurada corretamente
console.log('=== VERIFICAÇÃO DE CONFIGURAÇÃO ===')
console.log('VITE_API_URL:', process.env.VITE_API_URL)
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('Admin Password:', process.env.VITE_ADMIN_PASS ? 'Configurada' : 'Faltando')

// Simular o que o frontend vai usar
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5004/api'
console.log('\nURL que o frontend vai usar:', API_BASE_URL)

// Verificar se é a URL do Netlify
const isNetlifyUrl = API_BASE_URL.includes('netlify.app')
console.log('É URL do Netlify?', isNetlifyUrl ? '✅ SIM' : '❌ NÃO')

if (!isNetlifyUrl) {
  console.log('\n⚠️  ATENÇÃO: A URL não aponta para o Netlify!')
  console.log('O frontend vai tentar conectar em:', API_BASE_URL)
} else {
  console.log('\n✅ Configuração correta! O frontend vai conectar no Netlify.')
}