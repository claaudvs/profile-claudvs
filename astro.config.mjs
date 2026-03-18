// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import preact from "@astrojs/preact";

export default defineConfig({
  i18n: {
    locales: ["es", "en", {
      path: "french",
      codes: ["fr", "fr-BR", "fr-CA"]
    }],
    defaultLocale: 'en'
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [preact()],
});