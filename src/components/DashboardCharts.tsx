import { motion } from "framer-motion";
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface Submission {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  discord: string;
  created_at: string;
}

interface DashboardChartsProps {
  submissions: Submission[];
  loading: boolean;
}

export function DashboardCharts({ submissions, loading }: DashboardChartsProps) {
  // Processar dados para gráficos
  const chartData = useMemo(() => {
    if (!submissions.length) return [];

    // Agrupar por data
    const dailyData: { [key: string]: number } = {};
    
    submissions.forEach(submission => {
      const date = new Date(submission.created_at).toLocaleDateString('pt-BR');
      dailyData[date] = (dailyData[date] || 0) + 1;
    });

    // Pegar últimos 7 dias
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('pt-BR');
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      
      last7Days.push({
        day: dayName,
        date: dateStr,
        cadastros: dailyData[dateStr] || 0
      });
    }

    return last7Days;
  }, [submissions]);

  // Calcular horários mais ativos
  const hourlyData = useMemo(() => {
    if (!submissions.length) return [];

    const hourlyStats: { [key: number]: number } = {};
    
    submissions.forEach(submission => {
      const hour = new Date(submission.created_at).getHours();
      hourlyStats[hour] = (hourlyStats[hour] || 0) + 1;
    });

    return Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      cadastros: hourlyStats[hour] || 0
    }));
  }, [submissions]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-black/60 border border-white/5 rounded-xl p-6 animate-pulse">
            <div className="h-6 w-32 bg-white/10 rounded mb-4"></div>
            <div className="h-64 w-full bg-white/5 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!chartData.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Linha - Cadastros por Dia */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-black/60 border border-white/5 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          Cadastros nos Últimos 7 Dias
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Line 
                type="monotone" 
                dataKey="cadastros" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Gráfico de Barras - Horários Mais Ativos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-black/60 border border-white/5 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          Horários Mais Ativos
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="hour" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Bar 
                dataKey="cadastros" 
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}