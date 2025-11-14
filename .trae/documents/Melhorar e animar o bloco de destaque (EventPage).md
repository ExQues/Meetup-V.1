## Objetivo
- Intensificar apelo visual e microinterações no bloco de destaque sem novas libs
- Usar Tailwind + Framer Motion já presentes, e `BackgroundBeams`

## Efeitos
1. Fundo dinâmico sutil
- Inserir `BackgroundBeams` atrás do conteúdo com cor `#32F08C` e opacidade suave
- Aplicar `relative` no container e `pointer-events-none` no fundo

2. Título com gradiente e brilho
- Converter o `h1` em gradiente (`bg-clip-text text-transparent`) de branco→cinza
- Stagger de palavras com `motion.span` para entrada sequencial
- Leve `drop-shadow` para realçar

3. Subtítulo com neon e sublinhado animado
- Manter “TRAE SOLO” em verde com animação de pulso suave
- Adicionar sublinhado gradient que expande ao `hover` do grupo

4. Parágrafo com leve parallax
- Aumentar `leading-relaxed` e aplicar `y` micro deslocamento ao `hover` do grupo

5. CTA com interações
- Borda com `ring` e brilho em `hover`, `shadow-[0_0_60px_rgba(50,240,140,0.35)]`
- Arrow desliza mais (translate-x), botão cresce levemente
- Radial glow via `before:` pseudo‑element

## Alterações no código (arquivos/linhas)
- `src/pages/EventPage.tsx:74`
  - Tornar `<div className="max-w-4xl mx-auto text-center">` em `relative group max-w-4xl mx-auto text-center`
  - Inserir `<BackgroundBeams className="absolute inset-0 pointer-events-none opacity-30" color="#32F08C" />`

- `src/pages/EventPage.tsx:77-85`
  - `h1` com classes de gradiente e `motion.span` por palavra com `variants` para stagger

- `src/pages/EventPage.tsx:86-91`
  - “TRAE SOLO” com animação de pulso; adicionar `after:` sublinhado gradient que cresce no `group-hover`

- `src/pages/EventPage.tsx:94-102`
  - CTA: acrescentar `ring-1 ring-gray-700 hover:ring-gray-500`, brilho de sombra, e `before:` radial glow; aumentar `group-hover:translate-y-0.5` e `group-hover:scale-105`

## Verificação
- Rodar o dev, validar animações em desktop/mobile
- Checar contraste e performance (repetição infinita leve, sem jank)

## Entregáveis
- Bloco com fundo dinâmico discreto, título gradiente com entrada suave, subtítulo com destaque animado, CTA com brilho e seta mais responsiva.
