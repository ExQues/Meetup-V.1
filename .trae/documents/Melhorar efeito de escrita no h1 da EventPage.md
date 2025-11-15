## Objetivo
- Aplicar um efeito de escrita fluido e responsivo no `h1` mantendo o visual atual, substituindo o fade-in de palavras por uma animação letra‑a‑letra com cursor.

## Estado atual
- O título em `src/pages/EventPage.tsx:58-63` usa `framer-motion` para revelar cada palavra com `opacity/y` e delays.
- Não há efeito de digitação; apenas um fade sequencial por palavra.

## Opções de Efeito
- Framer Motion por letra: dividir o texto em caracteres, animar com `staggerChildren` e um caret piscando. Mantém a stack atual.
- CSS puro com `steps()`: animar `width`/`clip` do texto com `steps(n)` e `::after` para caret. Sem JS, ótima performance.
- Biblioteca externa (TypewriterJS/GSAP): evita por ora para não adicionar dependência.

## Implementação Sugerida (Framer Motion)
- Criar `src/components/TypingText.tsx` reutilizável.
- Props: `text`, `speed` (ms por letra), `delay` (ms inicial), `once` (boolean), `className`.
- Interna: wrap por `motion.span` para cada caractere com variants `{hidden: {opacity:0}, show: {opacity:1}}` e pequena translação `y` opcional; usar container com `staggerChildren` baseado em `speed`.
- Caret: `motion.span` com animação de opacidade (blink) posicionado ao fim do texto; ocultar após finalizar (opcional).
- Acessibilidade: `aria-label` com o texto completo; respeitar `prefers-reduced-motion` renderizando tudo de uma vez.

## Aplicação na EventPage
- Manter classes do `h1` em `src/pages/EventPage.tsx:58`.
- Substituir os quatro `<motion.span>` de `src/pages/EventPage.tsx:59-62` por `<TypingText text="Demonstração e Live Demo" speed={40} delay={80} once className="inline-block" />`.
- Garantir `viewport={{once:true}}` para a primeira aparição (container).

## Performance e UX
- Rodar apenas uma vez quando o `h1` entrar na viewport.
- Duração total ~1.5s (ajustável por `speed`).
- Nenhuma dependência nova; efeito consistente com Framer Motion já usado.

## Validação
- Verificar em dev server a sincronização do caret e velocidade em breakpoints.
- Testar com `prefers-reduced-motion` e sem JS (render imediato).

## Próximos Passos
- Implementar `TypingText`, substituir no `EventPage`, ajustar velocidade e commit.

Confirma que seguimos com esta implementação baseada em Framer Motion?