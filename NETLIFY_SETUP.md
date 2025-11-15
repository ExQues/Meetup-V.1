# 🚀 GUIA DE CONFIGURAÇÃO NETLIFY

## 📋 Resumo das Variáveis de Ambiente Necessárias

### 🔑 ESSENCIAIS - Backend (Netlify Functions)
```bash
JWT_SECRET=sua_chave_secreta_super_segura_aqui_123456789
ADMIN_PASSWORD=F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT
SUPABASE_URL=https://cruvgucbbvxlvyffpskm.supabase.co
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyNDgxMiwiZXhwIjoyMDc4ODAwODEyfQ.55p-Bt1vWm0ZtShl7N1OHV3O1xbejtR4TmIfKe3OMxc
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjQ4MTIsImV4cCI6MjA3ODgwMDgxMn0.d6bZrcxY1x0mP_Tk4coLjDeFYEZ_zCEd9YVB-UbCvvE
```

### 🌐 FRONTEND - URL da API
```bash
VITE_API_URL=https://meetuptrae.netlify.app/.netlify/functions/api
```

## 🔧 Passo a Passo para Configurar no Netlify

### 1️⃣ Acesse o Netlify
- Vá para [netlify.com](https://netlify.com)
- Faça login com sua conta
- Encontre seu site "meetuptrae" na lista

### 2️⃣ Navegue até as Variáveis de Ambiente
- Clique no site "meetuptrae"
- Vá para **"Site settings"** (Configurações do Site)
- Na sidebar esquerda, clique em **"Environment variables"**
- Clique em **"Add a variable"** para adicionar cada uma

### 3️⃣ Adicione as Variáveis
**Adicione UMA POR VEZ:**

1. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: `sua_chave_secreta_super_segura_aqui_123456789`

2. **ADMIN_PASSWORD**
   - Key: `ADMIN_PASSWORD`
   - Value: `F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT`

3. **SUPABASE_URL**
   - Key: `SUPABASE_URL`
   - Value: `https://cruvgucbbvxlvyffpskm.supabase.co`

4. **SUPABASE_SERVICE_ROLE**
   - Key: `SUPABASE_SERVICE_ROLE`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyNDgxMiwiZXhwIjoyMDc4ODAwODEyfQ.55p-Bt1vWm0ZtShl7N1OHV3O1xbejtR4TmIfKe3OMxc`

5. **SUPABASE_ANON_KEY**
   - Key: `SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydXZndWNiYnZ4bHZ5ZmZwc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjQ4MTIsImV4cCI6MjA3ODgwMDgxMn0.d6bZrcxY1x0mP_Tk4coLjDeFYEZ_zCEd9YVB-UbCvvE`

6. **VITE_API_URL**
   - Key: `VITE_API_URL`
   - Value: `https://meetuptrae.netlify.app/.netlify/functions/api`

### 4️⃣ Re-deploy (Reimplantar)
- Após adicionar TODAS as variáveis
- Vá para **"Deploys"** na sidebar
- Clique em **"Trigger deploy"** → **"Deploy site"**
- Aguarde o deploy completar (2-3 minutos)

## 🧪 Como Testar Após a Configuração

### Teste 1: Health Check
```bash
curl https://meetuptrae.netlify.app/.netlify/functions/api/health
```
**Resposta esperada:** `{"status":"OK","timestamp":"2025-..."}`

### Teste 2: Login
```bash
curl -X POST https://meetuptrae.netlify.app/.netlify/functions/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT"}'
```
**Resposta esperada:** `{"token":"eyJ..."}`

### Teste 3: Acessar o Admin
1. Acesse: `https://meetuptrae.netlify.app/adminmeetup`
2. Use a senha: `F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT`
3. Você deve ver o dashboard com dados

## ⚠️ Problemas Comuns e Soluções

### ❌ Erro 502 Bad Gateway
**Causa:** Variáveis de ambiente não configuradas
**Solução:** Configure todas as variáveis acima

### ❌ Erro 404 Not Found
**Causa:** Função Netlify não está rodando
**Solução:** Verifique o deploy e as variáveis

### ❌ Erro "Token inválido"
**Causa:** JWT_SECRET diferente entre frontend/backend
**Solução:** Garanta que JWT_SECRET seja igual nos dois lugares

## 📞 Suporte
Se tiver problemas:
1. Verifique os logs em: Netlify → Deploys → Deploy mais recente → Deploy log
2. Teste localmente: `npm run build && npm run preview`
3. Confirme que todas as variáveis foram adicionadas corretamente

---
**✅ Após configurar as variáveis, seu sistema estará 100% funcional!**