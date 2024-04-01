import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://prwave.netlify.app/',
  sitemap: true,
  integrations: [sitemap(), mdx(), lit(), icon()],
  adapter: node({
    mode: "standalone"
  })
});
