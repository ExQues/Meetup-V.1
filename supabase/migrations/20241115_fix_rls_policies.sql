-- Habilitar RLS nas tabelas
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas para tabela submissions (inscrições)
-- Permitir leitura pública para todos
CREATE POLICY "Permitir leitura pública de inscrições" ON submissions
    FOR SELECT USING (true);

-- Permitir inserção para usuários anônimos (novas inscrições)
CREATE POLICY "Permitir inserção de inscrições" ON submissions
    FOR INSERT WITH CHECK (true);

-- Permitir atualização apenas para usuários autenticados (admin)
CREATE POLICY "Permitir atualização de inscrições para admin" ON submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Permitir deleção apenas para usuários autenticados (admin)
CREATE POLICY "Permitir deleção de inscrições para admin" ON submissions
    FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para tabela admin_users (administradores)
-- Restringir acesso total - apenas usuários autenticados podem ver
CREATE POLICY "Permitir leitura de admin para usuários autenticados" ON admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir inserção apenas para usuários autenticados
CREATE POLICY "Permitir inserção de admin para usuários autenticados" ON admin_users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir atualização apenas para usuários autenticados
CREATE POLICY "Permitir atualização de admin para usuários autenticados" ON admin_users
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Permitir deleção apenas para usuários autenticados
CREATE POLICY "Permitir deleção de admin para usuários autenticados" ON admin_users
    FOR DELETE USING (auth.role() = 'authenticated');

-- Conceder permissões básicas para os papéis apropriados
-- Para submissions: leitura pública
GRANT SELECT ON submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON submissions TO authenticated;

-- Para admin_users: acesso restrito
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_users TO authenticated;

-- Verificar permissões atuais
SELECT table_name, grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND table_name IN ('submissions', 'admin_users')
ORDER BY table_name, grantee;