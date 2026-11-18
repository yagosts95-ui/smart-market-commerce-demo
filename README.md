# 🛒 smart-market-commerce-demo-online — MVP E-commerce & Gestão Operacional

Plataforma full-stack de e-commerce, delivery e gestão operacional para varejo supermercadista, cobrindo toda a jornada de ponta a ponta: da vitrine digital do cliente ao painel Kanban de separação, catálogo e inteligência comercial do gestor.

🔗 **Demo Online (Cliente):** [https://mais-voce-online-demo.paulosup-dez.workers.dev/cliente/](https://mais-voce-online-demo.paulosup-dez.workers.dev/cliente/)  
🔗 **Demo Online (Gestor):** [https://mais-voce-online-demo.paulosup-dez.workers.dev/gestor/](https://mais-voce-online-demo.paulosup-dez.workers.dev/gestor/)  
> **Credenciais de Acesso (Gestor):** Login: `gestor` | Senha: `SENHATESTE123`
---

## 🎯 Problema Operacional Resolvido
Supermercados regionais frequentemente enfrentam gargalos na digitalização das vendas: dependência de pedidos manuais via mensagens, falta de visibilidade em tempo real sobre o status de separação/entrega e dificuldade para atualizar preços e disponibilidade de estoque rapidamente sem depender de terceiros.

Este MVP foi projetado como uma operação completa e integrada para eliminar o retrabalho entre o pedido do cliente e a esteira de expedição da loja.

---

## 🔄 Fluxo Funcional de Ponta a Ponta

### 1. Experiência do Cliente (`/cliente`)
* **Vitrine & Descoberta:** Navegação responsiva por categorias (*Hortifrúti, Açougue, Bebidas, Mercearia, Laticínios, Padaria*), busca instantânea por produtos/marcas e seção de ofertas em destaque.
* **Carrinho & Checkout Inteligente:** Fluxo em duas etapas com escolha dinâmica entre **Entrega no endereço** (formulário completo com logradouro, número, complemento, bairro e referência) ou **Retirada na loja** (sem taxa).
* **Integração de Pagamento (Sandbox):** Suporte a checkout via **Pix** e **Cartão de Crédito** (ambiente PagBank Sandbox para validação segura de fluxo).
* **Acompanhamento em Tempo Real:** Linha do tempo visual de status do pedido (*Recebido → Em separação → Pronto para retirada → Concluído*) com visualização detalhada dos itens.

### 2. Central de Gestão & Operação (`/gestor`)
* **Visão Geral da Operação:** Dashboard com indicadores em tempo real (faturamento do dia, total de pedidos, pedidos aguardando aceite e concluídos), alertas de gargalos na esteira (*Aguardando aceite, Em separação, Aguardando expedição*) e disparo de **Ofertas-Relâmpago** sincronizadas com a vitrine.
* **Gestão de Pedidos (Kanban & Automação):** Esteira visual dividida em 6 estágios (*Novos pedidos → Aceitos → Em separação → Prontos → A caminho → Concluídos*), com recurso de **Impressão Automática** ao confirmar pagamento e notificações push ativas.
* **Catálogo e Disponibilidade:** Gestão centralizada de SKUs (150+ itens na demo), edição rápida de preço, controle de estoque para vitrine, ativação/ocultação de produtos e **importação em lote via CSV**.
* **Relatórios e Inteligência Comercial:** Análise de evolução de vendas (semanal, mensal e anual), ticket médio, ranking de Top 5 produtos mais vendidos, participação por categoria e exportação de dados em **CSV**.

---

## 🏗️ Arquitetura e Stack Tecnológica
* **Frontend:** HTML5, CSS3, JavaScript / Vite (`vite.config.js`) com Design System próprio documentado (`DESIGN_SYSTEM.md`).
* **Backend & Persistência:** Integração preparada com **Supabase** para banco de dados, sincronização de pedidos e catálogo (`SUPABASE_SETUP.md`).
* **Infraestrutura & Deploy:** Versionamento no **GitHub** com pipeline de deploy contínuo no **Cloudflare Workers** (`wrangler.jsonc`).
* **Desenvolvimento Assistido por IA:** Prototipação, estruturação de regras de negócio e refatoração orquestradas com fluxos de Engenharia de Prompt e LLMs.

---

## 📊 Indicadores-Alvo para Implantação Piloto
Por se tratar de um protótipo funcional (MVP) em ambiente de demonstração, os dados exibidos são ilustrativos. Em uma implantação piloto em loja real, o sistema foi estruturado para mensurar:
* **Tempo médio de separação (SLA operacional):** Redução do intervalo entre a aprovação do pagamento e o status *Pronto para retirada/entrega*.
* **Taxa de ruptura na vitrine:** Diminuição de pedidos cancelados por falta de item graças à atualização instantânea de estoque no painel do gestor.

---

## 📁 Estrutura do Repositório
```text
├── cliente/                 # Interface da vitrine digital, checkout e rastreio do cliente
├── gestor/                  # Dashboard operacional, Kanban de pedidos, catálogo e relatórios
├── src/                     # Lógica central da aplicação e integrações
├── scripts/                 # Scripts auxiliares de automação e dados
├── DESIGN_SYSTEM.md         # Padrões visuais e componentes de interface
├── SUPABASE_SETUP.md        # Guia de configuração do banco de dados e tabelas
└── wrangler.jsonc           # Configuração de deploy no Cloudflare Workers
