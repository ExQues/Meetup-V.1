# Efeitos de Fundo do Hero - Documento Consolidado

## Objetivo Geral
Criar efeitos de fundo visualmente atraentes e suaves para a seção Hero, com foco em movimento elegante e performance otimizada.

## Fase 1: Implementação Base

### Camadas de Efeito
- `hero-glow`: efeito de brilho com parallax via rAF+lerp
- `hero-beams`: efeito de raios com rotação e easing

### Configuração inicial em `src/pages/EventPage.tsx:23–26`
- Estrutura base com animações separadas para glow e beams
- Integração com componente principal do Hero

## Fase 2: Polimento e Refinamento

### Entrada Suave (Fade-In + Scale)
- Animação ao carregar para evitar "aparecimento seco"
- CSS Keyframes adicionados em `index.css`:
```css
@keyframes hero-fade-in { 
  0%{opacity:0; transform:scale(1.02)} 
  100%{opacity:1; transform:scale(1)} 
}
.hero-fade-in { 
  animation: hero-fade-in 800ms ease-out both; 
}
```

### Smoothing Adaptativo
- Ajuste dinâmico do lerp baseado na velocidade do cursor (deltaTime)
- Zona morta (deadzone) para micro movimentos
- Uso de `performance.now()` para timing preciso

### Opacidade por Scroll
- Redução gradual da opacidade conforme o usuário desce a página
- Mantém foco no conteúdo abaixo do Hero
- Transição de 100% para ~30% da intensidade original

### Beams Mais Discretos
- Rotação mais lenta com easing espelhado (mirror)
- Respiração de opacidade leve e sutil
- Amplitude reduzida para movimento mais elegante

### Vignette e Máscara
- Reforço de foco central com vignette sutil
- Limitação vertical do efeito via gradient mask
- Aplicação em container wrapper para controle preciso

## Fase 3: Acessibilidade e Performance

### Respeito a prefers-reduced-motion
- Desativa parallax quando usuário prefere menos movimento
- Mantém apenas fade-in e rotação muito lenta dos beams

### Otimização para Dispositivos Táteis
- Detecção de `pointer: coarse` para dispositivos móveis
- Ajuste de parâmetros para experiência tátil otimizada
- Redução de sensibilidade ao movimento

### Performance
- Uso de `translate3d` para aceleração por GPU
- Evita layout thrashing com cálculos otimizados
- Monitoramento de FPS via DevTools

## Parâmetros Configuráveis

### Valores Base
- `baseSmooth`: 0.1 (fator de suavização)
- `GAIN_X/Y`: 0.3 (intensidade do parallax)
- Opacidade inicial glow: 0.4
- Opacidade inicial beams: 0.12
- Duração da rotação: 60s

### Ajustes Responsivos
- Desktop: parallax completo com alta sensibilidade
- Mobile: parallax reduzido ou desativado
- Tablets: configuração intermediária

## Testes e Validação

### Cenários de Teste
- **Velocidades de cursor**: lento/médio/rápido
- **Scroll**: transição suave de opacidade
- **Dispositivos**: desktop 60/120Hz, mobile, laptop
- **Performance**: FPS estável, sem travamentos

### Feedback Visual
- Toggle temporário de intensidade (Light/Medium/Strong)
- Visualização de parâmetros em tempo real
- Ajuste fino baseado em feedback visual

## Implementação

### Arquivos Modificados
1. `src/index.css`: adição de keyframes e utilitários
2. `src/pages/EventPage.tsx`: integração dos efeitos refinados
3. Wrapper com máscara e fade-in aplicado

### Ordem de Implementação
1. CSS keyframes e utilitários base
2. Wrapper com fade-in e máscara
3. Loop rAF com smoothing adaptativo
4. Scroll listener para opacidade dinâmica
5. Ajustes finos e calibração

## Resultado Esperado
- Efeito visual limpo e elegante
- Movimento suave e responsivo
- Performance otimizada
- Experiência acessível para todos os usuários