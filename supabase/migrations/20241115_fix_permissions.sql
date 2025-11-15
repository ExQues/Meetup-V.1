-- Migration para corrigir permissões da tabela submissions
-- Habilitar RLS e configurar políticas adequadas

-- Habilitar Row Level Security na tabela submissions
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes (se houver)
DROP POLICY IF EXISTS "Permitir leitura pública" ON submissions;
DROP POLICY IF EXISTS "Permitir inserção pública" ON submissions;
DROP POLICY IF EXISTS "Permitir leitura autenticada" ON submissions;
DROP POLICY IF EXISTS "Permitir inserção autenticada" ON submissions;

-- Criar política para permitir leitura pública (para o admin)
CREATE POLICY "Permitir leitura pública" ON submissions
    FOR SELECT
    USING (true);

-- Criar política para permitir inserção pública (para o formulário)
CREATE POLICY "Permitir inserção pública" ON submissions
    FOR INSERT
    WITH CHECK (true);

-- Garantir que anon role tenha permissões adequadas
GRANT SELECT ON submissions TO anon;
GRANT INSERT ON submissions TO anon;

-- Garantir que authenticated role tenha permissões adequadas  
GRANT SELECT ON submissions TO authenticated;
GRANT INSERT ON submissions TO authenticated;

-- Verificar permissões atuais
SELECT 
    table_name,
    grantee,
    privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'submissions' 
AND grantee IN ('anon', 'authenticated')
ORDER BY grantee, privilege_type;