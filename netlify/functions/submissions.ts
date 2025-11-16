// Configuração do Supabase - fallback para quando variáveis de ambiente não estão disponíveis
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cruvgucbbvxlvyffpskm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjQ4MTIsImV4cCI6MjA3ODgwMDgxMn0.d6bZrcxY1x0mP_Tk4coLjDeFYEZ_zCEd9YVB-UbCvvE';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyNDgxMiwiZXhwIjoyMDc4ODAwODEyfQ.55p-Bt1vWm0ZtShl7N1OHV3O1xbejtR4TmIfKe3OMxc';

export const handler = async (event: any) => {
  console.log('=== SUBMISSIONS FUNCTION DEBUG ===');
  console.log('Headers:', event.headers);
  console.log('SUPABASE_URL:', SUPABASE_URL);
  
  // Verificar autenticação
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({ error: 'Token de autenticação necessário' })
    };
  }

  const token = authHeader.split(' ')[1];
  
  // Verificar token - aceitar qualquer token que comece com 'admin-token-'
  if (!token.startsWith('admin-token-')) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({ error: 'Token inválido' })
    };
  }

  try {
    const url = new URL(event.rawUrl || `http://localhost${event.path}`, 'http://localhost');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Buscar submissões do Supabase usando fetch direto
    const response = await fetch(`${SUPABASE_URL}/rest/v1/submissions?select=*&order=created_at.desc&offset=${offset}&limit=${limit}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar submissões: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({
        submissions: data || [],
        pagination: {
          page,
          limit,
          total: data.length || 0,
          totalPages: Math.ceil((data.length || 0) / limit)
        }
      })
    };

  } catch (error: any) {
    console.error('Erro ao buscar submissões:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Erro ao buscar submissões: ' + error.message 
      })
    };
  }
};