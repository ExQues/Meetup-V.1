// API service para comunicação com o backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

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
    const response = await fetch(`${API_BASE_URL}/forms/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    return this.handleResponse(response);
  }

  async getSubmissions(page = 1, limit = 50) {
    const response = await fetch(`${API_BASE_URL}/forms/submissions?page=${page}&limit=${limit}`, {
      headers: this.getHeaders()
    });

    return this.handleResponse(response);
  }

  async getStats() {
    const response = await fetch(`${API_BASE_URL}/forms/stats`, {
      headers: this.getHeaders()
    });

    return this.handleResponse(response);
  }

  async exportData() {
    const response = await fetch(`${API_BASE_URL}/forms/export`, {
      headers: this.getHeaders()
    });

    return this.handleResponse(response);
  }

  async clearSubmissions() {
    const response = await fetch(`${API_BASE_URL}/forms/clear`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();