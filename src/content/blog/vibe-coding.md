---
title: "Cómo construí mi portfolio con Astro y vibe coding controlado en 2 días"
date: "2026-03-17"
description: "Un relato honesto de cómo combiné AI-assisted development con criterio propio para levantar un portfolio moderno, rápido y mantenible sin perder el control del código."
slug: "vibe-coding"
---

# Cómo construí mi portfolio con Astro y vibe coding controlado en 2 días

Hace unos días me propuse un reto: armar un portfolio profesional completo, con animaciones, modo oscuro, blog y secciones de proyectos, en el menor tiempo posible, sin sacrificar calidad de código. El resultado: **dos días, cero frameworks de JS en el cliente, y un sitio que carga en milisegundos**.

Acá te cuento exactamente qué construí, cómo lo hice, y por qué el "vibe coding controlado" fue clave para lograrlo.

---

## El stack elegido (y por qué)

Antes de arrancar, fui deliberado con las decisiones técnicas:

| Layer | Tecnología | Razón |
|-------|-----------|-------|
| Framework | **Astro 6** | Zero-JS por default, excelente para sitios de contenido |
| Estilos | **Tailwind CSS v4** | Utility-first, sin custom CSS salvo animaciones |
| Tipado | **TypeScript strict** | Errores en compile-time, no en producción |
| Contenido | **Content Collections** | Blog con Markdown nativo, sin base de datos |
| Fuentes | Inter + JetBrains Mono | Legibilidad y estética dev-first |

La elección de Astro fue intencional: si no necesito interactividad del lado del cliente, **no envío JS al cliente**. El portfolio es mayormente estático. Resultado: Lighthouse cerca del 100.

---

## Lo que se construyó, punto a punto

### 1. Sistema de componentes modular

Arranqué definiendo la arquitectura de componentes antes de escribir una sola línea de HTML. Cada pieza tiene una responsabilidad única:

```
components/
├── Hero.astro          → primera impresión, role rotation
├── Nav.astro           → header fijo, dark mode, menú mobile
├── Skills.astro        → 4 categorías con íconos
├── Projects.astro      → proyectos destacados
├── ProjectCard.astro   → card reutilizable con props tipadas
├── BlogPreview.astro   → últimas N entradas del blog
├── Contact.astro       → CTA con email y redes
├── Footer.astro        → branding
├── Card.astro          → wrapper genérico
└── shared/
    ├── AvailableStatus.astro   → badge "disponible"
    └── SocialLinks.astro       → íconos sociales
```

Cada componente recibe props con interfaz TypeScript. Sin magic strings. Sin props opcionales sin default.

### 2. Hero con role rotation en vanilla JS

El hero tiene un detalle que me gusta mucho: el título rota entre roles del desarrollador cada 3 segundos con una transición suave. Sin React, sin Vue, sin nada. Solo 15 líneas de JS:

```javascript
const roles = [
  "Full-Stack Developer",
  "Open Source Contributor",
  "TypeScript Enthusiast",
];
const el = document.getElementById("hero-role");
let i = 0;

setInterval(() => {
  if (!el) return;
  el.style.opacity = "0";
  el.style.transform = "translateY(-8px)";
  setTimeout(() => {
    i = (i + 1) % roles.length;
    el.textContent = roles[i];
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, 300);
}, 3000);
```

La transición CSS maneja el fade. El JS solo cambia el texto. Simple, predecible, sin dependencias.

### 3. Sistema de animaciones scroll-reveal

Una de las partes más sólidas del proyecto: un sistema de scroll-reveal basado en `IntersectionObserver` y atributos HTML. Sin librerías, sin 80kb extra de JS.

El contrato es simple: si querés que un elemento aparezca al hacer scroll, le ponés `data-reveal`. Si querés que sus hijos aparezcan en cascada, `data-reveal="stagger"`.

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-reveal].visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger: cada hijo con 80ms de delay */
[data-reveal="stagger"].visible > *:nth-child(1) { transition-delay: 0ms; }
[data-reveal="stagger"].visible > *:nth-child(2) { transition-delay: 80ms; }
[data-reveal="stagger"].visible > *:nth-child(3) { transition-delay: 160ms; }
/* ...y así hasta 10 hijos */
```

Y respeta `prefers-reduced-motion` de fábrica. Accesibilidad sin esfuerzo extra.

### 4. Dark mode persistido sin JS frameworks

El dark mode usa `class="dark"` en el elemento `<html>` y se persiste en `localStorage`. No hay flash de contenido al recargar porque el script de hydration corre en el `<head>`, antes de renderizar el body.

```html
<script>
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
</script>
```

### 5. Blog con Content Collections de Astro

Los posts son archivos `.md` en `src/content/blog/`. Astro los valida con un schema, los tipea automáticamente y los expone como colección. El frontmatter requerido es mínimo:

```yaml
---
title: "Mi post"
date: "2026-03-17"
description: "Descripción corta para SEO y preview"
slug: "mi-post"
---
```

El componente `BlogPreview.astro` hace `getCollection("blog")`, ordena por fecha y renderiza las últimas N entradas. La página `[slug].astro` recibe el slug como parámetro y renderiza el Markdown con `<Content />`.

### 6. SEO y meta tags full-stack

El layout base incluye canonical, OpenGraph y Twitter Card en cada página. No como afterthought, sino desde el inicio:

```astro
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

### 7. Navegación mobile con hamburger menu

La nav es responsive con un menú hamburger para mobile implementado en vanilla JS. Estado gestionado con un data attribute, transición con CSS. Sin estado de React, sin useState, sin nada.

---

## Vibe coding controlado: qué es y por qué funciona

El "vibe coding" es la práctica de co-desarrollar con AI, dejándola proponer código mientras vos guiás la dirección. El problema es cuando se convierte en **copiar-pegar sin entender**: el código empieza a crecer sin coherencia, aparecen patrones inconsistentes, y perdés ownership del proyecto.

**El enfoque que funcionó acá fue diferente:**

### Regla 1: Arquitectura primero, código después

Antes de pedir cualquier componente, definí la estructura de carpetas, el stack, las convenciones de nombres y las reglas de Tailwind. Eso quedó documentado en `CLAUDE.md`. La AI trabaja dentro de esas restricciones, no las inventa.

### Regla 2: Entender antes de aceptar

Cada bloque de código generado fue leído y comprendido. Si algo no lo entendía, lo preguntaba o lo reescribía. Esto no es opcional: si no entendés el código que pusiste en producción, vas a tener problemas para debuggearlo.

### Regla 3: Reviewar el diff, no el resultado

El output visual puede parecer correcto aunque el código sea un desastre. El hábito de revisar el diff (no solo el navegador) mantuvo la calidad constante.

### Regla 4: Pedir funciones, no magia

Las instrucciones eran específicas: "creá un componente `AvailableStatus.astro` con un badge verde pulsante que diga 'Available for opportunities', sin JS". No "haceme algo copado para el header". La precisión en los prompts reduce la basura en el output.

---

## Números finales

- **Componentes creados:** 12
- **Líneas de CSS custom:** ~108 (mayormente animaciones y scroll-reveal)
- **JS enviado al cliente:** ~0kb de frameworks, <2kb de scripts inline
- **Páginas:** `/`, `/about`, `/projects`, `/blog`, `/blog/:slug`
- **Tiempo total:** ~2 días
- **Dependencias de runtime:** 0 (Astro genera HTML estático)

---

## Conclusión

El vibe coding no es magia ni atajo. Es una forma de trabajar más rápido manteniendo el criterio técnico propio. La AI es buena generando boilerplate, implementando patrones conocidos y sugiriendo soluciones. Sos vos quien decide si tiene sentido, si encaja en la arquitectura y si vale la pena incluirlo.

El portfolio quedó rápido, limpio y mantenible. Y lo entiendo de punta a punta.

Eso es lo que importa.

---

*Si querés ver el código, los componentes están en `src/components/` y el sistema de animaciones en `src/styles/global.css`. Todo open.*
