## Diagnóstico
- Uso atual do efeito no hero em src/pages/EventPage.tsx:24 com `<BackgroundBeams className="opacity-[0.12]" />`; a opacidade baixa pode tornar o efeito invisível sobre fundo preto.
- Componentes e util: `src/components/ui/background-beams.tsx` e `src/lib/utils.ts` criados corretamente.
- Dependência `framer-motion` instalada.
- `tsconfig.json` já tem alias `@/*` apontando para `./src/*`.
- Possível causa de invisibilidade: o SVG usa `stopColor="var(--neutral-300)"` em defs; variável CSS não está definida no projeto, resultando em cor inválida.
- A camada antiga (glow/beams custom) foi removida, mas restam efeitos de opacidade por scroll que não afetam o novo componente.

## Correções Propostas
1. Definir a variável CSS usada pelo SVG:
- Adicionar em `src/index.css` dentro de `:root`: `--neutral-300: #d1d5db`.
2. Remover a opacidade arbitrária no uso do componente:
- Trocar `<BackgroundBeams className="opacity-[0.12]" />` por `<BackgroundBeams />` para que as cores e animações do componente tenham intensidade correta.
3. Garantir layering:
- Manter `<BackgroundBeams />` como primeiro filho da `<section className="relative overflow-hidden">`.
- Manter o conteúdo dentro de `div.container` com `relative z-10`.
4. Confirmar namespace SVG:
- Garantir `xmlns="http://www.w3.org/2000/svg"` (já aplicado).
5. Remover código legado do hero (opacidade no scroll) não relacionado ao componente pronto:
- Apagar o `useEffect` que ajusta opacidade de refs antigas para evitar confusão.

## Integração shadcn/Tailwind/TS
- Projeto já está em TS + Tailwind.
- Estrutura shadcn recomendada: `src/components/ui` (já usada) e `src/lib/utils` (criado).
- Se desejar usar o CLI do shadcn futuramente:
  - `npx shadcn@latest init` (configurar base em `src/components`)
  - `npx shadcn@latest add input` para componentes adicionais

## Testes
- Verificar visibilidade em dark background: efeito deve aparecer com linhas em azul/roxo animadas.
- Conferir HMR: atualização sem erro.
- Performance: inspecionar no DevTools (FPS estável).

## Entregável
- Hero exibindo apenas o efeito `BackgroundBeams`, visível e animado.
- Sem comportamento de mouse/parallax; apenas o efeito do componente pronto.

Posso aplicar estas correções agora?