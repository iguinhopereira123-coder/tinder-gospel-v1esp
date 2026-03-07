# Página /results – referência (conexao-com-proposito.vercel.app)

Análise do bundle e HTML do site de referência para replicar loading e resultados.

---

## 1. Como o app é carregado

- **HTML inicial:** O servidor devolve um `index.html` mínimo com `<div id="root"></div>`, título "Kindred Faith Find" e sem conteúdo visível além de "Loading..." (texto que vem do React até a hidratação).
- **Assets:** O conteúdo real vem do bundle JS e do CSS:
  - `/_vercel/insights/script.js` (analytics)
  - `/assets/index-DhLUa1nx.js` (app React, rotas, i18n, dados)
  - `/assets/index-BLh9eGli.css`
  - `/favicon.ico`
- **Rotas:** SPA; a rota `/results` é tratada no cliente. Não há fetch especial para “liberar” a rota: o mesmo bundle serve todas as rotas.

---

## 2. Tela de loading / análise (antes dos resultados)

No bundle, a etapa de “análise” tem os textos (PT):

| Chave | Texto |
|-------|--------|
| title | PROCURANDO O AMOR DA SUA VIDA... |
| subtitle | Encontrando as conexões PERFEITAS para você neste exato momento! |
| processing | Processando... |
| analyzingResponses | Analisando suas respostas... |
| identifyingCompatibility | Identificando compatibilidades PERFEITAS... |
| searchingProfiles | Procurando perfis em |
| calculatingAffinities | Calculando afinidades ESPIRITUAIS... |
| pleaseWait | Por favor, aguarde - estamos encontrando pessoas INCRÍVEIS para você! |

Ou seja: uma tela de loading com título, subtítulo e mensagens que podem rodar/alternar (processando, analisando, identificando, etc.).

---

## 3. Tela de resultados

- **Textos (PT):**
  - title: "ENCONTRAMOS PESSOAS INCRÍVEIS PARA VOCÊ!"
  - subtitle: "Aqui estão suas conexões PERFEITAS - escolha com sabedoria!"
  - viewProfile: "Ver perfil completo"
  - connect: "Conectar AGORA"
  - peopleWaiting: "pessoas com seus valores estão ESPERANDO por você em"
  - km: "km"

- **Dados dos perfis:** Array no bundle com objetos no formato:
  - `id`, `age`, `distance`, `imageUrl`
  - Exemplo: `{ id: "anaClara", age: 26, distance: 2, imageUrl: "https://i.pinimg.com/736x/09/17/9c/09179c747f70eab93f12ee7a0ade5375.jpg" }`

---

## 4. Imagens e caminhos que “liberam” fetch

- **Imagens:** As fotos dos perfis vêm de URLs externas (ex.: `https://i.pinimg.com/...`). São usadas em `<img src="...">`.
- **Fetch:** Não há um “caminho” ou endpoint próprio do site que “libere” o fetch para as imagens. O navegador faz GET direto nas URLs do `imageUrl` (Pinimg). Para `<img>`, não é necessário CORS no servidor de imagens; o próprio domínio (i.pinimg.com) entrega a imagem.
- **Resumo:** Não há proxy nem API própria para imagens no referência; apenas `img` com URLs públicas (Pinimg). O “loading” da página é o estado de análise no React (mensagens na tela), não um fetch de imagens bloqueante.

---

## 5. Fluxo no referência

1. Usuário completa o funil (onboarding, quiz, etc.).
2. Em algum momento navega para `/results`.
3. Deve aparecer primeiro a tela de **análise/loading** (título + mensagens como “Analisando suas respostas...”, “Calculando afinidades ESPIRITUAIS...”, etc.).
4. Depois de um tempo (ou quando o “cálculo” termina), é exibida a tela de **resultados** com os cards de perfis (foto, idade, distância, botões “Ver perfil completo” / “Conectar AGORA”).

---

## 6. Mapeamento PT → ES (para réplica)

| PT (referência) | ES (réplica) |
|-----------------|--------------|
| PROCURANDO O AMOR DA SUA VIDA... | BUSCANDO EL AMOR DE TU VIDA... |
| Encontrando as conexões PERFEITAS... | Encontrando las conexiones PERFECTAS... |
| Processando... | Procesando... |
| Analisando suas respostas... | Analizando tus respuestas... |
| Identificando compatibilidades PERFEITAS... | Identificando compatibilidades PERFECTAS... |
| Procurando perfis em | Buscando perfiles en |
| Calculando afinidades ESPIRITUAIS... | Calculando afinidades ESPIRITUALES... |
| Por favor, aguarde - estamos encontrando pessoas INCRÍVEIS para você! | Por favor, espera: estamos encontrando personas INCREÍBLES para ti. |
| ENCONTRAMOS PESSOAS INCRÍVEIS PARA VOCÊ! | ¡ENCONTRAMOS PERSONAS INCREÍBLES PARA TI! |
| Aqui estão suas conexões PERFEITAS... | Aquí están tus conexiones PERFECTAS... |
| Ver perfil completo | Ver perfil completo |
| Conectar AGORA | Conectar AHORA |
| pessoas com seus valores estão ESPERANDO por você em | personas con tus valores están ESPERANDO por ti a |
| km | km |
