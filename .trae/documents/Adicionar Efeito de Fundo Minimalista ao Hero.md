## Objetivo
Adicionar um efeito de fundo elegante e minimalista no início da página (hero), mantendo o visual preto puro e sem distrair do conteúdo.

## Conceito de Efeito
- "Soft Spotlight": um brilho radial suave atrás do título para dar profundidade
- "Subtle Beams": um conic gradient com rotação lenta e opacidade muito baixa para movimento sutil
- Acessível e leve: sem imagens pesadas; apenas CSS via Tailwind com classes arbitrárias

## Onde Aplicar
- Dentro da seção do hero em `src/pages/EventPage.tsx`, mantendo `section` com `relative overflow-hidden`
- Inserir um wrapper de fundo absolutamente posicionado acima da `container` selecionada

## Passos de Implementação
1. Inserir o wrapper de layers de fundo logo após a abertura do `section` e antes do `div.container`:
```
<div aria-hidden="true" className="pointer-events-none absolute inset-0">
  {/* Layer 1: Soft Spotlight */}
  <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[60vh] w-[60vw] max-w-[900px] rounded-full blur-3xl opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]"></div>
  {/* Layer 2: Subtle Beams */}
  <div className="absolute inset-0 opacity-[0.03] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.12)_0deg,transparent_90deg,rgba(255,255,255,0.12)_180deg,transparent_270deg)] animate-[spin_30s_linear_infinite]"></div>
</div>
```
2. Manter o `div.container` com `relative z-10` para o conteúdo ficar acima do efeito.
3. Remover qualquer antigo background do hero (se existir) para não sobrepor efeitos.
4. Garantir que o `section` tenha `relative overflow-hidden` para cortar o efeito nas bordas.

## Ajustes Finos (Opcional)
- Intensidade do brilho: ajustar `opacity-10` (entre 5–10)
- Tamanho do spotlight: ajustar `h-[50–70vh]` e `w-[50–70vw]`
- Velocidade dos beams: `animate-[spin_30s_linear_infinite]` (pode ir para 45s)

## Verificação
- Checar contraste: título continua legível sobre o efeito
- Responsivo: testar em 375px (mobile) e 1280px (desktop)
- Performance: sem imagens, apenas CSS; impacto mínimo

## Entregáveis
- Efeito de fundo aplicado no hero com layers radiais e cônicos, ultra minimalista, sutil e elegante.

Confirma aplicar este efeito agora? 