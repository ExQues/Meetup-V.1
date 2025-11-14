## Objetivo
- Mover “Formulário” para uma página dedicada acessível em `http://localhost:5173/formulário`.

## Mudanças
1. Criar `src/pages/Formulario.tsx` com estrutura básica de formulário.
2. Registrar rota: adicionar `<Route path="/formulário" element={<Formulario/>}/>` em `src/App.tsx`.
3. Atualizar navbar: trocar o item “Formulário” para usar `Link` com `to="/formulário"` em vez de scroll.
4. Remover a seção `id="formulario"` da `EventPage.tsx`.

## Validação
- Abrir `http://localhost:5173/` e usar a navbar para ir a `Formulário`.
- Acessar diretamente `http://localhost:5173/formulário` e confirmar renderização.

## Arquivos
- `src/App.tsx`
- `src/pages/EventPage.tsx`
- `src/pages/Formulario.tsx`