## Objetivo
- Ajustar a navbar para navegar entre páginas via rotas, não apenas scroll na mesma página.

## Mudanças
1. Atualizar itens da navbar para usar `Link`:
   - Início → `"/"`
   - Formulário → `"/formulário"` (já implementado)
   - Comunidade → `"/comunidade"`
2. Criar página `Comunidade` e registrar rota `"/comunidade"` em `App.tsx`.

## Validação
- Testar navegação pela navbar em `localhost:5173` para `/`, `/formulário` e `/comunidade`.

## Arquivos
- `src/App.tsx`
- `src/pages/Comunidade.tsx`