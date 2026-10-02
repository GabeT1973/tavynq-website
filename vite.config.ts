import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { site } from './src/config/site.ts'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Fills the {{...}} placeholders in index.html from src/config/site.ts, so the title, meta
// description, Open Graph tags, and structured data crawlers see come from the one config file.
function siteMetaPlugin(): Plugin {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        url: `${site.url}/`,
        logo: `${site.url}/icon-512.png`,
        email: site.email,
      },
      {
        '@type': 'Service',
        name: `${site.name} B2B lead generation`,
        serviceType: 'B2B lead generation and appointment setting',
        description: site.seo.description,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
        audience: { '@type': 'BusinessAudience', name: site.niche },
      },
    ],
  }

  const values: Record<string, string> = {
    title: escapeHtml(site.seo.title),
    description: escapeHtml(site.seo.description),
    name: escapeHtml(site.name),
    url: escapeHtml(site.url),
    ogImage: escapeHtml(`${site.url}${site.seo.ogImage}`),
    ogImageAlt: escapeHtml(site.seo.ogImageAlt),
    jsonLd: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  }

  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html.replace(/\{\{(\w+)\}\}/g, (match, key: string) => values[key] ?? match)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [siteMetaPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
