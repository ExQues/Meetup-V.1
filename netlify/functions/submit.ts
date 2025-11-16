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
  // Apenas permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { nome, email, telefone, discord } = body;

    // Validação básica
    if (!nome || !email || !telefone || !discord) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Todos os campos são obrigatórios' })
      };
    }

    // Validar email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email inválido' })
      };
    }

    // Validar telefone (apenas números)
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Telefone deve ter 10 ou 11 dígitos' })
      };
    }

    // Verificar se email já existe
    const { data: existingData, error: checkError } = await supabase
      .from('submissions')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
      throw checkError;
    }

    if (existingData) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'Este email já foi cadastrado' })
      };
    }

    // Inserir novo registro
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          nome: nome.trim(),
          email: email.toLowerCase().trim(),
          telefone: telefoneLimpo,
          discord: discord.trim(),
          ip_address: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown',
          user_agent: event.headers['user-agent'] || 'unknown'
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

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
        id: data.id,
        data: data
      })
    };

  } catch (error: any) {
    console.error('Erro ao processar inscrição:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Erro ao processar inscrição: ' + error.message 
      })
    };
  }
};