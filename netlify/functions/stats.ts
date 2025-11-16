// Configuração do Supabase - fallback para quando variáveis de ambiente não estão disponíveis
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cruvgucbbvxlvyffpskm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjQ4MTIsImV4cCI6MjA3ODgwMDgxMn0.d6bZrcxY1x0mP_Tk4coLjDeFYEZ_zCEd9YVB-UbCvvE';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyNDgxMiwiZXhwIjoyMDc4ODAwODEyfQ.55p-Bt1vWm0ZtShl7N1OHV3O1xbejtR4TmIfKe3OMxc';

export const handler = async (event: any) => {
  console.log('=== STATS FUNCTION DEBUG ===');
  console.log('Headers:', event.headers);
  console.log('SUPABASE_URL:', SUPABASE_URL);
  console.log('SUPABASE_ANON_KEY presente:', !!SUPABASE_ANON_KEY);

  // Verificar autenticação
  const authHeader = event.headers.authorization || event.headers.Authorization;
  console.log('Auth Header:', authHeader);
  
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
  console.log('Token recebido:', token);
  
  // Verificar token - aceitar qualquer token que comece com 'admin-token-'
  if (!token.startsWith('admin-token-')) {
    console.log('Token inválido - não começa com admin-token-');
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
  
  console.log('Token válido ✅');

  try {
    console.log('Iniciando busca de estatísticas...');
    
    // Obter data atual e início da semana
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Domingo
    startOfWeek.setHours(0, 0, 0, 0);

    console.log('Data de hoje:', startOfDay.toISOString());
    console.log('Início da semana:', startOfWeek.toISOString());

    // Buscar estatísticas do Supabase usando fetch direto
    console.log('Buscando do Supabase...');
    const [totalResponse, todayResponse, weekResponse, lastResponse] = await Promise.all([
      // Total de submissões
      fetch(`${SUPABASE_URL}/rest/v1/submissions?select=*`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
          'Content-Type': 'application/json'
        }
      }),
      
      // Submissões de hoje
      fetch(`${SUPABASE_URL}/rest/v1/submissions?select=*&created_at=gte.${startOfDay.toISOString()}`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
          'Content-Type': 'application/json'
        }
      }),
      
      // Submissões da semana
      fetch(`${SUPABASE_URL}/rest/v1/submissions?select=*&created_at=gte.${startOfWeek.toISOString()}`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
          'Content-Type': 'application/json'
        }
      }),
      
      // Última submissão
      fetch(`${SUPABASE_URL}/rest/v1/submissions?select=*&order=created_at.desc&limit=1`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
          'Content-Type': 'application/json'
        }
      })
    ]);

    console.log('Respostas recebidas:', {
      total: totalResponse.status,
      today: todayResponse.status,
      week: weekResponse.status,
      last: lastResponse.status
    });

    if (!totalResponse.ok || !todayResponse.ok || !weekResponse.ok || !lastResponse.ok) {
      throw new Error('Erro ao buscar dados do Supabase');
    }

    const totalData = await totalResponse.json();
    const todayData = await todayResponse.json();
    const weekData = await weekResponse.json();
    const lastData = await lastResponse.json();
    
    console.log('Dados recebidos:', {
      total: totalData.length,
      today: todayData.length,
      week: weekData.length,
      last: lastData.length
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({
        total: totalData.length || 0,
        today: todayData.length || 0,
        thisWeek: weekData.length || 0,
        lastSubmission: lastData[0] || null,
      })
    };

  } catch (error: any) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    console.error('Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Erro ao buscar estatísticas: ' + error.message 
      })
    };
  }
};