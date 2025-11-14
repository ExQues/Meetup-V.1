# Deploy e Desenvolvimento - Documento Consolidado

## Objetivo Geral
Configurar e manter o ambiente de desenvolvimento e processo de deploy do site TRAE Meetup.

## 1. Desenvolvimento Local

### Inicialização do Projeto
**Comando para rodar o site localmente:**
```bash
npm run dev
```
- Servidor Vite React em `localhost:5173`
- Hot reload automático para desenvolvimento
- TypeScript e Tailwind CSS configurados

### Estrutura do Projeto
- `src/pages/`: páginas principais (EventPage, Comunidade, Formulario)
- `src/components/`: componentes reutilizáveis
- `src/App.tsx`: configuração de rotas e navbar global
- `src/index.css`: estilos globais e keyframes

### Dependências Principais
- React + TypeScript
- Vite (build tool)
- Tailwind CSS (estilização)
- Framer Motion (animações)
- Lucide React (ícones)
- React Router DOM (navegação)

## 2. Controle de Versão (Git)

### Comandos Essenciais
```bash
# Inicializar repositório (se necessário)
git init

# Adicionar todas as mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: descrição da funcionalidade"

# Push para repositório remoto
git push origin main
```

### Boas Práticas de Commit
- Mensagens claras e descritivas
- Commits atômicos (uma funcionalidade por commit)
- Uso de convenções (feat:, fix:, docs:, etc.)

### Branches Recomendadas
- `main`: código em produção
- `develop`: desenvolvimento ativo
- `feature/nome-da-feature`: novas funcionalidades

## 3. Deploy para Produção

### Plataforma: Vercel
**Por que Vercel?**
- Deploy automático a partir do Git
- Otimização para React/Vite
- CDN global integrado
- Preview de PRs automáticos

### Configuração do Deploy
1. **Conectar repositório Git ao Vercel**
2. **Configurar build settings:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Variáveis de ambiente (se necessário)**
   - Configurar em Settings → Environment Variables

### Arquivo de Configuração (vercel.json)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Processo de Deploy
1. Push código para branch main
2. Vercel detecta mudanças automaticamente
3. Build e deploy executados
4. Site disponível em URL única

## 4. Monitoramento e Manutenção

### Performance
- Monitorar Core Web Vitals
- Verificar tempo de carregamento
- Otimizar imagens e assets

### SEO
- Meta tags configuradas
- Sitemap XML
- Robots.txt
- Open Graph tags

### Acessibilidade
- Testes de contraste
- Navegação por teclado
- Screen reader compatibility
- WCAG compliance

## 5. Troubleshooting Comum

### Problemas de Build
- Verificar dependências em `package.json`
- Limpar cache: `npm run build -- --force`
- Checar TypeScript errors: `npm run check`

### Problemas de Deploy
- Verificar variáveis de ambiente
- Confirmar rotas em `vercel.json`
- Checar logs de build no Vercel dashboard

### Performance Issues
- Analisar bundle size
- Verificar imports desnecessários
- Otimizar imagens e fonts

## 6. Checklist de Deploy

### Antes do Deploy
- [ ] Código testado localmente
- [ ] Todos os commits feitos
- [ ] Branch main atualizada
- [ ] Build local funciona: `npm run build`
- [ ] TypeScript sem erros: `npm run check`

### Durante o Deploy
- [ ] Build completa sem erros
- [ ] Preview URL funciona
- [ ] Testes de usuário final passam
- [ ] Mobile responsive check

### Após o Deploy
- [ ] Site produção acessível
- [ ] Links funcionando
- [ ] Forms submetendo
- [ ] Performance aceitável

## 7. Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # TypeScript check
```

### Git
```bash
git status           # Ver status
git log --oneline    # Ver commits recentes
git diff             # Ver mudanças
```

### Manutenção
```bash
npm update           # Atualizar dependências
npm audit            # Verificar vulnerabilidades
npm outdated         # Ver pacotes desatualizados
```

## Resultado Esperado
- Processo de deploy automatizado e confiável
- Site performante e acessível
- Manutenção simplificada
- Desenvolvimento ágil e eficiente