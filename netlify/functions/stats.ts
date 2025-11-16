import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export const handler = async (event: any) => {
  // Verificar autenticação
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Token de autenticação necessário' })
    };
  }

  const token = authHeader.split(' ')[1];
  
  // Verificar token (simplificado)
  if (token !== process.env.ADMIN_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Token inválido' })
    };
  }

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
        .from('submissions')
        .select('*', { count: 'exact', head: true }),
      
      // Submissões de hoje
      supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfDay.toISOString()),
      
      // Submissões da semana (desde domingo)
      supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfWeek.toISOString()),
      
      // Última submissão com dados completos
      supabase
        .from('submissions')
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
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({
        total: totalResult.count || 0,
        today: todayResult.count || 0,
        thisWeek: weekResult.count || 0,
        lastSubmission: lastSubmissionResult.data || null,
      })
    };

  } catch (error: any) {
    console.error('Erro ao buscar estatísticas:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Erro ao buscar estatísticas: ' + error.message 
      })
    };
  }
};