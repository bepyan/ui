import fs from 'fs';
import path from 'path';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import { getHighlighter, renderToHtml } from 'shiki';

const htmlEscapes = {
  '{': '&lbrace;',
  '}': '&rbrace;',
  '`': '&grave;',
};

function escapeHtml(html) {
  return html.replace(/[{}`]/g, (chr) => htmlEscapes[chr]);
}

function codeToHtml(code, lang, highlighter, theme) {
  // https://github.com/shikijs/shiki/blob/main/packages/shiki/src/renderer.ts
  const html = renderToHtml(highlighter.codeToThemedTokens(code, lang), {
    fg: highlighter.getForegroundColor(),
    bg: highlighter.getBackgroundColor(),
    elements: {
      pre({ children }) {
        return `<pre data-theme="${theme}" data-language="${lang}">${children}</pre>`;
      },
    },
  });
  return escapeHtml(html);
}

export default {
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool',
  },
  highlight: {
    // https://rodneylab.com/sveltekit-shiki-syntax-highlighting/
    highlighter: async (code, lang) => {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md#shiki-themes
      const [darkHighlighter, lightHighlighter] = await Promise.all([
        getHighlighter({
          theme: JSON.parse(fs.readFileSync(path.resolve('./src/lib/themes/dark.json'), 'utf-8')),
        }),
        getHighlighter({
          theme: JSON.parse(fs.readFileSync(path.resolve('./src/lib/themes/light.json'), 'utf-8')),
        }),
      ]);

      const darkHtml = codeToHtml(code, lang, darkHighlighter, 'dark');
      const lightHtml = codeToHtml(code, lang, lightHighlighter, 'light');

      return darkHtml + lightHtml;
    },
  },
  layout: './src/lib/components/mdx-layout.svelte',
  remarkPlugins: [],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ['anchor'],
          ariaLabel: 'anchor',
        },
      },
    ],
    [
      rehypeExternalLinks,
      {
        target: '_blank',
        rel: ['noopener noreferrer'],
        // content: { type: 'text', value: ' 🔗' },
      },
    ],
  ],
};
