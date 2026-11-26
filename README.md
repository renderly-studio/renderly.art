# renderly.art

Web de Renderly Studio (Astro, estática). Se publica sola en GitHub Pages cada vez que se sube algo a la rama `main` (workflow `.github/workflows/deploy.yml`). Las demás ramas no se publican.

## Estructura

- `src/pages/` — una página por archivo: portada (`index.astro`), `/services`, `/lab/riverbed-rock-material`, `/legal`, `/privacy`, `/cookies`, `/licence`.
- `src/layouts/Base.astro` — cabecera, menú, pie de página y metadatos comunes.
- `src/styles/global.css` — todos los estilos.
- `public/js/site.js` — partículas del formulario, carruseles, menú móvil, formularios.
- `public/img/` — imágenes y animaciones. Para cambiar una, sustituye el archivo manteniendo el mismo nombre.
- `public/brand/` y `public/favicon.ico` — logo y favicons. `public/og/` — imagen para compartir en redes.

## Pendiente antes de publicar

- `public/img/about.jpg`: foto real de About (vertical 4:5, mismo nombre).
- `/legal` y `/privacy`: NIF real y dirección fiscal (buscar `class="todo"` en `src/pages/legal.astro` y `src/pages/privacy.astro`).
- Formularios: hoy abren el correo (mailto). Cuando haya cuenta de Formspree/Web3Forms y MailerLite, se conectan en `public/js/site.js`.
- Cloudflare Web Analytics: pegar el token en `src/layouts/Base.astro`.

## En local (opcional)

```
npm install
npm run dev
```
