// Serviço de fallback para quando o Supabase não estiver disponível
export const fallbackService = {
  // Dados mock para testes quando o Supabase falhar
  getMockSubmissions() {
    return {
      submissions: [
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
        }
      ],
      total: 3,
      page: 1,
      totalPages: 1
    };
  },

  getMockStats() {
    return {
      total: 3,
      today: 1,
      week: 2,
      month: 3,
      growth: '+50%'
    };
  },

  getMockChartData() {
    return [
      { name: 'Seg', cadastros: 1 },
      { name: 'Ter', cadastros: 0 },
      { name: 'Qua', cadastros: 1 },
      { name: 'Qui', cadastros: 0 },
      { name: 'Sex', cadastros: 1 },
      { name: 'Sáb', cadastros: 0 },
      { name: 'Dom', cadastros: 0 }
    ];
  },

  exportMockData() {
    return {
      data: [
        {
          Nome: 'João Silva',
          Email: 'joao@example.com',
          Telefone: '(11) 98765-4321',
          Discord: 'joao_silva',
          'Data de Envio': new Date().toLocaleDateString('pt-BR')
        },
        {
          Nome: 'Maria Santos',
          Email: 'maria@example.com',
          Telefone: '(21) 99876-5432',
          Discord: 'maria_santos',
          'Data de Envio': new Date(Date.now() - 86400000).toLocaleDateString('pt-BR')
        },
        {
          Nome: 'Pedro Oliveira',
          Email: 'pedro@example.com',
          Telefone: '(31) 91234-5678',
          Discord: 'pedro_oliveira',
          'Data de Envio': new Date(Date.now() - 172800000).toLocaleDateString('pt-BR')
        }
      ]
    };
  }
};