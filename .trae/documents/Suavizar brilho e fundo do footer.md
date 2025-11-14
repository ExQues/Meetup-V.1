## Objetivo
- Escurecer levemente o cinza do `footer` e aplicar um efeito de fundo sutil que traga profundidade sem distrair.

## Abordagem (100% CSS/Tailwind)
- Ajustar o gradiente base para tons mais escuros.
- Suavizar a borda superior.
- Adicionar uma camada radial suave como overlay (com baixa opacidade), sem imagens externas.
- Manter o conteúdo nítido acima do overlay (controle de `z-index`).

## Mudanças propostas em `src/pages/EventPage.tsx`
1) Gradiente e borda do `footer`:
- De: `bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] border-t border-gray-800`
- Para: `bg-gradient-to-b from-[#0b0b0b] to-[#121212] border-t border-gray-900`

2) Overlay radial sutil (logo dentro do `footer`):
```tsx
<footer id="footer" className="relative bg-gradient-to-b from-[#0b0b0b] to-[#121212] text-white py-20 border-t border-gray-900">
  {/* linha de brilho existente no topo */}
  <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  {/* overlay radial sutil */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0)_65%)]" />
  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div className="mb-8" initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
        <h3 className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">TRAE SOLO Brasil</h3>
        <p className="text-xl text-gray-400 mb-8">Transformando ideias em realidade com inteligência artificial</p>
      </motion.div>
    </div>
  </div>
</footer>
```
- `pointer-events-none` garante que o overlay não afete cliques.
- `relative z-10` no container coloca o conteúdo acima do overlay.
- `text-gray-400` reduz ligeiramente o brilho do parágrafo sem perder legibilidade.

## Racional
- Tons mais escuros reduzem o brilho percebido do bloco.
- O radial de baixa opacidade cria uma vinheta suave, dando profundidade sem ruído visual.
- Tudo feito com Tailwind (arbitrary values), sem novas dependências ou assets.

## Testes rápidos
- Visualizar em temas claro/escuro e verificar contraste.
- Checar responsividade (mobile/desktop) e se o overlay não interfere em interação.

## Próximo passo
- Aplicar as alterações e validar no preview. Posso executar agora?