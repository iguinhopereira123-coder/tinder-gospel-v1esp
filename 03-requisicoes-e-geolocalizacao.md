# Requisições de rede e geolocalização

Documentação consolidada de todas as requisições observadas e do uso de geolocalização no site **Kindred Faith Find** (conexao-com-proposito.vercel.app).

---

## 1. API de geolocalização

### 1.1 Serviço usado

| Item | Valor |
|------|--------|
| **URL** | `https://api.country.is/` |
| **Método** | GET |
| **Autenticação** | Nenhuma |
| **Body** | Nenhum |

### 1.2 Resposta (exemplo)

```json
{"ip":"185.181.120.135","country":"DE"}
```

- **ip:** IP do visitante (público).
- **country:** Código ISO do país (ex.: DE, BR, US).

### 1.3 Onde é chamada

- No **carregamento inicial** da aplicação (landing e ao navegar para outras rotas no SPA).
- Várias requisições em sequência (ex.: 5+ na landing), possivelmente por múltiplos componentes/hooks que dependem do país.
- **Console (i18n):** o hook `useI18n` força detecção por IP primeiro e chama essa API; ignora `localStorage` na primeira detecção.

### 1.4 Uso no produto

1. **Idioma (i18n):** definir idioma padrão com base no país (ex.: BR → Português).
2. **Texto na landing:** a frase **"424 pessoas da sua região já estão online!"** usa a noção de “sua região” (baseada no país/região inferida por IP). O número “424” pode ser fixo ou variar por região/idioma.

---

## 2. Outras requisições (por tipo)

### 2.1 Documento e assets

| URL | Método | Tipo | Observação |
|-----|--------|------|------------|
| `https://conexao-com-proposito.vercel.app/` | GET | mainFrame | HTML principal (SPA) |
| `.../assets/index-*.js` | GET | script | Bundle React (rotas, i18n, UI) |
| `.../assets/index-*.css` | GET | stylesheet | Estilos globais |

### 2.2 Analytics / Vercel

| URL | Método | Tipo | Observação |
|-----|--------|------|------------|
| `.../_vercel/speed-insights/vitals` | POST | xhr | Métricas de performance (Core Web Vitals) |
| `.../_vercel/insights/view` | POST | xhr | Registro de view (analytics) |

### 2.3 Backend próprio

Durante o fluxo **Landing → Onboarding** (até “Continuar”) **não** foi observada nenhuma requisição para um backend próprio (ex.: API de cadastro). A navegação é client-side (React Router).

---

## 3. Onde a localização aparece no texto

| Página | Trecho | Uso da localização |
|--------|--------|---------------------|
| **Landing** | "424 pessoas **da sua região** já estão online!" | “Sua região” derivada do país (e possivelmente lógica interna) via `api.country.is`. Reforça urgência e relevância local. |

Nenhum outro trecho visível nas páginas documentadas (Landing e Onboarding) menciona cidade, coordenadas ou endereço. Não é usada a API de geolocalização do browser (navigator.geolocation).

---

## 4. Resumo técnico

- **Geolocalização:** apenas por **IP** via `https://api.country.is/` (país).
- **Idioma:** definido com “IP sempre primeiro” (console: `[i18n] FORÇANDO detecção por IP`).
- **Texto dinâmico:** “sua região” (e possivelmente “424”) ligados à detecção de país/região.
- **Navegação:** SPA (React Router); rotas conhecidas: `/`, `/onboarding`.
