## 1. Análise Técnica
- Estado atual (src/pages/EventPage.tsx:23–26, 5–18):
  - Glow radial segue o mouse usando `useEffect` + `mousemove` e define `transform` diretamente (linear, sem suavização).
  - Camada de beams usa `animate-[spin_60s_linear_infinite]` (rotação constante, sem easing).
  - Sem `requestAnimationFrame`, sem interpolação, sem desacoplamento de input versus render (pode parecer "bruto").
  - Sem `will-change`/`translate3d`, o browser pode não otimizar o movimento.
- Parâmetros que controlam suavidade:
  - Ganho de movimento no mouse (`* 40`, `* 24` → intensidade/velocidade).
  - Blur e opacidade do glow (`blur-[220px]`, `opacity-40` → suavidade visual).
  - Duração/tempo dos beams (`spin 60s` → velocidade e caráter do movimento).
- Interpolação atual: inexistente (aplica valores brutos do mouse). Precisamos de `lerp/spring` + `raf`.

## 2. Pesquisa de Referências
- Efeitos similares:
  - Framer Motion “Mouse Parallax” + `useSpring` para suavizar `motionValue`.
  - GSAP `QuickSetter` + `gsap.to` com `ease: 'power2.out'` para seguir cursor com suavização.
  - Vanilla `lerp` + `requestAnimationFrame` (parallax suave clássico).
- Técnicas de smoothing/easing:
  - `lerp(current, target, alpha)` com `alpha` entre 0.06–0.12 para suavidade.
  - `spring` (damping/stiffness) para movimentos naturais.
  - Easing functions (`easeInOutSine`, `easeOutQuad`) para transições de rotação/opacity.
- Bibliotecas:
  - Framer Motion: fácil integração em React; `motion.div`, `useSpring`, `transition` com `spring`.
  - GSAP: controle fino, ótima performance; `gsap.to` com `overwrite: true` para updates de cursor.
  - Mantemos opção Vanilla por leveza e zero dependências.

## 3. Estratégias de Implementação
- Suavizar o follow do mouse (opção sem lib):
  - Usar `requestAnimationFrame` e `lerp`:
  ```ts
  // pseudocódigo
  let tx=0, ty=0, cx=0, cy=0
  const SMOOTH=0.09
  window.addEventListener('mousemove', (e)=>{tx=(e.clientX-window.innerWidth/2)*0.08; ty=(e.clientY-window.innerHeight/2)*0.05})
  function loop(){
    cx += (tx - cx) * SMOOTH
    cy += (ty - cy) * SMOOTH
    glow.style.transform = `translate(-50%,0) translate3d(${cx}px,${cy}px,0)`
    requestAnimationFrame(loop)
  }
  loop()
  ```
  - Adicionar `will-change: transform` no glow (Tailwind: `will-change-transform`).
- Suavizar rotação dos beams:
  - Trocar rotação linear infinita por rotação alternada com easing:
  ```css
  @keyframes slow-rotate { from{transform:rotate(-10deg)} to{transform:rotate(10deg)} }
  /* Tailwind plugin/inline: animate-[slow-rotate_20s_ease-in-out_infinite_alternate] */
  ```
  - Alternar opacidade com `ease-in-out` para respiração sutil.
- Motion blur/efeitos secundários (leves):
  - “Falso motion blur”: duplicar 1–2 layers do glow com opacidade menor e pequeno atraso usando CSS `transition` em `opacity` (o rastro suaviza percepção).
  - Ajustar `blur` do glow dinamicamente com base na velocidade (clamp em 180–240px) — opcional.
- Timing/duração:
  - Glow segue cursor com `SMOOTH` 0.08–0.12 (desktop), 0.15–0.2 (mobile) para menor jitter.
  - Beams: duração 60–120s; alternado (ping-pong) com `ease-in-out`.
- Física básica (opção com Framer Motion):
  - `transition={{ type: 'spring', stiffness: 60, damping: 14 }}` em `motion.div` para `x,y` do glow.
  - `rotate` dos beams com `ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror'`.

## 4. Plano de Testes
- Casos de velocidade:
  - Movimentos lentos, médios, rápidos do mouse; medir tempo de settle (ms) e ausência de jitter.
- Dispositivos/performance:
  - Desktop 60/120Hz; Laptop; Mobile (touch: usar `deviceorientation` ou desativar movimento e manter apenas respiração).
  - DevTools Performance: FPS, layout thrashing; confirmar GPU via `translate3d`.
- Feedback visual:
  - 3 variações de intensidade (Light/Medium/Strong) em um toggle (dev-only) para aprovação rápida.

## 5. Documentação
- Parâmetros ajustáveis:
  - `SMOOTH`, `GAIN_X/Y`, `BLUR_PX`, `GLOW_OPACITY`, `BEAMS_DURATION`, `BEAMS_OPACITY`.
- Decisões de design:
  - Priorizar leveza (CSS + raf), evitar libs a menos que necessário.
  - Desativar follow em mobile; manter efeito respirando.
- Guia de estilo:
  - Camadas: Glow (depth), Beams (motion), Vignette (focus).
  - Intensidade default: Medium. Paleta sempre monocromática (white on black, opacities).

## 6. Cronograma
- Pesquisa (2 dias): comparar Vanilla vs Framer Motion/GSAP, definir abordagem.
- Implementação inicial (3 dias): `raf + lerp`, easing dos beams, fallback mobile.
- Ajustes finos (2 dias): calibração de parâmetros por device, opcional trail/blur dinâmico.
- Testes e refinamento (1 dia): performance, feedback, documentação.

Deseja que eu siga com a implementação Vanilla (leve e sem dependências) ou prefere Framer Motion para um controle mais elegante das curvas de easing? 