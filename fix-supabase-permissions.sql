-- SQL para verificar e corrigir permissões do Supabase
-- Verificar permissões atuais
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND grantee IN ('anon', 'authenticated', 'service_role') 
ORDER BY table_name, grantee;

-- Verificar se RLS está ativado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'submissions';

-- Conceder permissões completas para service_role (usado pelo Netlify)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Se RLS estiver ativado, criar políticas para service_role
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Criar política que permite tudo para service_role
CREATE POLICY "Permitir tudo para service_role" ON submissions
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Verificar políticas criadas
SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'submissions';