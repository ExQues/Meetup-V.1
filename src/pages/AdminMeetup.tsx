import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardCard } from "@/components/ui/dashboard-card"
import { AdminHeader } from "@/components/AdminHeader"
import { SubmissionsTable } from "@/components/SubmissionsTable"
import { DashboardStats } from "@/components/DashboardStats"
import { DashboardCharts } from "@/components/DashboardCharts"
import { RecentSubmissions } from "@/components/RecentSubmissions"
import { apiService } from "@/services/api"
import { LogOut, User, Shield } from "lucide-react"

export type Submission = {
  _id?: string;
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
      const [submissionsData, statsData] = await Promise.all([
        apiService.getSubmissions(),
        apiService.getStats()
      ])
      setSubmissions(submissionsData.submissions)
      setStats(statsData)
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error)
      if (error.message.includes('Token inválido') || error.message.includes('Token expirado')) {
        handleLogout()
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
      await apiService.login(password)
      setAuthed(true)
      setPassword("")
      setError("")
    } catch (error: any) {
      if (error.message.includes('Senha incorreta')) {
        setError('Senha incorreta. Tente novamente.')
      } else {
        setError(error.message || "Erro ao fazer login")
      }
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    apiService.logout()
    setAuthed(false)
    setSubmissions([])
    setStats(null)
    setSearchQuery("")
  }

  async function handleClear() {
    if (!confirm("Tem certeza que deseja remover todos os usuários? Esta ação não pode ser desfeita.")) return
    try {
      await apiService.clearSubmissions()
      await loadData()
    } catch (error: any) {
      alert('Erro ao limpar dados: ' + error.message)
    }
  }

  async function handleExport() {
    try {
      const data = await apiService.exportData()
      
      // Criar CSV
      const csvContent = [
        ['Nome', 'Email', 'Telefone', 'Discord', 'Data de Cadastro'],
        ...data.data.map((user: any) => [
          user.Nome,
          user.Email,
          user.Telefone,
          user.Discord,
          user['Data de Envio']
        ])
      ].map(row => row.join(',')).join('\n')

      // Download do arquivo
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `usuarios-meetup-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (error: any) {
      alert('Erro ao exportar dados: ' + error.message)
    }
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
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Shield className="w-12 h-12 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">Admin Meetup</h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-gray-400"
            >
              Acesso restrito para administradores
            </motion.p>
          </div>

          <DashboardCard>
            <form onSubmit={handleLogin} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
        </motion.div>
      </div>
    )
  }

  // Dashboard principal
  return (
    <main className="min-h-screen bg-black" role="main">
      {/* Header */}
      <header className="bg-black border-b border-white/10" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Admin Meetup</h1>
                <p className="text-sm text-gray-400">Gerenciamento de usuários</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-white/5 border border-white/10 rounded-xl text-white transition-all"
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
            <RecentSubmissions submissions={submissions} loading={loading} />
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
              loading={loading} 
            />
          </DashboardCard>
        </div>
      </div>
    </main>
  )
}