# Project Context

Personal developer portfolio for **Claudio Vargas** built with Astro 6.

## Sections

| Route | Component | Type |
|-------|-----------|------|
| `/` | index.astro | Page (Hero, Skills, BlogPreview, Contact) |
| `/about` | about.astro | Page (bio, photos, social links) |
| `/projects` | projects.astro | Page (ProjectCard per company) |
| `/blog` | blog/index.astro | Blog listing |
| `/blog/:slug` | blog/[slug].astro | Dynamic Markdown post |

Sections reachable via anchors: `#skills`, `#contact`

---

# Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Astro | ^6.0.5 |
| Language | TypeScript | strict mode |
| Styling | Tailwind CSS | ^4.2.1 (Vite plugin) |
| Fonts | Inter + JetBrains Mono | Google Fonts |
| Content | Markdown / Content Collections | native Astro |
| Node | 22.12.0+ | ES modules |

---

# Architecture

## Components (`src/components/`)

```
components/
├── Hero.astro          # Homepage hero with role rotation + animated facts
├── Nav.astro           # Fixed header, dark mode toggle, mobile hamburger menu
├── Skills.astro        # 4 categories: Languages, Frontend, Backend, Tools
├── Projects.astro      # Featured projects (used on home)
├── ProjectCard.astro   # Reusable card: title, description, tags, github, live, featured
├── About.astro         # Bio section (home inline version)
├── BlogPreview.astro   # Fetches last N posts from Content Collection
├── Contact.astro       # CTA section with email + social links
├── Footer.astro        # Branding footer
├── Card.astro          # Generic card/article wrapper (date, label, title, description, image)
└── shared/
    ├── AvailableStatus.astro   # Pulsing green "Available for opportunities" badge
    └── SocialLinks.astro       # Social icons (GitHub, LinkedIn, Instagram, Twitch)
```

## Layouts (`src/layouts/`)

- **Layout.astro** — base layout used by all pages
  - Full SEO meta tags: canonical, OG, Twitter Card
  - Favicons: SVG, ICO, apple-touch-icon
  - Dark mode via `class="dark"` on `<html>`, persisted to `localStorage`
  - Scroll-reveal system: `[data-reveal]` uses IntersectionObserver to fade/slide elements in
  - Floating glow accent background element

## Styles (`src/styles/global.css`)

- `@import "tailwindcss"` — Tailwind v4 syntax
- Custom theme vars: accent `#6366f1` (indigo), fonts Inter + JetBrains Mono
- Keyframe animations: `fadeInUp`, `slideDown`, `float`, `blink`
- Scroll-reveal: `[data-reveal]` fades in on scroll, `[data-reveal="stagger"]` staggers children 80ms apart
- Respects `prefers-reduced-motion`

## Content (`src/content/blog/`)

Blog posts are `.md` files loaded via Astro Content Collections (`glob` loader).

Required frontmatter per post:
```yaml
title: string
description: string
date: string        # e.g. "2026-02-10"
slug: string
```

---

# Goals & Principles

- **Minimal UI** — no unnecessary decoration
- **Readable typography** — Inter for prose, JetBrains Mono for code
- **Fast loading** — static generation, no client JS frameworks
- **Reusable components** — small, focused, props-based
- **Accessible** — semantic HTML, reduced-motion support, keyboard nav

---

# Coding Rules

- Use reusable Astro components; keep them small and focused
- Use semantic HTML5 elements
- Style with Tailwind utility classes; avoid custom CSS unless adding animations
- Type all component props with TypeScript interfaces
- Dark mode must work: always add both `dark:` and light variants to Tailwind classes
- Add `data-reveal` or `data-reveal="stagger"` on new section containers for scroll animations
- Do not reveal confidential company information in project descriptions
- Blog posts go in `src/content/blog/` as `.md` files following the frontmatter schema above

---

# Public Assets

```
public/
├── favicon.svg / favicon.ico / apple-touch-icon.png
├── img/
│   ├── claud.png       # About page main photo
│   └── claud_1.png     # About page secondary photo
└── icons/              # Reserved for tech/skill icons
```
