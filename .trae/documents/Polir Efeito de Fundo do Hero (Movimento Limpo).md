## Objetivo
- Deixar o efeito do fundo no hero mais limpo, elegante e consistente, com movimento suave e discreto, sem ruído visual.

## Análise Atual
- Camadas ativas em `src/pages/EventPage.tsx:23–26`: `hero-glow` com parallax via rAF+lerp e `hero-beams` com rotação/easing.
- Ponto de melhoria: entrada sem fade, movimento do glow responde linearmente ao cursor, beams podem ter variação de opacidade mais orgânica, e intensidade não se ajusta ao scroll.

## Melhorias Propostas (Polimento)
- **Entrada Suave (Fade-In + Scale)**: animar a camada de fundo ao carregar para evitar “aparecimento seco”.
- **Smoothing Adaptativo**: ajustar o lerp com base na velocidade do cursor (deltaTime) e aplicar zona morta (deadzone) para micro movimentos.
- **Opacidade por Scroll**: reduzir opacidade do efeito conforme o usuário desce a página (heroHeight → 0), mantendo foco no conteúdo abaixo.
- **Beams Mais Discretos**: rotação mais lenta com easing espelhado (mirror) e respiração de opacidade leve.
- **Vignette Sutil e Máscara**: reforçar foco central com vignette muito leve e limitar o efeito à área do hero.
- **Acessibilidade & Performance**: respeitar `prefers-reduced-motion` e desativar o parallax em dispositivos com ponteiro coarse (mantém apenas respiração e rotação).

## Passos de Implementação
1. **CSS Keyframes (index.css)**
- Adicionar `@keyframes hero-fade-in` e utilitários:
```
@keyframes hero-fade-in { 0%{opacity:0; transform:scale(1.02)} 100%{opacity:1; transform:scale(1)} }
.hero-fade-in { animation: hero-fade-in 800ms ease-out both; }
```
- Ajustar `slow-rotate` para amplitude menor e duração maior; manter `breathe-opacity` com menor pico (0.10 → 0.08).

2. **Wrapper do Fundo (EventPage.tsx)**
- Aplicar `.hero-fade-in` no container das camadas e reforçar `mask-image` (via gradient) para limitar verticalmente:
```
<div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-fade-in" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)' }}>
```

3. **Loop rAF com Smoothing Adaptativo**
- Usar `performance.now()` para deltaTime e ajustar `SMOOTH` dinamicamente:
```
let last = performance.now()
function loop(){
  const now = performance.now(); const dt = Math.min((now - last)/16.7, 3); last = now
  const speed = Math.hypot(tx - cx, ty - cy)
  const smooth = clamp(baseSmooth - speed*0.0008, 0.06, baseSmooth)
  cx += (tx - cx) * smooth * dt
  cy += (ty - cy) * smooth * dt
  // deadzone
  if (Math.abs(tx - cx) < 0.5) cx = tx
  if (Math.abs(ty - cy) < 0.5) cy = ty
  glow.style.transform = `translate(-50%,0) translate3d(${cx}px,${cy}px,0)`
  raf = requestAnimationFrame(loop)
}
```

4. **Opacidade por Scroll**
- Adicionar listener de scroll para ajustar opacidade das camadas:
```
const hero = sectionRef.current
const onScroll = () => {
  const h = hero?.offsetHeight ?? 1
  const p = clamp(window.scrollY / h, 0, 1)
  const o = 1 - p * 0.7 // desce até ~30% da intensidade
  if (glowRef.current) glowRef.current.style.opacity = String(0.4 * o)
  if (beamsRef.current) beamsRef.current.style.opacity = String(0.12 * o)
}
window.addEventListener('scroll', onScroll)
```

5. **Acessibilidade/Performance**
- Detectar `prefers-reduced-motion` e desabilitar rAF; manter apenas fade-in + beams muito lentos.
- Em `pointer: coarse`, manter `SMOOTH` alto e `GAIN` baixo; ou desativar follow do cursor.

## Plano de Testes
- **Velocidades de cursor**: lento/médio/rápido; verificar ausência de jitter e rastro.
- **Scroll**: verificar transição de opacidade ao sair do hero.
- **Dispositivos**: desktop 60/120Hz, mobile (coarse pointer), laptop.
- **Performance**: DevTools Performance (FPS estável), sem layout thrashing; confirmar GPU no `translate3d`.
- **Feedback visual**: habilitar toggles de intensidade (Light/Medium/Strong) temporários para avaliação.

## Documentação
- Parâmetros ajustáveis: `baseSmooth`, `GAIN_X/Y`, opacidades iniciais, amplitude/duração de rotação, máscara vertical.
- Decisões: manter monocromático, evitar ruído/granulado; respeitar reduzido movimento.
- Guia de estilo: efeito deve ser invisível no texto, perceptível no fundo; foco no centro do hero.

## Cronograma
- Implementação imediata (nesta sessão): keyframes, wrapper, rAF adaptativo, scroll-opacidade.
- Ajustes finos (mesma sessão): calibrar valores e verificar em desktop/mobile.

Posso aplicar agora essas melhorias de polimento no hero?