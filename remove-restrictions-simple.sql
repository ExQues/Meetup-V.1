-- REMOVER TODAS AS RESTRIÇÕES DO SUPABASE - ACESSO TOTAL

-- 1. Desabilitar RLS na tabela submissions
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;

-- 2. Remover políticas existentes da tabela submissions
DO $$ 
DECLARE
    pol_name TEXT;
BEGIN
    FOR pol_name IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'submissions'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON submissions', pol_name);
    END LOOP;
END $$;

-- 3. Conceder acesso total à tabela submissions
GRANT ALL PRIVILEGES ON TABLE submissions TO anon;
GRANT ALL PRIVILEGES ON TABLE submissions TO authenticated;
GRANT ALL PRIVILEGES ON TABLE submissions TO service_role;

-- 4. Conceder acesso às sequências
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 5. Verificar status
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'submissions';