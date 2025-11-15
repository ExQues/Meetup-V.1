import { Submission } from '@/pages/AdminMeetup';

// Função para formatar telefone
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return phone;
}

interface TableProps {
  submissions: Submission[];
  loading: boolean;
}

export function SubmissionsTable({ submissions, loading }: TableProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">Nenhum usuário cadastrado ainda</div>
        <div className="text-gray-500 text-sm">Os usuários aparecerão aqui assim que se cadastrarem</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full">
        <thead className="bg-black/40">
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-sm font-medium text-gray-300">Nome</th>
            <th className="text-left py-4 px-4 text-sm font-medium text-gray-300">Email</th>
            <th className="text-left py-4 px-4 text-sm font-medium text-gray-300">Telefone</th>
            <th className="text-left py-4 px-4 text-sm font-medium text-gray-300">Discord</th>
            <th className="text-left py-4 px-4 text-sm font-medium text-gray-300">Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {submissions.map((submission, index) => (
            <tr key={index} className="hover:bg-white/5 transition-colors">
              <td className="py-4 px-4">
                <div className="font-medium text-white">{submission.nome}</div>
              </td>
              <td className="py-4 px-4">
                <div className="text-gray-300">{submission.email}</div>
              </td>
              <td className="py-4 px-4">
                <div className="text-gray-300 font-mono text-sm">
                  {formatPhone(submission.telefone)}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="text-gray-300">@{submission.discord}</div>
              </td>
              <td className="py-4 px-4">
                <div className="text-gray-400 text-sm">
                  {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                </div>
                <div className="text-gray-500 text-xs">
                  {new Date(submission.created_at).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}