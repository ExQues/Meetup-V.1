# Implementação da Navbar Dock - Documento Consolidado

## Objetivo Geral
Implementar uma navbar Dock moderna e funcional no topo do site com navegação suave entre seções.

## Fase 1: Integração Inicial

### Onde integrar
- `src/App.tsx`: criar um `header` global fixo com o Dock, acima das rotas
- Compensar sobreposição com `pt-32` no contêiner principal

### Mudanças necessárias
1. Adicionar imports necessários (`framer-motion`, `lucide-react`, `cn`)
2. Colar as definições `Dock`, `DockItem`, `DockLabel`, `DockIcon` no topo de `App.tsx`
3. Renderizar um `header` com `Dock` e itens com ícones/labels (Início, Evento, Comunidade, Live)
4. Envolver `<Routes>` com `div` e aplicar `pt-32` para espaçamento

## Fase 2: Refinamento Visual e Funcional

### Ajustes Visuais
- Forçar estilo dark no Dock com `bg-black/40`, `border-white/10` e `backdrop-blur-sm`
- Reduzir `panelHeight` para 48, `magnification` para 64 e `distance` para 120
- Tornar o header transparente e centralizar o Dock sem barra sólida
- Diminuir o espaçamento superior do conteúdo para `pt-24`

### Usabilidade
- Adicionar cliques nos itens do Dock para rolar suavemente para seções: `hero`, `features`, `sobre`, `footer`
- Identificar as seções em `EventPage.tsx` com `id`

### Solução de Bugs de Layout
- Fixar a altura do Dock no valor do painel e impedir o crescimento vertical
- Usar `overflow-visible` para que o ícone amplie sem alterar o layout
- Simplificar eventos do Dock (remover animação de altura baseada em hover)
- Manter espaçamento superior do conteúdo (`pt-24`)

## Implementação Final

### Passos em `src/App.tsx`
1. Ajustar o componente `Dock` para:
   - Remover `isHovered`, `maxHeight`, `heightRow`, `height`
   - Definir `style={{ height: panelHeight }}` para o container do Dock
   - Trocar `overflow-x-auto` por `overflow-visible`
   - Manter `mouseX` para efeito de magnificação sem alterar altura

2. Adicionar `onClick` em cada `DockItem` com `scrollIntoView` para navegação suave

### Passos em `src/pages/EventPage.tsx`
- Adicionar `id` nas seções principais (`hero`, `features`, `sobre`, `footer`)

## Validação
- Ver no `localhost:5173` se o Dock fica discreto e funcional, sem sobrepor conteúdo
- Validar que o Dock não empurra o conteúdo ao passar o mouse
- Testar navegação suave entre seções

## Referências
- App: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\App.tsx`
- Página: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\pages\EventPage.tsx`