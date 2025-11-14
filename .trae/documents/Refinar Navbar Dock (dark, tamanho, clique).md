## Objetivo
- Melhorar a aparência e usabilidade do Dock na navbar: visual dark, menor altura, ampliação mais suave e ações de clique para navegar pelas seções.

## Ajustes Visuais
- Forçar estilo dark no Dock com `bg-black/40`, `border-white/10` e `backdrop-blur-sm`.
- Reduzir `panelHeight` para 48, `magnification` para 64 e `distance` para 120.
- Tornar o header transparente e centralizar o Dock sem barra sólida.
- Diminuir o espaçamento superior do conteúdo para `pt-24`.

## Usabilidade
- Adicionar cliques nos itens do Dock para rolar suavemente para seções: `hero`, `features`, `sobre`, `footer`.
- Identificar as seções em `EventPage.tsx` com `id`.

## Implementação
1. Atualizar `src/App.tsx` para passar `className` customizada ao `Dock`, setar os novos parâmetros e adicionar `onClick` em cada `DockItem` com `scrollIntoView`.
2. Adicionar `id` em seções de `src/pages/EventPage.tsx`.

## Validação
- Ver no `localhost:5173` se o Dock fica discreto e funcional, sem sobrepor conteúdo.

## Referências
- App: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\App.tsx`
- Página: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\pages\EventPage.tsx`