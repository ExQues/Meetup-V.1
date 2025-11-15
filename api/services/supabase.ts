import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;

// Criar cliente Supabase com service role (acesso total)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'x-application-name': 'meetup-backend',
    },
  },
});

// Tipos para nossos dados
export interface Submission {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  discord: string;
  created_at?: string;
  ip_address?: string;
  user_agent?: string;
}

// Serviço de Submissões
export class SubmissionService {
  private tableName = 'submissions';

  async create(submission: Omit<Submission, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([{
        nome: submission.nome,
        email: submission.email.toLowerCase(),
        telefone: submission.telefone,
        discord: submission.discord,
        ip_address: submission.ip_address,
        user_agent: submission.user_agent,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Este email já foi cadastrado anteriormente');
      }
      throw new Error(`Erro ao criar submissão: ${error.message}`);
    }

    return data;
  }

  async findByEmail(email: string) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw new Error(`Erro ao buscar submissão: ${error.message}`);
    }

    return data;
  }

  async findAll(options: { page?: number; limit?: number } = {}) {
    const page = options.page || 1;
    const limit = options.limit || 50;
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Erro ao buscar submissões: ${error.message}`);
    }

    return {
      submissions: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    };
  }

  async getStats() {
    try {
      // Obter data atual e início da semana (domingo)
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Domingo
      startOfWeek.setHours(0, 0, 0, 0);

      // Buscar todas as estatísticas em paralelo
      const [
        totalResult,
        todayResult,
        weekResult,
        lastSubmissionResult
      ] = await Promise.all([
        // Total de submissões
        supabase
          .from(this.tableName)
          .select('*', { count: 'exact', head: true }),
        
        // Submissões de hoje
        supabase
          .from(this.tableName)
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfDay.toISOString()),
        
        // Submissões da semana (desde domingo)
        supabase
          .from(this.tableName)
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfWeek.toISOString()),
        
        // Última submissão com dados completos
        supabase
          .from(this.tableName)
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
      ]);

      // Verificar erros individuais
      if (totalResult.error) throw new Error(`Erro ao buscar total: ${totalResult.error.message}`);
      if (todayResult.error) throw new Error(`Erro ao buscar de hoje: ${todayResult.error.message}`);
      if (weekResult.error) throw new Error(`Erro ao buscar da semana: ${weekResult.error.message}`);

      return {
        total: totalResult.count || 0,
        today: todayResult.count || 0,
        thisWeek: weekResult.count || 0,
        lastSubmission: lastSubmissionResult.data || null,
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      // Retornar valores padrão em caso de erro
      return {
        total: 0,
        today: 0,
        thisWeek: 0,
        lastSubmission: null,
      };
    }
  }

  async deleteAll() {
    const { error, count } = await supabase
      .from(this.tableName)
      .delete()
      .neq('id', ''); // Delete all

    if (error) {
      throw new Error(`Erro ao deletar submissões: ${error.message}`);
    }

    return { deletedCount: count || 0 };
  }
}

export const submissionService = new SubmissionService();