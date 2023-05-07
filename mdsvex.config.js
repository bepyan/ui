import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';

export default {
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool',
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
      },
    ],
  ],
};
