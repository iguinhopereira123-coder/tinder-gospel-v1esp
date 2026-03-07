# Página 1: Landing (Kindred Faith Find)

**URL:** https://conexao-com-proposito.vercel.app/  
**Título:** Kindred Faith Find

---

## 1. Conteúdo visual (acessibilidade)

- **Botão:** "🇧🇷 Português" (selector de idioma, collapsed)
- **Botão:** "COMEÇAR AGORA" (CTA principal)
- **Heading (h1):** "ATENÇÃO: Deus tem alguém ESPECIAL esperando por você AGORA!"
- **Texto:** "Clique em \"COMEÇAR AGORA\" e descubra quem está procurando por você neste exato momento. **424 pessoas da sua região já estão online!**"

---

## 2. Onde a localização é aplicada no texto

| Trecho | Uso da localização |
|--------|---------------------|
| **"424 pessoas da sua região já estão online!"** | O número "424" e o termo **"sua região"** são dinâmicos/contextuais. A região é inferida por **geolocalização (IP)**. O texto sugere que há pessoas "da sua região" para aumentar urgência e relevância. |

Não há coordenadas GPS nem endereço explícito na landing; apenas noção de "região" (provavelmente país ou região ampla via API de IP).

---

## 3. Requisições de rede (ordem cronológica)

| # | URL | Método | Tipo | Status | Observação |
|---|-----|--------|------|--------|------------|
| 1 | `https://conexao-com-proposito.vercel.app/` | GET | mainFrame | 200 | HTML principal |
| 2 | `.../assets/index-DhLUa1nx.js` | GET | script | 304 | Bundle JS (React/app) |
| 3 | `.../assets/index-BLh9eGli.css` | GET | stylesheet | 304 | Estilos |
| 4 | `.../_vercel/speed-insights/vitals` | POST | xhr | 200 | Vercel Speed Insights (métricas) |
| 5 | `.../_vercel/speed-insights/vitals` | POST | xhr | 200 | (duplicado) |
| 6 | `.../_vercel/insights/view` | POST | xhr | 200 | Vercel Analytics (view) |
| 7–11 | **`https://api.country.is/`** | GET | xhr | 200 | **Geolocalização por IP** (várias chamadas) |

---

## 4. Como a geolocalização é obtida

- **API usada:** `https://api.country.is/`
- **Método:** GET (sem body).
- **Função:** Retorna país (e possivelmente IP) com base no IP do visitante (sem permissão de geolocalização do browser).
- **Uso no app (console):**
  - Hook `useI18n`: "sempre detectar por IP primeiro"
  - "FORÇANDO detecção por IP (ignorando localStorage)"
  - "Tentando API: https://api.country.is/"
- **Efeito:** Usado para **idioma (i18n)** e, no texto da landing, para noção de **"sua região"** (e possivelmente o número "424" ou cópia condicional).

---

## 5. Mensagens de console relevantes

- `[useI18n] Inicializando hook i18n (sempre detectar por IP primeiro)...`
- `[i18n] Iniciando detecção de idioma com hierarquia (IP SEMPRE primeiro)...`
- `[i18n] FORÇANDO detecção por IP (ignorando localStorage)...`
- `[i18n] Tentando API: https://api.country.is/`
- Aviso: CSP `frame-ancestors` em `<meta>` é ignorado.

---

## 6. Elementos interativos

| Ref | Role | Nome | Ação |
|-----|------|------|------|
| e0 | button | 🇧🇷 Português | Abre seletor de idioma |
| e1 | button | COMEÇAR AGORA | Avançar no fluxo (próxima etapa) |

---

## 7. Estado inicial

- Exibe "Carregando..." até a detecção de idioma/IP (e possivelmente dados de "região") concluir.
- Depois exibe o heading, o texto com "424 pessoas da sua região" e os botões.
