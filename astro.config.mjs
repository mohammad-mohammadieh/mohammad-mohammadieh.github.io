// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { BASE_PATH, SITE_URL } from "./site.config.mjs";

// Static output only. No UI framework, no CSS framework.
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  // Code in case studies is set in plain mono type by the site's own CSS.
  markdown: { syntaxHighlight: false },
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});
