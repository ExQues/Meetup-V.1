## Objetivo
- Ajustar a navbar Dock para conter exatamente os itens: Início, Formulário e Comunidade, com cliques que rolam para as respectivas seções.

## Mudanças
1. `src/App.tsx`
   - Trocar o item "Evento" por "Formulário" e remover "Live".
   - Importar o ícone `FileText` do `lucide-react` para representar Formulário.
   - Mapear cliques: Início → `#hero`, Formulário → `#formulario`, Comunidade → `#sobre`.
2. `src/pages/EventPage.tsx`
   - Adicionar uma seção com `id="formulario"` (placeholder visual) para habilitar o scroll suave.

## Validação
- Acessar `localhost:5173` e testar os três itens da navbar; confirmar que rolam para as seções corretas e sem deslocamentos de layout.

## Referências
- Navbar atual: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\App.tsx:197-235`
- Página: `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\pages\EventPage.tsx`