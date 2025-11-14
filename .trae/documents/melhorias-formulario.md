# Melhorias na Página de Formulário

## Objetivo
Aprimorar a página de formulário com design sofisticado, melhor acessibilidade e feedback de envio, mantendo coerência com o tema visual do site.

## 1. Estrutura e Validação

### Formulário Controlado
- Implementar `<form>` com `onSubmit` e estado controlado via `useState`
- Campos: `nome`, `email`, `assunto`, `mensagem`, `errors`
- Tipos corretos: `type="text"`, `type="email"`, `required` em campos obrigatórios

### Validação
- Validação de email com regex
- Validação de campos obrigatórios
- Estados de erro com mensagens claras

## 2. Acessibilidade

### Labels e Associações
- Labels associados com `htmlFor` + `id`
- Uso de `aria-invalid` e `aria-describedby` para erros
- Foco visível com classes `focus-visible`

### Navegação por Teclado
- Tab order lógico
- Focus management entre campos
- Indicadores visuais de foco

## 3. Design Visual

### Container Card
- Envolver formulário em componente `Card` (@/components/ui/card)
- Estilo consistente: bordas sutis, gradiente leve, sombra discreta
- Background: `bg-neutral-900`
- Bordas: `border-white/10`
- Foco: `focus:ring-2 focus:ring-white/20`
- Bordas arredondadas: `rounded-2xl`

### Botão de Envio
- Estilo primário com contraste
- Micro-animação no hover
- Gradiente verde discreto ou preto com hover de borda
- Estado de loading com spinner

## 4. Animações e Feedback

### Animações de Entrada
- Fade-in suave do título e container
- Uso de `framer-motion` (já presente no projeto)
- Animações `motion.h1` e `motion.form`

### Feedback de Envio
- Estado de carregamento no botão (`disabled`, spinner CSS)
- Mensagem de sucesso/erro abaixo do formulário
- Animação com `motion.div` para mensagens

## 5. Estados do Formulário

### Estados de Loading
- Botão desabilitado durante envio
- Spinner visual simples
- Mensagem "Enviando..."

### Estados de Sucesso/Erro
- Mensagem clara de confirmação
- Mensagens de erro específicas por campo
- Reset do formulário após sucesso

## 6. Responsividade

### Grid Layout
- Manter `grid sm:grid-cols-2` para campos lado a lado
- Adaptação automática para mobile
- Labels e erros ajustáveis

### Breakpoints
- Mobile: formulário em coluna única
- Tablet/desktop: grid com 2 colunas
- Espaçamento consistente em todas as resoluções

## 7. Implementação Técnica

### Arquivo Principal
- `src/pages/Formulario.tsx`
- Substituir bloco de campos soltos (linhas 14-20)
- Adicionar `<form>` completo com validação

### Integração
- Manter rota `/formulario` em `src/App.tsx`
- Preservar estilo `pt-24` existente
- Compatível com navegação existente

## 8. Testes e Validação

### Testes de Funcionalidade
- Preenchimento completo do formulário
- Validação de campos obrigatórios
- Teste de envio com loading
- Validação de formato de email

### Testes de Acessibilidade
- Navegação por teclado
- Leitura de labels por screen readers
- Estados de erro anunciados corretamente
- Contraste de cores adequado

### Testes de Responsividade
- Visualização em diferentes dispositivos
- Teste de orientação portrait/landscape
- Verificação de espaçamento e layout

## Resultado Esperado
- Página de formulário elegante e funcional
- Coerência total com o tema escuro do site
- Excelente experiência do usuário
- Base preparada para integração com backend