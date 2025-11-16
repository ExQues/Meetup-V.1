// Resolver problema do punycode no Netlify
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  // Tenta importar punycode se disponível
  const punycode = require('punycode/');
  (global as any).punycode = punycode;
} catch (e) {
  // Ignora se não estiver disponível
}

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

    // Debug: verificar variáveis de ambiente
    console.log('🔍 Debug - Variáveis de ambiente:');
    console.log('SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ Configurada' : '❌ Ausente');
    console.log('SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Ausente');

    // Verificar se as variáveis estão configuradas
    if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
      console.log('❌ Erro: Variáveis de ambiente não configuradas');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Configuração do servidor incompleta' })
      };
    }

    // Configurar Supabase
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.VITE_SUPABASE_ANON_KEY!
    );

    const { httpMethod, body } = event;
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
      console.log('📋 Recebendo submissão:', data);
      
      // Validar dados básicos
      if (!data.nome || !data.email) {
        console.log('❌ Dados inválidos:', { nome: !!data.nome, email: !!data.email });
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Nome e email são obrigatórios' })
        };
      }
      
      console.log('✅ Dados válidos, conectando ao Supabase...');

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
        console.log('❌ Erro ao inserir no banco:', error);
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
      const { data: inscricoes, error } = await supabase
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
        body: JSON.stringify({ data: inscricoes })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Rota não encontrada' })
    };

  } catch (error) {
    console.log('❌ Erro global na função:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno do servidor' })
    };
  }
}