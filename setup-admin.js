// Script para configurar o usuário admin
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

async function setupAdmin() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Variáveis de ambiente do Supabase não configuradas')
      return
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })

    // Criar tabela de admin_users se não existir
    const { error: tableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(100) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          nome VARCHAR(100) NOT NULL,
          role VARCHAR(50) DEFAULT 'admin',
          is_active BOOLEAN DEFAULT true,
          last_login TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
        CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

        CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE TRIGGER update_admin_users_updated_at 
            BEFORE UPDATE ON admin_users 
            FOR EACH ROW 
            EXECUTE FUNCTION update_admin_users_updated_at();
      `
    })

    if (tableError) {
      console.log('⚠️ Tabela pode já existir ou erro ao criar:', tableError.message)
    }

    // Hash da senha
    const password = 'F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Inserir usuário admin
    const { data, error } = await supabase
      .from('admin_users')
      .upsert({
        email: 'admin@meetuptrae.com',
        password_hash: passwordHash,
        nome: 'Administrador',
        role: 'admin',
        is_active: true
      }, {
        onConflict: 'email'
      })
      .select()

    if (error) {
      console.error('❌ Erro ao inserir usuário:', error)
    } else {
      console.log('✅ Usuário admin configurado com sucesso!')
      console.log('📧 Email: admin@meetuptrae.com')
      console.log('🔑 Senha: F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT')
    }

  } catch (error) {
    console.error('❌ Erro crítico:', error)
  }
}

setupAdmin()