// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

function rehypeExternalLinks() {
  return (tree) => {
    const walk = (node) => {
      if (node?.type === "element" && node.tagName === "a") {
        const href = node.properties?.href;

        if (typeof href === "string" && /^https?:\/\//.test(href)) {
          node.properties.target = "_blank";
          node.properties.rel = "noopener noreferrer";
        }
      }

      if (Array.isArray(node?.children)) {
        node.children.forEach(walk);
      }
    };

    walk(tree);
  };
}

export default defineConfig({
  site: "https://example.com",
  output: "static",
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
