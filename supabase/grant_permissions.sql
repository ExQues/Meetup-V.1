-- Conceder permissões para a tabela submissions
-- Permissões para usuários anônimos (inserção de formulários)
GRANT INSERT ON submissions TO anon;
GRANT SELECT ON submissions TO anon;

-- Permissões para usuários autenticados 
GRANT ALL ON submissions TO authenticated;

-- Permissões para leitura de estatísticas
GRANT SELECT ON submissions TO anon;
GRANT SELECT ON submissions TO authenticated;