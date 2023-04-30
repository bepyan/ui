<script context="module" lang="ts">
  import type { BaseProps } from '$lib/types';
  import { cn } from '$lib/utils';

  export type LabelProps = BaseProps<'label'> & {};
</script>

<script>
</script>

<label
  {...$$restProps}
  class={cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    $$props.class,
  )}
  on:mousedown={(event) => {
    $$props.onmousedown?.(event);

    // prevent text selection when double clicking label
    if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
  }}
>
  <slot />
</label>
