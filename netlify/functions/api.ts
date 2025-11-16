import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Headers CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

export async function handler(event: any) {
  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { httpMethod, body, path } = event;
  const url = new URL(event.rawUrl);
  const pathSegments = url.pathname.split('/');
  const endpoint = pathSegments[pathSegments.length - 1];

  let data;
  try {
    data = body ? JSON.parse(body) : {};
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'JSON inválido' })
    };
  }

  // Rota de submissão do formulário
  if (endpoint === 'submit' && httpMethod === 'POST') {
    // Validar dados básicos
    if (!data.nome || !data.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nome e email são obrigatórios' })
      };
    }

    // Verificar se o email já existe
    const { data: existingData, error: checkError } = await supabase
      .from('inscricoes')
      .select('email')
      .eq('email', data.email)
      .single();

    if (existingData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email já cadastrado' })
      };
    }

    // Inserir nova inscrição
    const { error } = await supabase
      .from('inscricoes')
      .insert([{
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || null,
        discord: data.discord || null
      }]);

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Erro ao salvar no banco de dados' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Inscrição realizada com sucesso' })
    };
  }

  // Rota para listar inscrições (para admin)
  if (endpoint === 'inscricoes' && httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('inscricoes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Erro ao buscar inscrições' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ data })
    };
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: 'Rota não encontrada' })
  };
}