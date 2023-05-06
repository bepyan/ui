<script context="module" lang="ts">
  import type { BaseProps } from '$lib/types';
  import { cn } from '$lib/utils';

  const ORIENTATIONS = ['horizontal', 'vertical'] as const;

  export type SeparatorProps = BaseProps<'div'> & {
    orientation?: (typeof ORIENTATIONS)[number];
    decorative?: boolean;
  };
</script>

<script lang="ts">
  export let orientation: SeparatorProps['orientation'] = 'horizontal';
  /**
   * decorative mean if it only serves to visually separate elements, not semantic.
   */
  export let decorative: SeparatorProps['decorative'] = true;

  $: semanticProps = decorative
    ? { role: 'none' }
    : { role: 'separator', 'aria-orientation': orientation };
</script>

<div
  {...$$restProps}
  {...semanticProps}
  class={cn(
    'shrink-0 bg-border',
    orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
    $$props.class,
  )}
/>
