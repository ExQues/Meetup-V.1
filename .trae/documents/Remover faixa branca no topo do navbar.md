## Causa
- O `<header>` está transparente e seu conteúdo tem `mt-2` (`src/App.tsx:195`), criando um espaço visível no topo.
- `html, body` não têm `background-color` definido, então o fundo padrão branco aparece nesse espaço (`src/index.css:12-18`).
- O componente `Dock` tem um fundo padrão `bg-gray-50` na classe base, que pode introduzir claro no topo dependendo da ordem das classes (`src/App.tsx:89`).

## Alterações Propostas
1. `src/App.tsx`
   - Em `<header ...>` adicionar `bg-black` para cobrir qualquer área transparente.
   - Remover `mt-2` do container interno: trocar `className="flex justify-center px-6 mt-2"` por `className="flex justify-center px-6"`.
2. `src/index.css`
   - Definir fundo global: adicionar `background-color: #000;` a `html, body { ... }`.
3. `src/App.tsx` (componente `Dock`)
   - Trocar o fundo padrão da classe base de `bg-gray-50` para `bg-transparent`, deixando o fundo ser totalmente controlado pela `className` passada (`bg-black/40`).

## Validação
- Reiniciar/atualizar o dev server (já em execução) e recarregar `http://localhost:5173/`.
- Confirmar visualmente que não há faixa clara no topo e que o navbar permanece legível.

## Observações
- As mudanças são mínimas e não afetam a navegação ou layout abaixo (`pt-16` continua compensando a altura do header).