-- Verificar e corrigir permissões do Supabase para tabela submissions
-- Este script garante que as permissões estejam corretas

-- Verificar permissões atuais
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND grantee IN ('anon', 'authenticated') 
ORDER BY table_name, grantee;

-- Conceder permissões para a tabela submissions
GRANT ALL ON submissions TO authenticated;
GRANT SELECT ON submissions TO anon;

-- Verificar se RLS está habilitada
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('submissions', 'admin_users');

-- Se RLS estiver habilitada, criar políticas básicas
-- Para submissions (leitura pública, escrita autenticada)
CREATE POLICY "Permitir leitura pública" ON submissions FOR SELECT USING (true);
CREATE POLICY "Permitir escrita autenticada" ON submissions FOR ALL TO authenticated USING (true);

-- Para admin_users (acesso restrito)
CREATE POLICY "Permitir leitura de admin" ON admin_users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Permitir atualização de admin" ON admin_users FOR UPDATE TO authenticated USING (true);