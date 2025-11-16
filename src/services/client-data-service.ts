// Client-side data management service as fallback
export interface Submission {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  discord: string;
  created_at: string;
}

export interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  month?: number;
  growth?: string;
  lastSubmission?: Submission | null;
}

class ClientDataService {
  private readonly STORAGE_KEY = 'meetup_submissions';
  private readonly MOCK_DATA_KEY = 'mock_data_initialized';

  constructor() {
    // Limpar dados mock antigos na inicialização
    this.clearOldMockData();
  }

  // Limpar dados mock antigos
  private clearOldMockData(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const submissions: Submission[] = JSON.parse(data);
      // Verificar se tem dados mock (emails com @example.com)
      const hasMockData = submissions.some(s => s.email.includes('@example.com'));
      if (hasMockData) {
        console.log('🧹 Limpando dados mock antigos...');
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
      }
    }
    localStorage.removeItem(this.MOCK_DATA_KEY);
  }

  // Get all submissions
  getSubmissions(page = 1, limit = 50): { submissions: Submission[]; total: number; page: number; totalPages: number } {
    // Não inicializar mock data automaticamente - mostrar dados reais
    const data = localStorage.getItem(this.STORAGE_KEY);
    const allSubmissions: Submission[] = data ? JSON.parse(data) : [];
    
    // Sort by created_at descending
    allSubmissions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    // Pagination
    const total = allSubmissions.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const submissions = allSubmissions.slice(startIndex, endIndex);
    
    return {
      submissions,
      total,
      page,
      totalPages
    };
  }

  // Get statistics
  getStats(): Stats {
    // Não inicializar mock data automaticamente - mostrar estatísticas reais
    const data = localStorage.getItem(this.STORAGE_KEY);
    const submissions: Submission[] = data ? JSON.parse(data) : [];
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    let todayCount = 0;
    let weekCount = 0;
    
    submissions.forEach(submission => {
      const createdAt = new Date(submission.created_at);
      
      if (createdAt >= today) {
        todayCount++;
      }
      
      if (createdAt >= weekAgo) {
        weekCount++;
      }
    });
    
    return {
      total: submissions.length,
      today: todayCount,
      thisWeek: weekCount,
      month: 0,
      growth: '0%',
      lastSubmission: submissions.length > 0 ? submissions[0] : null
    };
  }

  // Add new submission (when someone submits the form)
  addSubmission(submission: Omit<Submission, 'id' | 'created_at'>): Submission {
    // REMOVIDO: Não inicializar mais com dados mock
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    const submissions: Submission[] = data ? JSON.parse(data) : [];
    
    // Check if email already exists
    if (submissions.some(s => s.email === submission.email)) {
      throw new Error('Este email já foi cadastrado');
    }
    
    const newSubmission: Submission = {
      ...submission,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    submissions.unshift(newSubmission);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(submissions));
    
    return newSubmission;
  }

  // Clear all submissions (admin function)
  clearSubmissions(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
  }

  // Export data as CSV
  exportAsCSV(): string {
    const { submissions } = this.getSubmissions();
    
    if (submissions.length === 0) {
      return 'Nenhum dado disponível';
    }
    
    const headers = ['Nome', 'Email', 'Telefone', 'Discord', 'Data de Cadastro'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        `"${sub.nome}"`,
        `"${sub.email}"`,
        `"${sub.telefone}"`,
        `"${sub.discord}"`,
        `"${new Date(sub.created_at).toLocaleString('pt-BR')}"`
      ].join(','))
    ].join('\n');
    
    return csvContent;
  }

  // Download CSV file
  downloadCSV(): void {
    const csvContent = this.exportAsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `inscricoes-meetup-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

export const clientDataService = new ClientDataService();