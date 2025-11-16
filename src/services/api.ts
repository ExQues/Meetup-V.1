// Serviço de API limpo para o novo backend
const API_BASE_URL = '/.netlify/functions/api';

class ApiService {
  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
      throw new Error(error.error || 'Erro na requisição');
    }
    return response.json();
  }

  // Health check
  async health() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Health check falhou:', error);
      throw error;
    }
  }

  // Teste básico
  async test() {
    try {
      const response = await fetch(`${API_BASE_URL}/test`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Teste falhou:', error);
      throw error;
    }
  }

  // Enviar formulário
  async submitForm(data: any) {
    try {
      console.log('🚀 Enviando dados para:', `${API_BASE_URL}/submit`);
      console.log('📦 Dados:', data);
      
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('📨 Resposta:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Erro na resposta:', errorText);
      }
      
      return this.handleResponse(response);
    } catch (error) {
      console.error('❌ Erro ao enviar formulário:', error);
      throw error;
    }
  }

  // Buscar inscrições
  async getSubmissions() {
    try {
      const response = await fetch(`${API_BASE_URL}/inscricoes`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
      throw error;
    }
  }

  // Login admin (será implementado)
  async login(password: string) {
    throw new Error('Função ainda não implementada');
  }
}

export const apiService = new ApiService();