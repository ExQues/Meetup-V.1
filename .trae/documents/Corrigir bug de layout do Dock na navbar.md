## Problema
- Ao passar o mouse, o Dock aumenta a altura do header e empurra o conteúdo para baixo, causando "pulo" visual.

## Solução
- Fixar a altura do Dock no valor do painel e impedir o crescimento vertical.
- Usar `overflow-visible` para que o ícone amplie sem alterar o layout.
- Simplificar eventos do Dock (remover animação de altura baseada em hover).
- Manter espaçamento superior do conteúdo (`pt-24`).

## Passos
1. Em `src/App.tsx`, ajustar o componente `Dock` para:
   - Remover `isHovered`, `maxHeight`, `heightRow`, `height`.
   - Definir `style={{ height: panelHeight }}` para o container do Dock.
   - Trocar `overflow-x-auto` por `overflow-visible`.
   - Manter `mouseX` para efeito de magnificação sem alterar altura.
2. Validar visual no `localhost:5173`.

## Referências
- Dock atual: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\App.tsx:60-106`