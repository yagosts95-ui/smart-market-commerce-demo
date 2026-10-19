# Catálogo, estoque e avisos — estado da demonstração

## Importação
A página Gestor > Produtos permite importar **prévia local** de arquivo CSV UTF-8 separado por ponto e vírgula ou vírgula, com até ~2 MB. Colunas reconhecidas: `sku` (ex.: DEMO-001), `nome`, `preco`, `estoque`, `imagem` (URL HTTPS). Corresponde aos 150 SKUs da demonstração; produtos inteiramente novos ainda dependem de importação autenticada no banco. A importação não grava no Supabase e não substitui cadastro do ERP.

Exemplo:
```csv
sku;nome;preco;estoque;imagem
DEMO-001;Banana prata;4,99;12;https://example.com/banana.jpg
DEMO-004;Refrigerante cola;8,99;0;https://example.com/cola.jpg
```
Os limites e a visibilidade são uma **prévia no mesmo navegador**. Não confiar neles para pedidos de produção ou reservas globais. CSV de ERP pode exigir mapeamento de campos, produto por código de barras e conferência antes de publicação.

## Esquema real preparado no Supabase
`products`: barcode, external_code, source_system, product_image_source, published_online, online_stock_limit, minimum_stock_alert, last_synced_at; tabelas `catalog_import_jobs` e `inventory_movements` possuem RLS para funcionários autenticados. Os 150 produtos fictícios estão com `published_online=false`.

### Antes de ativar estoque operacional
1. Obter nome/fornecedor do sistema ERP e amostra autorizada de arquivo exportado ou documentação API.
2. Mapear unidades de venda, fator de conversão (kg/un), SKU, código de barras, imagens, preço e saldos.
3. Importar com validação e aprovação, sem sobrescrever dados do gestor automaticamente.
4. Centralizar saldo disponível, reserva atômica na criação do pedido, devolução de reserva em cancelamento e baixa na conclusão. A loja não poderá aceitar pedidos sem estoque.
5. Usar autenticação administrativa e logs de alterações. **Nunca autorizar edição do estoque real por visitante sem login.**

## Notificações
O painel consulta pedidos compartilhados a cada ~4 s e solicita permissão para Notification API via botão. Pode mostrar aviso de navegador para novos pedidos detectados quando o site está aberto e a permissão concedida. **Não é Web Push**: não garante entrega com aba fechada, app suspenso ou celular bloqueado.
Para alertas confiáveis: instalar PWA, registrar Service Worker, coletar assinatura PushSubscription por usuário e dispositivo, guardar assinaturas com RLS, enviar push do backend após confirmação do pedido e manter painel de pedidos pendentes/alertas de falhas. Considere notificações alternativas ao operador se o push falhar.

## Pagamento sandbox — depois
Preparar testes com provedor selecionado; usar backend para criar intenção/cobrança sandbox e webhooks verificados para registrar status. Não confiar em valores do cliente ou mensagens de pagamento sem webhook assinado. Nunca misturar sandbox e transações reais.


## Integração universal sem ERP identificado — esquema preparado
O banco `mais-voce-staging` agora inclui:
- `catalog_import_rows`: linhas recebidas, campos padronizados, carga bruta e erros de validação antes de eventual aprovação;
- `products.reserved_quantity`: saldo reservado, separado do estoque físico;
- `online_catalog`: leitura da disponibilidade publicada, respeitando o menor entre saldo livre e limite de venda online;
- `reserve_online_stock`: lógica básica de reserva que **não está liberada para os papéis públicos**. Só será usada por um serviço de checkout autenticado e transacional quando ele existir.

Contrato proposto de importação: `sku,barcode,name,unit,price,stock_quantity,image_url,source_system,external_code`. A camada de adaptação futura mapeará campos do ERP para esse contrato, mantendo validações e revisão humana antes de publicar. Arquivos externos devem ser tratados como dados não confiáveis; nunca executar conteúdo de planilha ou confiar em valores sem validar.

Os 150 itens `DEMO-...` permanecem `published_online=false` e não representam estoque verdadeiro. A interface atual permite somente ajustes locais de demonstração. **Não há reserva de estoque global conectada ao checkout ainda.**
