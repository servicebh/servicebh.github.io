# Relatório de Auditoria Técnica

Data: 2026-07-04

## Correções e melhorias aplicadas

### Arquitetura de navegação

O site deixou de depender de uma navegação de página única por âncoras e passou a ter páginas HTML próprias:

- Home
- Sobre
- Valores
- Serviços
- PMOC
- Marcas
- Diferenciais
- Galeria
- Depoimentos
- Contato

Isso melhora indexação, clareza de conteúdo e futuras campanhas de tráfego pago ou SEO local.

### Contatos e conversão

- WhatsApp atualizado para `(31) 98276-6011`.
- Link WhatsApp atualizado para `https://wa.me/5531982766011`.
- Instagram adicionado como `@climatizacao_service`.
- E-mail atualizado para `Service.servicoseletricos@hotmail.com`.
- Formulário de orçamento reposicionado como formulário lateral na página `contato.html`.
- Botões rápidos de serviço foram adicionados para preencher o campo de interesse e enviar uma mensagem mais organizada pelo WhatsApp.

### PMOC

Foi criada a página `pmoc.html` com conteúdo específico sobre:

- Plano de Manutenção, Operação e Controle.
- Segurança e eficiência dos sistemas de climatização.
- Qualidade do ar.
- Lei nº 13.589/2018.
- Diretrizes da Anvisa, incluindo RE nº 9/2003.
- Contratos de manutenção periódica.

A página recebeu CTA direto para WhatsApp com mensagem específica sobre adequação ao PMOC.

### Depoimentos

Os depoimentos genéricos foram substituídos por avaliações reais extraídas dos prints enviados, incluindo relatos de clientes sobre higienização, instalação, atendimento técnico, acabamento e profissionalismo.

### Segurança para hospedagem

Foram mantidos e atualizados:

- `_headers` para Netlify e Cloudflare Pages.
- `vercel.json` para Vercel.
- `.htaccess` para Apache, cPanel e Hostinger.
- CSP com novo hash SHA-256 para o JSON-LD inline.
- HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy.

### Performance e dependências

- Bootstrap e Font Awesome continuam servidos localmente.
- Imagens principais continuam em WebP local.
- Logos de marcas continuam em SVG local.
- Sitemap atualizado com todas as páginas.
- Manifest atualizado.

## Pontos de atenção

- Se o cliente informar outro e-mail comercial, substituir `Service.servicoseletricos@hotmail.com` nos HTMLs e na documentação.
- Se o domínio final não for `servicebh.com.br`, atualizar canonical, Open Graph, sitemap, robots e arquivos de headers.
- Se o JSON-LD for editado, recalcular o hash SHA-256 usado no Content Security Policy.
- Após publicar, rodar Lighthouse e testar headers em uma ferramenta pública de análise de segurança.
