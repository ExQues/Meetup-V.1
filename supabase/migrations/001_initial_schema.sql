-- Criar tabela de inscrições
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  discord TEXT,
  mensagem TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para busca rápida por email
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

-- Ativar RLS (Row Level Security)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
-- Permitir leitura pública (para o frontend)
CREATE POLICY "Permitir leitura pública" ON submissions
  FOR SELECT USING (true);

-- Permitir inserção pública (para o formulário)
CREATE POLICY "Permitir inserção pública" ON submissions
  FOR INSERT WITH CHECK (true);

-- Negar atualização e exclusão pública
CREATE POLICY "Negar atualização pública" ON submissions
  FOR UPDATE USING (false);

CREATE POLICY "Negar exclusão pública" ON submissions
  FOR DELETE USING (false);

-- Grant permissions
GRANT SELECT ON submissions TO anon;
GRANT INSERT ON submissions TO anon;
GRANT SELECT ON submissions TO authenticated;
GRANT INSERT ON submissions TO authenticated;