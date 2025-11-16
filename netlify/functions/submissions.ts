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
  
  // Verificar token (simplificado - você pode querer verificar contra um banco de dados)
  if (token !== process.env.ADMIN_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Token inválido' })
    };
  }

  try {
    const url = new URL(event.rawUrl || `http://localhost${event.path}`, 'http://localhost');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Buscar submissões com paginação
    const { data, error, count } = await supabase
      .from('submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({
        submissions: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages
        }
      })
    };

  } catch (error: any) {
    console.error('Erro ao buscar submissões:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Erro ao buscar submissões: ' + error.message 
      })
    };
  }
};