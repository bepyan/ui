<script lang="ts">
  import Label from '../label.svelte';

  import { cn } from '$lib/utils';

  export let inset: boolean = false;
</script>

<Label
  {...$$restProps}
  class={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', $$props.class)}
>
  <slot />
</Label>
