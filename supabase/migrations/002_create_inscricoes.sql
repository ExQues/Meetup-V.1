-- Criar tabela de inscrições básica
CREATE TABLE IF NOT EXISTS inscricoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_inscricoes_email ON inscricoes(email);
CREATE INDEX IF NOT EXISTS idx_inscricoes_created_at ON inscricoes(created_at DESC);

-- Ativar RLS (Row Level Security)
ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;

-- Permitir inserção pública (para o formulário)
CREATE POLICY "Permitir inserção pública" ON inscricoes
  FOR INSERT WITH CHECK (true);

-- Permitir leitura pública (para listar inscrições)
CREATE POLICY "Permitir leitura pública" ON inscricoes
  FOR SELECT USING (true);

-- Negar atualização e exclusão pública
CREATE POLICY "Negar atualização pública" ON inscricoes
  FOR UPDATE USING (false);

CREATE POLICY "Negar exclusão pública" ON inscricoes
  FOR DELETE USING (false);

-- Grant permissions
GRANT INSERT ON inscricoes TO anon;
GRANT INSERT ON inscricoes TO authenticated;
GRANT SELECT ON inscricoes TO anon;
GRANT SELECT ON inscricoes TO authenticated;