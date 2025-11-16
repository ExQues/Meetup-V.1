// Componente básico de inscrições recentes (será implementado)
export function RecentSubmissions({ submissions }: { submissions: any[] }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Inscrições Recentes</h2>
      <div className="text-gray-400">Inscrições recentes aparecerão aqui</div>
    </div>
  );
}