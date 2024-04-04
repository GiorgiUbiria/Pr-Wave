import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";
import react from "@astrojs/react";

export default defineConfig({
    prefetch: true,
    site: 'https://ornate-moonbeam-c5e191.netlify.app/',
    sitemap: true,
    integrations: [sitemap(), mdx(), lit(), icon(), react()],
});
