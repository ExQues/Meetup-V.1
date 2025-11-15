# Git Setup Instructions

## Inicializar Git (se ainda não estiver inicializado)

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit: Meetup Registration Platform with Supabase backend"

# Adicionar remote origin (substitua com sua URL do GitHub)
git remote add origin https://github.com/seu-usuario/meetup-registration-platform.git

# Push para o GitHub
git push -u origin main
```

## Arquivos Importantes que já estão protegidos:

✅ **Arquivos sensíveis já ignorados no .gitignore:**
- `.env*` - Todas as variáveis de ambiente com senhas e chaves
- `node_modules/` - Dependências
- `dist/` - Arquivos de build
- `*.log` - Logs do sistema

## Próximos passos para deploy:

### 1. Criar repositório no GitHub
1. Vá para [github.com/new](https://github.com/new)
2. Nome: `meetup-registration-platform`
3. Deixe público ou privado (sua escolha)
4. Não inicialize com README (já temos um)

### 2. Configurar variáveis de ambiente no deploy:
**Frontend (Vercel):**
- `VITE_API_URL`: URL do seu backend deployado
- `VITE_ADMIN_PASS`: Senha do painel admin

**Backend (Render/Fly.io):**
- `SUPABASE_URL`: URL do seu Supabase
- `SUPABASE_SERVICE_ROLE`: Service Role Key
- `SUPABASE_ANON_KEY`: Anon Key
- `JWT_SECRET`: Chave secreta JWT
- `ADMIN_PASSWORD`: Senha do painel admin

### 3. Deploy recomendado:
- **Frontend**: Vercel (gratuito e fácil)
- **Backend**: Render ou Railway (gratuito)
- **Banco de dados**: Supabase (gratuito até 10k linhas)

## Comandos úteis:

```bash
# Ver status
git status

# Adicionar mudanças específicas
git add src/
git add api/
git add README.md

# Commit com mensagem descritiva
git commit -m "feat: add dashboard analytics and charts"

# Push
git push origin main
```

## 🚨 IMPORTANTE: Nunca commite estes arquivos:
- `.env` (contém senhas e chaves secretas)
- `node_modules/` (dependências)
- Arquivos de log
- Builds/destinos