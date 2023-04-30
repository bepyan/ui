<script context="module" lang="ts">
  import type { BaseProps } from '$lib/types';

  export type InputProps = BaseProps<'input'> & {};
</script>

<script lang="ts">
  import { cn } from '$lib/utils';

  export let type: InputProps['type'] = 'text';
  export let placeholder: InputProps['placeholder'] = '';
</script>

<input
  {placeholder}
  {type}
  {...$$restProps}
  class={cn(
    'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    $$props.class,
  )}
/>
