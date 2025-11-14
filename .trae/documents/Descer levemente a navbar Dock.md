## Objetivo
- Posicionar a `div` da navbar um pouco mais abaixo, sem alterar o comportamento ao hover.

## Ajuste
- Adicionar `mt-2` ao wrapper da `div` que envolve o Dock em `src/App.tsx`, linha com `className="flex justify-center px-6"`.
- Mantém altura fixa do Dock (`panelHeight=48`) e não reintroduz layout shift.

## Validação
- Verificar visual no `localhost:5173` se a navbar está levemente mais baixa e sem pulo.

## Arquivo
- `c:\Users\User\Desktop\PROJETOS\Meetup - Copia\src\App.tsx`