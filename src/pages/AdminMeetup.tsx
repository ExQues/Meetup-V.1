import { useEffect, useState, useMemo } from "react"
import { DashboardCard } from "@/components/ui/dashboard-card"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { SubmissionsTable } from "@/components/layout/SubmissionsTable"
import { DashboardStats } from "@/components/features/DashboardStats"
import { DashboardCharts } from "@/components/features/DashboardCharts"
import { RecentSubmissions } from "@/components/layout/RecentSubmissions"
import { apiService } from "@/services/api"
import { LogOut, User, Shield } from "lucide-react"

export type Submission = {
  id?: string;
  nome: string
  email: string
  telefone: string
  discord: string
  created_at: string
}

export default function AdminMeetup() {
  const [authed, setAuthed] = useState(() => {
    const token = localStorage.getItem('admin_token');
    return !!token;
  })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [stats, setStats] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Carregar dados iniciais
  useEffect(() => {
    if (!authed) return
    loadData()
  }, [authed])

  async function loadData() {
    setLoading(true)
    try {
      const submissionsData = await apiService.getSubmissions()
      
      console.log('📊 Dados carregados:', submissionsData)
      
      // Ajustar para diferentes formatos de resposta
      const submissions = submissionsData?.submissions || submissionsData || []
      const total = submissionsData?.total || submissions?.length || 0
      
      setSubmissions(submissions)
      setStats({
        total: submissions.length,
        today: submissions.filter(s => new Date(s.created_at).toDateString() === new Date().toDateString()).length,
        thisWeek: submissions.filter(s => {
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return new Date(s.created_at) >= weekAgo
        }).length,
        month: 0,
        growth: '0%',
        lastSubmission: submissions.length > 0 ? submissions[0] : null
      })
    } catch (error: any) {
      console.error('❌ Erro ao carregar dados:', error)
      
      // Se for erro de token, fazer logout
      if (error.message.includes('Token inválido') || error.message.includes('Token expirado')) {
        handleLogout()
        return
      }
      
      // Se for erro de rede/Supabase, mostrar mensagem amigável
      console.log('⚠️ Usando dados de demonstração ou verificando conexão...')
      
      // Garantir que sempre tenhamos dados válidos mesmo em caso de erro
      setSubmissions([])
      setStats({
        total: 0,
        today: 0,
        thisWeek: 0,
        month: 0,
        growth: '0%',
        lastSubmission: null
      })
      
      // Não faz logout em caso de erro de rede, apenas loga
      if (error.message.includes('Erro na requisição') || error.message.includes('Failed to fetch')) {
        console.log('📡 Problema de conexão detectado - os dados podem estar em modo demonstração')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      // Login simples - apenas define como autenticado
      if (email && password) {
        setAuthed(true)
        setEmail("")
        setPassword("")
        setError("")
      } else {
        setError('Por favor, preencha email e senha')
      }
    } catch (error: any) {
      setError(error.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    // Logout simples
    setAuthed(false)
    setSubmissions([])
    setStats(null)
    setSearchQuery("")
  }

  async function handleClear() {
    alert('Função de limpar dados não disponível no momento')
  }

  async function handleExport() {
    alert('Função de exportar dados não disponível no momento')
  }

  // Filtrar usuários por pesquisa
  const filteredSubmissions = useMemo(() => {
    if (!searchQuery) return submissions
    
    const query = searchQuery.toLowerCase()
    return submissions.filter(submission => 
      submission.nome.toLowerCase().includes(query) ||
      submission.email.toLowerCase().includes(query) ||
      submission.discord.toLowerCase().includes(query)
    )
  }, [submissions, searchQuery])

  // Tela de login
  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">Admin Meetup</h1>
            </div>
            <p className="text-gray-400">
              Acesso restrito para administradores
            </p>
          </div>

          <DashboardCard>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email de Administrador
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@meetuptrae.com"
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Senha de Administrador
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                  required
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg"
              >
                {loading ? (
                  <>
                    Entrando...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    Entrar
                  </>
                )}
              </button>
            </form>
          </DashboardCard>
        </div>
      </div>
    )
  }

  // Dashboard principal
  return (
    <main className="min-h-screen bg-black" role="main">
      {/* Header */}
      <header className="bg-black border-b border-gray-800" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <h1 className="text-xl font-bold text-white">Admin Meetup</h1>
                <p className="text-sm text-gray-300">Gerenciamento de usuários</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
              aria-label="Sair do painel"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8">
        <AdminHeader
          stats={stats}
          onSearch={setSearchQuery}
          onExport={handleExport}
          onClear={handleClear}
          onRefresh={loadData}
          loading={loading}
        />

        {/* Dashboard com estatísticas */}
        <div className="mt-8">
          <DashboardStats stats={stats} loading={loading} />
        </div>

        {/* Gráficos e últimos cadastros */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardCharts submissions={submissions} loading={loading} />
          </div>
          <div>
            <RecentSubmissions submissions={submissions} />
          </div>
        </div>

        {/* Tabela de usuários */}
        <div className="mt-8">
          <DashboardCard>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Usuários Cadastrados</h2>
              <p className="text-gray-400">
                {searchQuery 
                  ? `Mostrando ${filteredSubmissions.length} de ${submissions.length} usuários`
                  : `Total: ${submissions.length} usuários`
                }
              </p>
            </div>
            
            <SubmissionsTable 
              submissions={filteredSubmissions}
            />
          </DashboardCard>
        </div>
      </div>
    </main>
  )
}