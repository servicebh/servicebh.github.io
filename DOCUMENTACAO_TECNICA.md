# Documentação Técnica - Service Climatização

## Visão geral

Site institucional estático desenvolvido em HTML5, CSS3 e JavaScript, com Bootstrap 5 e Font Awesome servidos localmente. O projeto está preparado para hospedagem em Netlify, Cloudflare Pages, Vercel, Hostinger/cPanel ou Apache tradicional.

A navegação foi separada em páginas HTML próprias para melhorar SEO, leitura por assunto e campanhas futuras:

- `index.html`: Home
- `sobre.html`: Sobre
- `valores.html`: Visão e valores
- `servicos.html`: Serviços
- `pmoc.html`: PMOC e conformidade
- `marcas.html`: Marcas atendidas
- `diferenciais.html`: Diferenciais
- `galeria.html`: Galeria
- `depoimentos.html`: Depoimentos
- `contato.html`: Contato e formulário lateral para WhatsApp

## Estrutura

```text
/
├── index.html
├── sobre.html
├── valores.html
├── servicos.html
├── pmoc.html
├── marcas.html
├── diferenciais.html
├── galeria.html
├── depoimentos.html
├── contato.html
├── robots.txt
├── sitemap.xml
├── _headers
├── .htaccess
├── vercel.json
├── .well-known/security.txt
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── images/
    │   ├── brands/
    │   ├── site/
    │   └── service-logo*.png
    └── vendor/
        ├── bootstrap/
        └── fontawesome/
```

## Contatos configurados

- E-mail: `contato@servicebh.com.br`
- WhatsApp/telefone: `(31) 98276-6011`
- Link WhatsApp: `https://wa.me/5531982766011`
- Instagram: `@climatizacao_service`
- Link Instagram: `https://www.instagram.com/climatizacao_service/`
- Mensagem padrão: `Olá, gostaria de fazer um orçamento.`

Para alterar contatos, procure por `5531982766011`, `(31) 98276-6011`, `contato@servicebh.com.br` e `climatizacao_service` nos arquivos HTML e em `assets/js/main.js`.

## Hospedagem

### Netlify ou Cloudflare Pages

Publicar a pasta inteira. O arquivo `_headers` aplica headers de segurança e cache.

### Vercel

Publicar a pasta inteira. O arquivo `vercel.json` aplica os headers equivalentes.

### Apache, cPanel ou Hostinger

Enviar todos os arquivos da pasta para `public_html`. O arquivo `.htaccess` aplica headers, cache e bloqueio de listagem de diretórios quando o servidor permitir `mod_headers`.

## Segurança aplicada

- Content Security Policy restritiva, permitindo recursos do próprio domínio.
- Hash SHA-256 específico para o JSON-LD inline de SEO.
- `X-Frame-Options: DENY` e `frame-ancestors 'none'` para mitigar clickjacking.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` bloqueando câmera, microfone, geolocalização, pagamento e USB.
- `Strict-Transport-Security` para HTTPS.
- `Cross-Origin-Opener-Policy: same-origin-allow-popups`.
- `Cross-Origin-Resource-Policy: same-origin`.
- Formulário com honeypot anti-spam, limites de tamanho nos campos e envio organizado para WhatsApp.
- Links externos com `rel="noopener noreferrer"`.
- Dependências críticas servidas localmente.

Se o JSON-LD dentro dos HTMLs for alterado, o hash de `script-src` nos arquivos `_headers`, `.htaccess` e `vercel.json` precisa ser recalculado.

## Performance

- Bootstrap e Font Awesome internalizados em `assets/vendor`.
- Imagens de layout convertidas para WebP em `assets/images/site`.
- Logos das marcas em SVG local em `assets/images/brands`.
- Assets estáticos com cache longo via headers.
- HTML, sitemap e robots com cache curto para facilitar atualizações.

## SEO

- Meta title e description por página.
- Open Graph e Twitter Card configurados.
- JSON-LD com tipo `HVACBusiness`.
- `robots.txt` aponta para o sitemap.
- `sitemap.xml` contém todas as páginas principais.
- `pmoc.html` criada com conteúdo específico sobre PMOC, Lei nº 13.589/2018 e Anvisa RE nº 9/2003.

## Checklist antes de publicar

1. Confirmar se o domínio final será mesmo `servicebh.com.br`.
2. Confirmar telefone, WhatsApp, Instagram e e-mail.
3. Testar o botão flutuante do WhatsApp.
4. Testar o formulário lateral em `contato.html` no desktop e mobile.
5. Confirmar se a hospedagem aplica `_headers`, `vercel.json` ou `.htaccess`.
6. Ativar HTTPS no domínio antes de divulgar.
7. Rodar uma auditoria Lighthouse após publicação.

## Validação local

Com Python instalado:

```bash
python -m http.server 4173 --directory .
```

Abrir:

```text
http://127.0.0.1:4173/
```

Verificações recomendadas:

- Abrir o console do navegador e confirmar que não há erros.
- Navegar por todas as páginas HTML.
- Clicar nos filtros da galeria.
- Abrir o lightbox das imagens.
- Enviar um teste do formulário para WhatsApp.
- Testar em tela mobile.
