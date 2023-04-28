import type { SvelteHTMLElements } from 'svelte/elements';

export type BaseProps<El extends keyof SvelteHTMLElements = 'div'> = SvelteHTMLElements[El] & {
  [key: `data-${string}`]: string | boolean | undefined;
};
