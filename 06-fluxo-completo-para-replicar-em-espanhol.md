# Fluxo completo – conexao-com-proposito.vercel.app (para replicar em espanhol)

Lista estruturada de **todas as etapas** do fluxo, na ordem, com URL, passo, títulos, subtítulos, opções/campos e botões.  
Fonte: captura no browser (landing + onboarding documentados), bundle/copy (04) e estrutura das rotas (App + páginas).

---

## Resumo do fluxo (ordem das URLs)

| # | Path        | Nome etapa  | Ação principal                    |
|---|-------------|-------------|------------------------------------|
| 1 | `/`         | Landing     | CTA "EMPEZAR AHORA"               |
| 2 | `/onboarding` | Onboarding | Nome, idade, gênero → Continuar   |
| 3 | `/intereses`  | Intereses  | Escolher interesses (9 chips) → Continuar   |
| 4 | `/proposito`  | Propósito  | Quiz: relación con propósito → Continuar |
| 5 | `/fe`         | Quiz Fe    | Frequência atividades de fe → Continuar |
| 6 | `/valores`    | Quiz Valores | O que valoras numa relação → Continuar |
| 7 | `/checkout`   | Oferta     | Copy oferta/garantia → "Aceptar oferta" |
| 8 | `/perfil`     | Perfil     | Página final (perfil/resultados)  |

---

## STEP 1 – Landing

- **URL:** `https://conexao-com-proposito.vercel.app/`
- **Path:** `/`
- **Step indicator:** nenhum (antes do funnel).
- **Title/heading:**  
  `ATENÇÃO: Deus tem alguém ESPECIAL esperando por você AGORA!`
- **Subtitle / instruction:**  
  `Clique em "COMEÇAR AGORA" e descubra quem está procurando por você neste exato momento. 424 pessoas da sua região já estão online!`
- **Answer options / form fields:** nenhum.
- **Buttons:**
  - `🇧🇷 Português` (seletor de idioma, collapsed).
  - `COMEÇAR AGORA` (CTA principal – leva a `/onboarding`).
- **Notas:**  
  Número "424" e "sua região" podem ser dinâmicos (geolocalização por IP).  
  Estado inicial: "Carregando..." até detecção de idioma/IP.

---

## STEP 2 – Onboarding (nome, idade, gênero)

- **URL:** `https://conexao-com-proposito.vercel.app/onboarding`
- **Path:** `/onboarding`
- **Step indicator:** **Passo 1 de 5** (5 bolinhas de progresso; 1ª preenchida).
- **Title/heading:**  
  `Vamos encontrar o amor da sua vida!`
- **Subtitle / instruction:**  
  `Conte-nos sobre você - apenas 2 minutos para mudar sua vida para sempre!`
- **Form fields:**
  - **Seu nome** – textbox, placeholder: `Digite seu nome`.
  - **Sua idade** – spinbutton (number), placeholder: `Digite sua idade` (min 18, max 120).
  - **Gênero** – dois botões: `Masculino`, `Feminino` (escolha única).
- **Optional text:**  
  Se cidade for detectada por IP: `Ciudad detectada: [nome da cidade]` (ou equivalente em PT).
- **Button:**  
  `Continuar` (disabled até nome, idade e gênero preenchidos).
- **Notas:**  
  Ao submeter, navega para `/intereses`.

---

## STEP 3 – Intereses (interesses)

- **URL:** `https://conexao-com-proposito.vercel.app/intereses`
- **Path:** `/intereses`
- **Step indicator:** **Passo 2 de 5** (2 de 5 bolinhas ativas).
- **Title/heading:**  
  `Quais são os seus interesses?`  
  *(No código em espanhol: "¿Cuáles son tus intereses?" – para PT use o título acima.)*
- **Subtitle / instruction:**  
  `Selecione o que você gosta de fazer`  
  *(ES: "Selecciona lo que te gusta hacer".)*
- **Answer options (quiz/chips – multiseleção):**

  | id       | label      | icon |
  |----------|------------|------|
  | cafe     | Café       | ☕   |
  | te       | Té         | 🍵   |
  | comida   | Comida     | 🍴   |
  | musica   | Música     | 🎵   |
  | lectura  | Lectura    | 📖   |
  | fotografia | Fotografía | 📷   |
  | juegos   | Juegos     | 🎮   |
  | ejercicio | Ejercicio  | 💪   |
  | viajes   | Viajes     | ✈️   |

  *(Labels acima em espanhol do código; para PT: Café, Chá, Comida, Música, Leitura, Fotografia, Jogos, Exercício, Viagens.)*
- **Extra UI:**  
  Texto: `Seleccionados: [N]` (ou "Selecionados" em PT).
- **Button:**  
  `Continuar` (disabled se nenhum interesse selecionado).
- **Notas:**  
  Ao submeter, navega para `/proposito`.

---

## STEP 4 – Propósito (quiz relacionamento)

- **URL:** `https://conexao-com-proposito.vercel.app/proposito`
- **Path:** `/proposito`
- **Step indicator:** **Passo 3 de 5** (3 de 5 bolinhas ativas).
- **Title/heading:**  
  `Você está buscando uma relação com propósito?`  
  *(ES: "¿Estás buscando una relación con propósito?")*
- **Subtitle / instruction:** nenhum.
- **Answer options (quiz – seleção única):**

  | id         | label                                                                 |
  |------------|-----------------------------------------------------------------------|
  | especial   | Sim, acredito que Deus tem alguém especial para mim                  |
  | compartir-fe | Quero conhecer pessoas que compartilhem minha fé                    |
  | abierto    | Estou aberto às possibilidades que Deus preparar                      |
  | valores    | Prefiro relações baseadas em valores cristãos                         |

  *(Equivalente ES no código: "Sí, creo que Dios tiene alguien especial...", "Quiero conocer personas que compartan mi fe", etc.)*
- **Button:**  
  `Continuar` (disabled até uma opção selecionada).
- **Notas:**  
  Ao submeter, navega para `/fe`.

---

## STEP 5 – Quiz Fe (frequência de fé)

- **Path:** `/fe`
- **Step indicator:** **Passo 4 de 5**
- **Title:**  
  `¿Con qué frecuencia participas en actividades de tu fe?`
- **Opções (seleção única):** Cada semana | Una vez al mes | En ocasiones especiales | No asisto con regularidad
- **Button:** Continuar → navega para `/valores`.

---

## STEP 6 – Quiz Valores

- **Path:** `/valores`
- **Step indicator:** **Passo 5 de 5**
- **Title:**  
  `¿Qué es lo más importante para ti en una relación?`
- **Opções (seleção única):** Fe compartida | Familia | Honestidad | Crecimiento espiritual
- **Button:** Continuar → navega para `/checkout`.

---

## STEP 7 – Checkout / Oferta

- **URL:** `https://conexao-com-proposito.vercel.app/checkout`
- **Path:** `/checkout`
- **Step indicator:** nenhum (página de oferta).
- **Title/heading:**  
  `Oferta especial para você`  
  *(No código ES: "Oferta especial para ti".)*
- **Subtitle / instruction:**  
  `Sem riscos para você. ZERO RISCO – 100% GARANTIDO!`  
  *(Bundle/copy PT; ES: "Sin riesgo para ti. CERO RIESGO – 100 % GARANTIZADO.")*
- **Bloco “Promessas”:**  
  Título: `Promessas que vão mudar sua vida` (ES: "Promesas que van a cambiar tu vida").  
  Texto: `Garantimos resultados incríveis ou devolvemos o seu dinheiro.` (ES: "Garantizamos resultados increíbles o te devolvemos el dinero.")
- **Lista de promessas (bullet list):**
  - Encontre o amor da sua vida em 30 dias ou receba 3x o valor de volta.
  - 100% de probabilidade de casamento em 1 ano ou acesso vitalício gratuito.
  - Conexões instantâneas com pessoas perfeitas para você.
  - Um algoritmo divino que encontra sua alma gêmea em 24 h.
  - Transformação completa da sua vida amorosa em 7 dias.
- **Bloco escassez:**  
  Título/ênfase: `Escassez extrema – Última oportunidade`  
  Texto: Esta oferta não se repetirá. Só restam 24 horas. Apenas 47 vagas disponíveis. O preço volta a R$ 97,90 em 24 h.  
  *(Bundle PT; no código ES: "Solo quedan 24 horas", "Solo 47 plazas disponibles", "97,90 €".)*
- **Form fields:** nenhum.
- **Buttons / links:**
  - `← Volver` (volta para `/valores`).
  - `Aceptar oferta` – link para `/perfil`.
- **Notas:**  
  Página de oferta/checkout; não há step "4 de 5" ou "5 de 5" visível nesta página no código atual.

---

## STEP 8 – Perfil (fim do fluxo)

- **URL:** `https://conexao-com-proposito.vercel.app/perfil`
- **Path:** `/perfil`
- **Step indicator:** nenhum.
- **Title/heading:**  
  `Seu perfil` (ES: "Tu perfil").
- **Subtitle / instruction:**  
  `Aqui você poderá ver seu perfil e as pessoas que combinam com você segundo sua fé e suas respostas.`  
  *(ES: "Aquí podrás ver tu perfil y las personas que coinciden contigo según tu fe y tus respuestas.")*
- **Form fields / options:** nenhum.
- **Buttons / links:**
  - `← Volver` (volta para `/checkout`).
  - `Volver al inicio` (volta para `/`).
- **Notas:**  
  Página final do fluxo após "Aceptar oferta".

---

## Mapeamento rápido para espanhol (copy)

| PT (site ao vivo / bundle)     | ES (sugestão para réplica)        |
|-------------------------------|------------------------------------|
| COMEÇAR AGORA                 | EMPEZAR AHORA                      |
| Carregando...                 | Cargando...                        |
| Vamos encontrar o amor da sua vida! | ¡Vamos a encontrar el amor de tu vida! |
| Conte-nos sobre você...       | Cuéntanos sobre ti...              |
| Seu nome / Sua idade / Gênero | Tu nombre / Tu edad / Género       |
| Masculino / Feminino          | Masculino / Femenino               |
| Continuar                     | Continuar                          |
| Quais são os seus interesses? | ¿Cuáles son tus intereses?         |
| Você está buscando uma relação com propósito? | ¿Estás buscando una relación con propósito? |
| Oferta especial para você     | Oferta especial para ti            |
| ZERO RISCO – 100% GARANTIDO!   | CERO RIESGO – 100 % GARANTIZADO.   |
| Aceptar oferta / Aceitar oferta | Aceptar oferta                     |
| Volver / Volver al inicio     | Volver / Volver al inicio           |

---

## Rotas que redirecionam

- `/quiz` → redirect para `/intereses`
- `/ciudad` → redirect para `/intereses`

Isso conclui o fluxo completo para replicar em espanhol (ou manter em português) com as mesmas etapas e textos.
