// Função ultra-simplificada usando fetch direto para Supabase
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

export async function handler(event: any) {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    console.log('🚀 Função iniciada');
    console.log('📋 Método:', event.httpMethod);
    console.log('🎯 Path:', event.path);

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.log('❌ Variáveis não configuradas');
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Config incompleta' }) };
    }

    // Rotas de teste
    if (event.httpMethod === 'GET' && (event.path === '/api/test' || event.path === '/.netlify/functions/api/test' || event.path === '/test')) {
      return { statusCode: 200, headers, body: JSON.stringify({ message: 'API funcionando!' }) };
    }

    if (event.httpMethod === 'GET' && (event.path === '/api/health' || event.path === '/.netlify/functions/api/health' || event.path === '/health')) {
      return { statusCode: 200, headers, body: JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }) };
    }

    if (event.httpMethod === 'POST' && (event.path === '/api/submit' || event.path === '/.netlify/functions/api/submit' || event.path === '/submit')) {
      const data = JSON.parse(event.body || '{}');
      console.log('📦 Dados:', data);

      if (!data.nome || !data.email) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Nome e email obrigatórios' }) };
      }

      try {
        // Verificar se email já existe
        const checkResponse = await fetch(`${SUPABASE_URL}/rest/v1/inscricoes?email=eq.${data.email}&select=email`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          }
        });

        if (checkResponse.ok) {
          const existing = await checkResponse.json();
          if (existing.length > 0) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email já cadastrado' }) };
          }
        }

        // Inserir novo registro
        const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/inscricoes`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone || null,
            discord: data.discord || null
          })
        });

        if (!insertResponse.ok) {
          const errorText = await insertResponse.text();
          console.log('❌ Erro ao inserir:', errorText);
          return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erro ao salvar' }) };
        }

        return { statusCode: 200, headers, body: JSON.stringify({ message: 'Sucesso' }) };

      } catch (error) {
        console.log('❌ Erro na requisição:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erro na conexão' }) };
      }
    }

    if (event.httpMethod === 'GET' && (event.path === '/api/inscricoes' || event.path === '/.netlify/functions/api/inscricoes' || event.path === '/inscricoes')) {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/inscricoes?order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      });

      if (!response.ok) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erro ao buscar' }) };
      }

      const data = await response.json();
      return { statusCode: 200, headers, body: JSON.stringify({ data }) };
    }

    return { statusCode: 404, headers, body: JSON.stringify({ error: 'Rota não encontrada' }) };

  } catch (error) {
    console.log('❌ Erro global:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erro interno' }) };
  }
}