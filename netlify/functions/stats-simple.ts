export const handler = async (event: any) => {
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
  
  // Verificar token
  if (token !== process.env.ADMIN_TOKEN) {
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
    // Obter data atual e início da semana
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Domingo
    startOfWeek.setHours(0, 0, 0, 0);

    // Buscar estatísticas do Supabase usando fetch direto
    const [totalResponse, todayResponse, weekResponse, lastResponse] = await Promise.all([
      // Total de submissões
      fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?select=*`, {
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE!}`,
          'Content-Type': 'application/json'
        }
      }),
      
      // Submissões de hoje
      fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?select=*&created_at=gte.${startOfDay.toISOString()}`, {
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE!}`,
          'Content-Type': 'application/json'
        }
      }),
      
      // Submissões da semana
      fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?select=*&created_at=gte.${startOfWeek.toISOString()}`, {
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE!}`,
          'Content-Type': 'application/json'
        }
      }),
      
      // Última submissão
      fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?select=*&order=created_at.desc&limit=1`, {
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE!}`,
          'Content-Type': 'application/json'
        }
      })
    ]);

    if (!totalResponse.ok || !todayResponse.ok || !weekResponse.ok || !lastResponse.ok) {
      throw new Error('Erro ao buscar dados do Supabase');
    }

    const totalData = await totalResponse.json();
    const todayData = await todayResponse.json();
    const weekData = await weekResponse.json();
    const lastData = await lastResponse.json();

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
    console.error('Erro ao buscar estatísticas:', error);
    
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