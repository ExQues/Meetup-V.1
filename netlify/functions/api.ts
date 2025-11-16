// Função simplificada para evitar problemas de tamanho
import { createClient } from '@supabase/supabase-js';

// Headers CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

export async function handler(event: any) {
  try {
    // Handle OPTIONS request for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }

    console.log('🚀 Função iniciada');
    console.log('📋 Método:', event.httpMethod);
    console.log('🎯 Endpoint:', event.path);

    // Verificar variáveis de ambiente
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Variáveis não configuradas');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Configuração incompleta' })
      };
    }

    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse do body
    let data;
    try {
      data = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'JSON inválido' })
      };
    }

    console.log('📦 Dados recebidos:', data);

    // Rota de submissão
    if (event.httpMethod === 'POST' && event.path === '/api/submit') {
      // Validação básica
      if (!data.nome || !data.email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Nome e email obrigatórios' })
        };
      }

      try {
        // Verificar email duplicado
        const { data: existing } = await supabase
          .from('inscricoes')
          .select('email')
          .eq('email', data.email)
          .single();

        if (existing) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Email já cadastrado' })
          };
        }
      } catch (e) {
        // Email não existe, pode prosseguir
      }

      // Inserir dados
      const { error } = await supabase
        .from('inscricoes')
        .insert([{
          nome: data.nome,
          email: data.email,
          telefone: data.telefone || null,
          discord: data.discord || null
        }]);

      if (error) {
        console.log('❌ Erro ao inserir:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Erro ao salvar' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Sucesso' })
      };
    }

    // Rota para listar (admin)
    if (event.httpMethod === 'GET' && event.path === '/api/inscricoes') {
      const { data: inscricoes, error } = await supabase
        .from('inscricoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Erro ao buscar' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ data: inscricoes })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Rota não encontrada' })
    };

  } catch (error) {
    console.log('❌ Erro global:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno' })
    };
  }
}