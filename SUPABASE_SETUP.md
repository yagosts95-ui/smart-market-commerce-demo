# Mais Você Online — Fase 1 Supabase
Projeto Supabase: `mais-voce-staging` (São Paulo).
**Estado:** catálogo de 150 produtos demonstrativos importado; ambiente publicado continua usando dados locais para pedidos e pagamentos.

## Configuração para integração posterior
Variáveis públicas de build no Cloudflare (somente as credenciais publicáveis):
- `VITE_SUPABASE_URL` — URL pública do projeto.
- `VITE_SUPABASE_PUBLISHABLE_KEY` — chave publishable (`sb_publishable_...`).
**Nunca usar `service_role`, secret keys, connection strings ou senhas no frontend.**

`src/supabase-staging.js` disponibiliza leitura pública de catálogo e utilitários básicos de login/verificação. O módulo ainda não foi ligado às rotas existentes: nenhuma operação real foi ativada.

## Segurança e primeira conta administrativa
- RLS está habilitado em todas as 10 tabelas do banco.
- Visitantes podem consultar apenas categorias/produtos ativos e ofertas vigentes.
- Pedidos, clientes, endereços, pagamentos e eventos exigem papel de funcionário.
- Após o proprietário escolher e confirmar seu e-mail, cadastrar a conta Supabase Auth e somente então atribuir explicitamente o papel owner em `public.staff_roles`. Nunca conceder acesso baseado apenas no e-mail enviado pelo navegador.
- Antes do lançamento real, implementar servidor autenticado que valide valores, itens, endereço, pagamento e autorização de transições; revisar LGPD e política de retenção.
- Nenhuma credencial administrativa foi criada nesta fase.

## Catálogo
SKUs `DEMO-001` a `DEMO-150`, preços e descrições ilustrativos; estoque ainda não configurado. Não utilizar esses preços comercialmente sem aprovação do supermercado.
