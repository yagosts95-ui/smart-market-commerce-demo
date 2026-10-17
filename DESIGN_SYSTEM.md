# Mais Você Online — Design System v0.1

> Protótipo comercial da BTECH. Não representa um sistema de compras ativo.

## Princípios
- Preservar o reconhecimento da identidade do Supermercado Mais Você.
- Experiências responsivas específicas, **não apenas a mesma tela reduzida**.
- Elementos reutilizáveis e tokens centrais; evitar cores e fontes arbitrárias.
- Priorizar legibilidade de preços, promoções e ações.
- Separar a navegação do cliente da operação do gestor.

## Cores
| Token | HEX | Uso |
|---|---|---|
| Verde principal | `#008F4D` | Ações primárias, marca, destaques |
| Verde profundo | `#005839` | Faixas, gradientes, painel institucional |
| Verde de apoio | `#A6D96A` | Destaques decorativos |
| Vermelho oferta | `#E53935` | Promoções, badges e campanhas |
| Fundo | `#F5F7F8` | Base das páginas |
| Branco | `#FFFFFF` | Superfícies e cards |
| Texto | `#17252B` | Texto padrão |

**Semântica:** vermelho comercial não deve ser reutilizado indiscriminadamente para erros; tokens de estado devem ser definidos separadamente quando houver validação.

## Tipografia
- **Montserrat 700–900:** títulos, marca, campanhas.
- **Inter 400–800:** componentes, preços, botões, tabelas e textos.
- Corpo: 12–14px nos cards, 14–16px em conteúdo amplo; evitar texto inferior a 12px para informações essenciais.
- Tipografia deve ter contraste e tamanho revisados em dispositivos reais.

## Componentes base implementados
- Cabeçalho desktop e mobile, busca, navegação por categorias.
- Logo tipográfica provisória e aviso de demonstração.
- Hero promocional, benefícios, categorias, product cards.
- Filtros, carrinho local e resumo de compra.
- Acompanhamento ilustrativo de pedido.
- Painel gestor com indicadores e tabela demonstrativa.
- Modal de detalhes.

## Breakpoints
- Desktop grande: acima de 1100px.
- Tablet / notebook: 761px a 1100px.
- Mobile: até 760px.
- Mobile estreito: até 390px.

## Rotas
- `/` — experiência cliente com navegação interna demonstrativa.
- `/gestor` — visão do gestor, **não protegida** e sem dados reais.

## Limites do protótipo
- Preços, produtos, clientes e pedidos são fictícios.
- O carrinho é mantido somente no estado do navegador.
- A simulação de compra não envia pedido ao painel gestor.
- Não há backend, autenticação, banco de dados, integração de pagamento, WhatsApp ou impressão operacional.
- Ícones/ilustrações dos produtos são emojis temporários. A identidade textual da marca **não substitui a arte original vetorial aprovada**.
- O endereço e áreas de entrega precisarão ser validados com o supermercado.

## Próxima fase (após revisão visual)
1. Substituir a marca provisória por logo oficial licenciado/autorizado.
2. Inserir fotos reais de produtos com autorização e estabelecer padrões de imagem.
3. Validar responsividade, contraste, fluxo de navegação, build e compatibilidade.
4. Definir protótipo de checkout e arquitetura de autenticação de clientes e gestores.
5. Somente após aprovação, discutir integração Supabase e operação real.

## Executar
```sh
npm install
npm run dev
npm run build
```
Deploy estático: publicar a pasta `dist`. Configurar fallback de SPA para `/gestor` antes de usar link direto em produção.
