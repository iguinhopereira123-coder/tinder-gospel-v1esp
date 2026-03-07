# Documentação: Kindred Faith Find (conexao-com-proposito.vercel.app)

Webscrap e documentação do site **Kindred Faith Find** (https://conexao-com-proposito.vercel.app/), simulando um usuário comum. Tudo documentado página por página, incluindo requisições, geolocalização e onde a localização é aplicada no texto.

---

## Sitio recreado en español

En esta misma carpeta está **recreado todo el sitio en español** (React + Vite). Para ejecutarlo: `npm install` y `npm run dev`. Ver **SITIO-LEEME.md** para detalles.

---

## Índice dos documentos

| Arquivo | Conteúdo |
|---------|----------|
| **01-pagina-landing.md** | Página inicial: conteúdo, requisições, geolocalização (api.country.is), onde “sua região” aparece no texto |
| **02-pagina-onboarding.md** | Página /onboarding: formulário (nome, idade, gênero), botão Continuar, requisições observadas |
| **03-requisicoes-e-geolocalizacao.md** | Resumo de todas as requisições (GET/POST), API de geolocalização (api.country.is), uso no produto |
| **04-textos-dinamicos-e-copy.md** | Textos dinâmicos e copy do bundle (landing, onboarding, oferta/escassez) |
| **05-outras-rotas.md** | Outras rotas SPA (/quiz, /checkout, /perfil) — existem mas não foram percorridas |
| **README.md** | Este índice |

---

## Resumo rápido

- **Site:** SPA em React (Vercel). Rotas vistas: `/`, `/onboarding`.
- **Geolocalização:** apenas **IP** via `https://api.country.is/` (retorna `ip` e `country`). Usada para i18n e para o texto “sua região” na landing (“424 pessoas da sua região já estão online!”).
- **Requisições:** documento principal, JS, CSS, Vercel (speed-insights, insights/view), api.country.is (várias chamadas). Nenhum backend próprio no fluxo até o botão “Continuar” do onboarding.
- **Localização no texto:** na landing, somente no trecho **“da sua região”** (e possivelmente no número “424”), derivado da detecção por país/região.

---

## Como foi feita a documentação

1. Navegação no browser (MCP cursor-ide-browser) até a URL do site.
2. Captura de snapshots de acessibilidade (conteúdo e elementos interativos).
3. Captura de requisições de rede (browser_network_requests) e mensagens de console.
4. Clique em “COMEÇAR AGORA” e navegação para /onboarding; nova captura de snapshot e requisições.
5. Consulta à API api.country.is (fetch) para documentar resposta.
6. Busca no bundle JS por textos e referências a país/região.

Data da documentação: março de 2025.
