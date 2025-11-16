# Migrações do Supabase

Este diretório contém as migrações SQL do banco de dados Supabase.

## Estrutura

- **Migrações ativas**: Arquivos principais que definem a estrutura atual do banco
- **archive/**: Migrações antigas ou de teste que foram movidas para organização

## Arquivos Principais

1. **001_create_submissions.sql** - Criação da tabela principal de inscrições
2. **002_grant_permissions.sql** - Permissões iniciais
3. **003_create_admin_users.sql** - Criação da tabela de usuários admin
4. **004_grant_admin_permissions.sql** - Permissões para admin
5. **005_fix_permissions.sql** - Correções de permissões

## Arquivos de Correção

- **20241115_fix_permissions.sql** - Correção de permissões (15/11/2025)
- **20241115_fix_rls_policies.sql** - Correção de políticas RLS (15/11/2025)

## Arquivos Auxiliares

- **check_permissions.sql** - Script para verificar permissões atuais
- **grant_permissions.sql** - Script para conceder permissões
- **fix-supabase-permissions.sql** - Correção de permissões Supabase
- **insert-admin.sql** - Inserção de usuário admin
- **remove-all-restrictions.sql** - Remoção de todas as restrições
- **remove-restrictions-simple.sql** - Remoção simplificada de restrições

## Como aplicar migrações

```bash
# Aplicar todas as migrações pendentes
supabase db push

# Aplicar migração específica
supabase db push --file supabase/migrations/001_create_submissions.sql
```