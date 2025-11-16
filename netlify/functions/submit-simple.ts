// Configuração do Supabase - fallback para quando variáveis de ambiente não estão disponíveis
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cruvgucbbvxlvyffpskm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjQ4MTIsImV4cCI6MjA3ODgwMDgxMn0.d6bZrcxY1x0mP_Tk4coLjDeFYEZ_zCEd9YVB-UbCvvE';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyNDgxMiwiZXhwIjoyMDc4ODAwODEyfQ.55p-Bt1vWm0ZtShl7N1OHV3O1xbejtR4TmIfKe3OMxc';

export const handler = async (event: any) => {
  console.log('=== SUBMIT FUNCTION DEBUG ===');
  console.log('Método:', event.httpMethod);
  console.log('SUPABASE_URL:', SUPABASE_URL);
  console.log('SUPABASE_ANON_KEY presente:', !!SUPABASE_ANON_KEY);
  
  // Apenas permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { nome, email, telefone, discord } = body;

    console.log('Dados recebidos:', { nome, email, telefone, discord });

    // Validação básica
    if (!nome || !email || !telefone || !discord) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ error: 'Todos os campos são obrigatórios' })
      };
    }

    // Validar email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ error: 'Email inválido' })
      };
    }

    // Validar telefone (apenas números)
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ error: 'Telefone deve ter 10 ou 11 dígitos' })
      };
    }

    // Verificar se email já existe usando fetch direto
    console.log('Verificando se email já existe...');
    const checkResponse = await fetch(`${SUPABASE_URL}/rest/v1/submissions?select=email&email=eq.${email.toLowerCase()}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'Content-Type': 'application/json'
      }
    });

    if (!checkResponse.ok) {
      throw new Error(`Erro ao verificar email: ${checkResponse.status}`);
    }

    const existingData = await checkResponse.json();
    console.log('Email existente:', existingData.length > 0);

    if (existingData.length > 0) {
      return {
        statusCode: 409,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ error: 'Este email já foi cadastrado' })
      };
    }

    // Inserir novo registro usando fetch direto
    console.log('Inserindo novo registro...');
    const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        telefone: telefoneLimpo,
        discord: discord.trim(),
        ip_address: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown',
        user_agent: event.headers['user-agent'] || 'unknown'
      })
    });

    if (!insertResponse.ok) {
      throw new Error(`Erro ao inserir: ${insertResponse.status}`);
    }

    const data = await insertResponse.json();
    console.log('Registro inserido com sucesso:', data[0]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({
        message: 'Inscrição realizada com sucesso!',
        id: data[0].id,
        data: data[0]
      })
    };

  } catch (error: any) {
    console.error('❌ Erro ao processar inscrição:', error);
    console.error('Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ 
        error: 'Erro ao processar inscrição: ' + error.message 
      })
    };
  }
};