import { useState } from 'react';
import { Search, Download, Trash2, RefreshCw, Users, Calendar, Clock } from 'lucide-react';

interface AdminHeaderProps {
  stats: any;
  onSearch: (query: string) => void;
  onExport: () => void;
  onClear: () => void;
  onRefresh: () => void;
  loading: boolean;
}

export function AdminHeader({ stats, onSearch, onExport, onClear, onRefresh, loading }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="space-y-6">
      {/* Barra de Ações */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar usuários por nome ou email..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            aria-label="Pesquisar usuários"
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3 bg-black/60 border border-white/5 rounded-xl text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Atualizar lista"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-3 bg-green-900/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-900/30 transition-all"
            aria-label="Exportar dados"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-3 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-900/30 transition-all"
            aria-label="Limpar cadastros"
          >
            <Trash2 className="w-4 h-4" />
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}