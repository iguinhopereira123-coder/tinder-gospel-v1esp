# Outras rotas (SPA)

O site é uma SPA; o HTML inicial retorna apenas "Kindred Faith Find" e "Loading...". As rotas abaixo existem (não retornam 404), mas o conteúdo é carregado via JavaScript. Durante o webscrap com browser, apenas **/** e **/onboarding** foram percorridas e documentadas em detalhe.

| Rota | Observação |
|------|------------|
| `/` | Landing — documentada em **01-pagina-landing.md** |
| `/onboarding` | Formulário nome/idade/gênero — documentada em **02-pagina-onboarding.md** |
| `/quiz` | Existe (SPA); conteúdo não capturado neste documento |
| `/checkout` | Existe (SPA); provável página de pagamento/oferta (copy no bundle: "47 VAGAS", "R$ 97,90") |
| `/perfil` | Existe (SPA); provável perfil ou resultado |

Para documentar **quiz**, **checkout** e **perfil** página a página, é necessário simular o fluxo completo no browser (preencher onboarding, Continuar, etc.) e capturar snapshot e requisições em cada etapa.
