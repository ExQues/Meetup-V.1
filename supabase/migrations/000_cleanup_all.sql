-- Limpar completamente o banco de dados
-- Este script remove TUDO e reinicia do zero

-- 1. Desativar RLS em todas as tabelas
ALTER TABLE IF EXISTS submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_users DISABLE ROW LEVEL SECURITY;

-- 2. Remover todas as políticas
DO $$ 
DECLARE 
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
                      pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END $$;

-- 3. Remover todas as tabelas
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;

-- 4. Remover todos os índices restantes
DO $$
DECLARE 
    idx RECORD;
BEGIN
    FOR idx IN 
        SELECT indexname 
        FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND tablename NOT IN ('pg_stat_statements')
    LOOP
        EXECUTE format('DROP INDEX IF EXISTS %I', idx.indexname);
    END LOOP;
END $$;

-- 5. Limpar sequences
DROP SEQUENCE IF EXISTS submissions_id_seq CASCADE;
DROP SEQUENCE IF EXISTS admin_users_id_seq CASCADE;

-- 6. Limpar funções customizadas (se houver)
DROP FUNCTION IF EXISTS exec_sql(text) CASCADE;

-- 7. Revogar todas as permissões
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM authenticated;

-- 8. Mensagem de confirmação
SELECT '✅ Banco de dados completamente limpo! Pronto para novo início.' as status;