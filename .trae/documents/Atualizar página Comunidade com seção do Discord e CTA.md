## Objetivo
- Explicar claramente o servidor do Discord, eventos exclusivos que acontecem lá, canal de texto dedicado para brasileiros e incluir o link de convite.
- Manter estilo sóbrio, sem efeitos de movimento em hover (apenas fade-in discreto na entrada).

## Conteúdo
1. Cabeçalho
- Título: "Comunidade TRAE Brasil"
- Texto: ponto de encontro da comunidade, eventos exclusivos no Discord, canal pt‑BR dedicado.

2. Destaques (lista curta)
- "Eventos exclusivos no Discord"
- "Canal de texto pt‑BR para brasileiros"
- "Projetos, networking e suporte da comunidade"

3. CTA
- Botão simples: "Entrar no Discord"
- Link: https://discord.gg/rYC6VVa2V2
- Abertura em nova aba com `rel="noopener noreferrer"`

## Alterações no código
- Editar `src/pages/Comunidade.tsx`:
  - Substituir o parágrafo inicial por explicação do Discord.
  - Adicionar uma pequena lista em bullets (sem ícones exagerados) abaixo.
  - Inserir botão/`motion.a` com estilo minimalista: `bg-black border border-gray-700 text-white px-8 py-4 rounded-xl hover:border-gray-500 transition-colors` (sem `scale`, sem `shadow`, sem translação).
  - Manter o grid existente abaixo ou reduzir para dois blocos, priorizando clareza do Discord.

## Estilo e Acessibilidade
- Tipografia consistente com Tailwind atual.
- `focus-visible:outline` para acessibilidade no CTA.
- Sem animações de hover com movimento.

## Verificação
- Rodar dev e checar responsividade (sm/md/lg).
- Validar que o botão abre o convite corretamente.

## Entregável
- Página Comunidade com texto claro sobre o Discord, bullets de benefícios e CTA estável e acessível para entrar no servidor.