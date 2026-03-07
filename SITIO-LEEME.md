# Sitio recreado – Kindred Faith Find (español)

Réplica del sitio original (conexao-com-proposito.vercel.app) **en español**, dentro de esta misma carpeta.

## Cómo ejecutarlo

```bash
npm install   # solo la primera vez
npm run dev   # abre http://localhost:5173
```

Para generar la versión de producción:

```bash
npm run build
npm run preview   # previsualiza la carpeta dist
```

## Contenido y flujo (igual que el sitio de referencia)

1. **Landing (/):** mensaje de atención, “X personas de tu región ya están en línea”, card con “+X personas se conectaron HOY”, botón EMPEZAR AHORA.
2. **Onboarding (/onboarding):** nombre, edad, género (Masculino/Femenino). Si se detecta ciudad por IP se muestra “Ciudad detectada: X”. Continuar → **Intereses**.
3. **Intereses (/intereses):** quiz con chips seleccionables (Fe y espiritualidad, Familia, Música, etc.). Al menos un interés. Continuar → **Checkout**.
4. **Checkout (/checkout):** oferta, garantías, escasez (47 plazas, 97,90 €), Aceptar oferta → **Perfil**.
5. **Perfil (/perfil):** página de perfil/resumen.

Las rutas **/quiz** y **/ciudad** redirigen a **/intereses**.

## Geolocalización

- **País/región (landing):** `https://api.country.is/` (país por IP). Número de “personas de tu región” según país.
- **Ciudad (solo informativa en onboarding):** `https://ipwho.is/` (ciudad por IP). Si se obtiene, se muestra “Ciudad detectada: X” en el onboarding; no hay pantalla propia de ciudad.

## Tecnologías

- React 18 + Vite 5
- React Router 6
- Sin backend; todo el flujo es client-side.
