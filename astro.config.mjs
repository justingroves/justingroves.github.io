// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.justingroves.com",
  integrations: [preact(), mdx(), icon()],

  vite: {
    plugins: [tailwindcss()],
  },
});