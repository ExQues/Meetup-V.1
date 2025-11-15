## Ajustes de Posicionamento
- Mover a navbar mais para baixo alterando `header` de `top-4` para `top-20` em `src/App.tsx:194`.
- Manter `bg-transparent` para evitar faixa de fundo em largura total.

## Espaçamento do Conteúdo
- Aumentar o padding superior da área de conteúdo de `pt-16` para `pt-32` em `src/App.tsx:224` para evitar sobreposição com a navbar fixa.

## Validação de Tooltips
- Com o header mais baixo, os tooltips do `DockLabel` (renderizados acima com `-top-6` e `y:-10`) ficam visíveis.
- Se ainda desejar, opção alternativa: renderizar os tooltips abaixo do ícone alterando `DockLabel` em `src/App.tsx:165–173` para `top-14` e animação `y:10` (aplicamos apenas se você preferir esse comportamento).

## Testes
- Abrir `http://localhost:5173/`, passar o mouse nos ícones e confirmar que os textos aparecem completamente.
- Conferir em telas menores para garantir que a navbar e os tooltips não saem da área visível.

## Resultado Esperado
- Navbar visivelmente mais baixa.
- Tooltips totalmente visíveis ao passar o mouse, sem faixa ampla no topo.