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
  week: number;
}

class ClientDataService {
  private readonly STORAGE_KEY = 'meetup_submissions';
  private readonly MOCK_DATA_KEY = 'mock_data_initialized';

  // Initialize with mock data if not already done
  private initializeMockData(): void {
    if (!localStorage.getItem(this.MOCK_DATA_KEY)) {
      const mockSubmissions: Submission[] = [
        {
          id: '1',
          nome: 'João Silva',
          email: 'joao@example.com',
          telefone: '(11) 98765-4321',
          discord: 'joao_silva',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          nome: 'Maria Santos',
          email: 'maria@example.com',
          telefone: '(21) 99876-5432',
          discord: 'maria_santos',
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          nome: 'Pedro Oliveira',
          email: 'pedro@example.com',
          telefone: '(31) 91234-5678',
          discord: 'pedro_oliveira',
          created_at: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: '4',
          nome: 'Ana Costa',
          email: 'ana@example.com',
          telefone: '(41) 92345-6789',
          discord: 'ana_costa',
          created_at: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: '5',
          nome: 'Carlos Mendes',
          email: 'carlos@example.com',
          telefone: '(51) 93456-7890',
          discord: 'carlos_mendes',
          created_at: new Date(Date.now() - 345600000).toISOString()
        }
      ];
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockSubmissions));
      localStorage.setItem(this.MOCK_DATA_KEY, 'true');
    }
  }

  // Get all submissions
  getSubmissions(page = 1, limit = 50): { submissions: Submission[]; total: number; page: number; totalPages: number } {
    this.initializeMockData();
    
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
    this.initializeMockData();
    
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
      week: weekCount
    };
  }

  // Add new submission (when someone submits the form)
  addSubmission(submission: Omit<Submission, 'id' | 'created_at'>): Submission {
    this.initializeMockData();
    
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