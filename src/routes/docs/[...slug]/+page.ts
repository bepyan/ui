import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const comps = import.meta.glob(`/src/content/docs/**/*.svx`);
  const match = comps[`/src/content/docs/${params.slug}.svx`];
  if (!match) throw error(404, 'Document not found');

  const comp = (await match()) as any;

  return {
    content: comp.default,
    title: comp.metadata.title,
    description: comp.metadata.description,
    slug: params.slug,
  };
}
