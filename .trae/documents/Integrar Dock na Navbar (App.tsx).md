## Objetivo
- Inserir o código do Dock como uma navbar fixa no topo do site.

## Onde integrar
- `src/App.tsx`: criar um `header` global fixo com o Dock, acima das rotas.
- Compensar sobreposição com `pt-32` no contêiner principal.

## Mudanças
1. Adicionar imports necessários (`framer-motion`, `lucide-react`, `cn`).
2. Colar as definições `Dock`, `DockItem`, `DockLabel`, `DockIcon` no topo de `App.tsx`.
3. Renderizar um `header` com `Dock` e alguns itens com ícones/labels (Início, Evento, Comunidade, Live).
4. Envolver `<Routes>` com `div` e aplicar `pt-32` para espaçamento.

## Racional
- Não existem componentes de navbar; integrar diretamente no `App.tsx` evita criar arquivos novos.
- `Dock` como toolbar acessível e responsiva, mantendo o visual atual com Tailwind.

## Verificação
- Rodar com o servidor já ativo (`localhost:5173`) e validar que o cabeçalho aparece e não cobre o conteúdo em hover.

## Referências
- Rotas: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\App.tsx:1-12`
- Página atual: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\pages\EventPage.tsx`