# 🚀 Meetup Registration Platform

Uma plataforma completa para gerenciamento de eventos e cadastro de participantes, com painel administrativo em tempo real.

## 🌟 Funcionalidades

- **📋 Formulário de Inscrição** - Interface intuitiva para cadastro de participantes
- **🔐 Painel Administrativo** - Dashboard completo com estatísticas em tempo real
- **📊 Analytics** - Gráficos de tendências e métricas de cadastro
- **💾 Backend Real** - Banco de dados Supabase para persistência de dados
- **📱 Responsivo** - Funciona perfeitamente em dispositivos móveis
- **🎨 Design Moderno** - Interface dark com animações suaves

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Estilização)
- Framer Motion (Animações)
- Recharts (Gráficos)
- React Router DOM (Navegação)

### Backend
- Node.js + Express
- TypeScript
- Supabase (PostgreSQL)
- JWT (Autenticação)
- CORS & Helmet (Segurança)

## 📦 Instalação

### Pré-requisitos
- Node.js (v18 ou superior)
- npm/pnpm/yarn
- Conta no Supabase (gratuito)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/meetup-platform.git
cd meetup-platform
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
# Backend
JWT_SECRET=sua_chave_secreta_super_segura_aqui
ADMIN_PASSWORD=sua_senha_admin_aqui
PORT=5004

# Supabase
SUPABASE_URL=sua_url_do_supabase
SUPABASE_SERVICE_ROLE=sua_service_role_key
SUPABASE_ANON_KEY=sua_anon_key
```

Crie um arquivo `.env.local` na raiz do projeto:
```env
# Frontend
VITE_API_URL=http://localhost:5004/api
VITE_ADMIN_PASS=sua_senha_admin_aqui
```

4. **Configure o Supabase**

- Crie um projeto no [Supabase](https://supabase.com)
- Execute a migration SQL em `supabase/migrations/20241115_create_submissions.sql`
- Copie as credenciais para o arquivo `.env`

5. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
# ou
npm run dev
```

6. **Acesse a aplicação**
- Frontend: http://localhost:5175
- Formulário: http://localhost:5175/formulario
- Painel Admin: http://localhost:5175/adminmeetup

## 🔑 Configuração do Admin

O painel administrativo requer autenticação. Use a senha definida na variável `ADMIN_PASSWORD` do arquivo `.env`.

## 📊 Dashboard Admin

O painel administrativo inclui:

- **Estatísticas em Tempo Real**
  - Total de inscritos
  - Cadastros de hoje
  - Cadastros da semana
  - Último cadastro

- **Gráficos Interativos**
  - Tendências de cadastro (últimos 7 dias)
  - Horários mais ativos

- **Tabela de Participantes**
  - Busca e filtro em tempo real
  - Exportação para CSV
  - Limpar dados

## 🚀 Deploy

### Frontend (Vercel/Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Backend (Render/Fly.io/Railway)
1. Configure as variáveis de ambiente
2. Deploy do diretório `api/`
3. Certifique-se de que o banco Supabase está acessível

## 🔒 Segurança

- Autenticação JWT para admin
- Rate limiting no formulário (3 envios/hora por IP)
- CORS configurado
- Helmet para headers de segurança
- Dados sensíveis em variáveis de ambiente

## 📁 Estrutura do Projeto

```
meetup-platform/
├── api/                    # Backend Express
│   ├── routes/            # Rotas da API
│   ├── services/          # Lógica de negócio
│   ├── middleware/        # Middlewares
│   └── server.ts          # Entry point do servidor
├── src/                   # Frontend React
│   ├── components/        # Componentes React
│   ├── pages/             # Páginas da aplicação
│   ├── services/          # Serviços de API
│   └── main.tsx           # Entry point do React
├── supabase/              # Configurações do Supabase
│   └── migrations/        # SQL migrations
└── public/                # Assets estáticos
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Se tiver alguma dúvida ou encontrar problemas:

1. Verifique as issues existentes
2. Crie uma nova issue com detalhes do problema
3. Entre em contato: [seu-email@exemplo.com]

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!**
