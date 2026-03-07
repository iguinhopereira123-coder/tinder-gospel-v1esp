# Página 2: Onboarding

**URL:** https://conexao-com-proposito.vercel.app/onboarding  
**Título:** Kindred Faith Find

---

## 1. Conteúdo visual (acessibilidade)

- **Botão:** "🇧🇷 Português" (selector de idioma, collapsed)
- **Heading (h2):** "Vamos encontrar o amor da sua vida!"
- **Subtítulo:** "Conte-nos sobre você - apenas 2 minutos para mudar sua vida para sempre!"
- **Labels:** "Seu nome", "Sua idade", "Gênero"
- **Campo:** textbox "Digite seu nome" (placeholder: Digite seu nome)
- **Campo:** spinbutton "Digite sua idade" (placeholder: Digite sua idade)
- **Botões de gênero:** "Masculino", "Feminino"
- **Botão:** "Continuar" (inicialmente **disabled**)

---

## 2. Onde a localização é aplicada no texto

Nesta página **não há** trechos que mencionem "região", "sua cidade" ou geolocalização no texto visível. A rota `/onboarding` pode reutilizar o resultado da API `api.country.is` (idioma/country) já carregado na landing; nas requisições após navegação aparecem apenas novas chamadas a `api.country.is/` (SPA re-executando detecção).

---

## 3. Requisições de rede (após navegação para /onboarding)

| # | URL | Método | Tipo | Status |
|---|-----|--------|------|--------|
| 1–3 | `https://api.country.is/` | GET | xhr | 200 |

Não há POST para backend próprio nesta etapa; a navegação é client-side (React Router).

---

## 4. Elementos interativos

| Ref | Role | Nome | Observação |
|-----|------|------|------------|
| e4 | button | 🇧🇷 Português | Seletor de idioma |
| e5 | textbox | Digite seu nome | Nome do usuário |
| e6 | spinbutton | Digite sua idade | Idade (numérico) |
| e7 | button | Masculino | Escolha de gênero |
| e8 | button | Feminino | Escolha de gênero |
| e9 | button | Continuar | Disabled até preencher nome, idade e gênero |

---

## 5. Fluxo do usuário

1. Preencher **nome** (textbox).
2. Preencher **idade** (spinbutton).
3. Escolher **Masculino** ou **Feminino**.
4. Botão **Continuar** é habilitado e leva à próxima etapa.
