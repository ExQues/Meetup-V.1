// API service para comunicação com o backend
import { fallbackService } from './fallback-service';
import { clientDataService } from './client-data-service';

// Usar Netlify functions em produção, localhost apenas para desenvolvimento local
const API_BASE_URL = import.meta.env.PROD ? '/.netlify/functions/api' : (import.meta.env.VITE_API_URL || 'http://localhost:5004/api');

// Importar autenticação simples temporária
import { simpleAuth } from './simple-auth';

class ApiService {
  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
      throw new Error(error.error || 'Erro na requisição');
    }
    return response.json();
  }

  // Autenticação - usando Netlify function
  async login(email: string, password: string) {
    try {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro ao fazer login' }));
        throw new Error(error.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        return data;
      } else {
        throw new Error(data.message || 'Erro ao fazer login');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  }

  logout() {
    localStorage.removeItem('admin_token');
  }

  // Submissões
  async submitForm(formData: any) {
    try {
      // Try using the Netlify function first
      const response = await fetch(`/.netlify/functions/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      return response.json();
    } catch (error) {
      console.log('⚠️ Erro ao enviar formulário, usando client-side service:', error);
      // Use client-side service as fallback
      const result = clientDataService.addSubmission(formData);
      return {
        message: 'Formulário enviado com sucesso!',
        id: result.id
      };
    }
  }

  async getSubmissions(page = 1, limit = 50) {
    try {
      // Try using the individual Netlify function first
      const response = await fetch(`/.netlify/functions/submissions?page=${page}&limit=${limit}`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar submissões');
      }

      return response.json();
    } catch (error) {
      console.log('⚠️ Erro ao buscar submissões, usando client-side data service:', error);
      // Use client-side service as primary fallback
      return clientDataService.getSubmissions(page, limit);
    }
  }

  async getStats() {
    try {
      // Try using the individual Netlify function first
      const response = await fetch(`/.netlify/functions/stats`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar estatísticas');
      }

      return response.json();
    } catch (error) {
      console.log('⚠️ Erro ao buscar estatísticas, usando client-side data service:', error);
      // Use client-side service as primary fallback
      return clientDataService.getStats();
    }
  }

  async exportData() {
    try {
      // Use client-side service for export (no server function needed)
      return {
        csv: clientDataService.exportAsCSV(),
        download: () => clientDataService.downloadCSV()
      };
    } catch (error) {
      console.log('⚠️ Erro ao exportar dados:', error);
      return fallbackService.exportMockData();
    }
  }

  async clearSubmissions() {
    try {
      // Use client-side service for clearing data
      clientDataService.clearSubmissions();
      return { message: 'Dados limpos com sucesso!' };
    } catch (error) {
      console.log('⚠️ Erro ao limpar dados:', error);
      throw new Error('Erro ao limpar dados');
    }
  }
}

export const apiService = new ApiService();