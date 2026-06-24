// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import preact from "@astrojs/preact"; // Minimal React Support
import mdx from "@astrojs/mdx"; // Markdown + JSX Support
import sitemap from "@astrojs/sitemap"; // SEO Support

import tailwindcss from "@tailwindcss/vite"; // CSS Support
import icon from "astro-icon";

// LaTeX support
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// import rehypeMathjax from "rehype-mathjax";
import { unified } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  site: "https://justingroves.com",
  integrations: [preact(), mdx(), icon(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      // rehypePlugins: [rehypeMathjax],
    }),
  },
});
