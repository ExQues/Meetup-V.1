import { motion } from "framer-motion"
import { DashboardCard } from "./ui/dashboard-card"
import { User, Calendar, Mail, Phone } from "lucide-react"
import { Submission } from "@/pages/AdminMeetup"

interface RecentSubmissionsProps {
  submissions: Submission[]
  loading: boolean
}

export function RecentSubmissions({ submissions, loading }: RecentSubmissionsProps) {
  // Pegar os 5 últimos cadastros
  const recentSubmissions = submissions
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <DashboardCard>
        <h3 className="text-lg font-semibold text-white mb-4">Últimos Cadastros</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-white/5 rounded-lg"></div>
            </div>
          ))}
        </div>
      </DashboardCard>
    )
  }

  return (
    <DashboardCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Últimos Cadastros</h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>
      
      {recentSubmissions.length === 0 ? (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum cadastro ainda</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentSubmissions.map((submission, index) => (
            <motion.div
              key={submission.email}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 min-w-0">
                    <User className="w-4 h-4 text-blue-400" />
                    <h4 className="font-medium text-white text-sm overflow-hidden text-ellipsis whitespace-nowrap">{submission.nome}</h4>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400 min-w-0">
                    <div className="flex items-center gap-1 min-w-0">
                      <Mail className="w-3 h-3" />
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">{submission.email}</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <Phone className="w-3 h-3" />
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">{submission.telefone}</span>
                    </div>
                  </div>
                  
                  {submission.discord && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 min-w-0">
                      <span>Discord:</span>
                      <span className="text-purple-400 overflow-hidden text-ellipsis whitespace-nowrap">{submission.discord}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-right flex-shrink-0 ml-3">
                  <div className="text-xs text-gray-500">
                    {formatDate(submission.created_at)}
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    ✓ Confirmado
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {submissions.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Mostrando 5 de {submissions.length} cadastros
          </p>
        </div>
      )}
    </DashboardCard>
  )
}