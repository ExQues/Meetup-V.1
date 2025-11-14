# Otimização dos Cards da EventPage

## Objetivos
1. Remover divs decorativas dos cards
2. Simplificar layout de colunas
3. Manter design limpo e funcional

## 1. Remoção de Elementos Decorativos

### Elementos a Remover
- Bloco de fundo com gradiente e animações (`absolute inset-0 z-0 overflow-hidden`)
- Linha decorativa sob o texto (`mt-6 w-1/3 h-0.5`)
- Container vazio de espaçamento (`flex space-x-2 mt-4`)
- Cantos decorativos iluminados (`absolute top-0 left-0` e `absolute bottom-0 right-0`)

### Resultado Esperado
- Ícone renderizado diretamente
- Apenas título e descrições visíveis
- Sem animações de fundo ou elementos visuais desnecessários

## 2. Simplificação do Layout

### Mudança no Grid
- **De:** `mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch auto-rows-fr`
- **Para:** `mt-8 grid grid-cols-1 gap-8 items-stretch auto-rows-fr`

### Alternativa (2 colunas no desktop)
- Remover apenas `lg:grid-cols-3`
- Resultado: `mt-8 grid md:grid-cols-2 gap-8 items-stretch auto-rows-fr`

## 3. Verificação
- Cards empilhados verticalmente
- Mesmo espaçamento entre elementos
- Responsividade mantida
- Performance melhorada (menos elementos DOM)

## Arquivo de Referência
- `src/pages/EventPage.tsx` (linhas 17-23, 47-51, 159)