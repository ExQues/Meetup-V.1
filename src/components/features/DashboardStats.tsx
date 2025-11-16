import { motion } from "framer-motion";
import { Users, Calendar, Clock, TrendingUp, UserPlus, Activity } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    total: number;
    today: number;
    thisWeek: number;
    lastSubmission: any;
  } | null;
  loading: boolean;
}

export function DashboardStats({ stats, loading }: DashboardStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-black/60 border border-white/5 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-8 w-16 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-24 bg-white/10 rounded"></div>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  // Calcular taxa de crescimento (comparando com ontem)
  const growthRate = stats.today > 0 ? ((stats.today / Math.max(stats.total - stats.today, 1)) * 100) : 0;

  // Formatar data do último cadastro
  const formatLastRegistration = (date: string) => {
    const now = new Date();
    const regDate = new Date(date);
    const diffMs = now.getTime() - regDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Há poucos minutos";
    if (diffHours < 24) return `Há ${diffHours}h`;
    if (diffDays === 1) return "Ontem";
    return `Há ${diffDays} dias`;
  };

  const statsCards = [
    {
      title: "Total de Usuários",
      value: stats.total.toLocaleString('pt-BR'),
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      trend: growthRate > 0 ? `+${growthRate.toFixed(1)}%` : "0%",
      trendColor: growthRate > 0 ? "text-green-400" : "text-gray-400"
    },
    {
      title: "Cadastrados Hoje",
      value: stats.today.toString(),
      icon: UserPlus,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      trend: "Hoje",
      trendColor: "text-green-400"
    },
    {
      title: "Esta Semana",
      value: stats.thisWeek.toString(),
      icon: Calendar,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      trend: `${Math.round((stats.thisWeek / 7))}/dia`,
      trendColor: "text-purple-400"
    },
    {
      title: "Último Cadastro",
      value: stats.lastSubmission 
        ? formatLastRegistration(stats.lastSubmission.created_at)
        : "Nenhum",
      icon: Clock,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      trend: stats.lastSubmission 
        ? stats.lastSubmission.nome.split(' ')[0]
        : "",
      trendColor: "text-orange-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="bg-black/60 border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            {card.trend && (
              <div className={`text-sm font-medium ${card.trendColor} flex items-center gap-1`}>
                <TrendingUp className="w-3 h-3" />
                {card.trend}
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className={`text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300`}>
              {card.value}
            </div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {card.title}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}