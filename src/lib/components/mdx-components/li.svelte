<script>
  import { cn } from '$lib/utils';
</script>

<li {...$$restProps} class={cn('mt-2', $$props.class)}>
  <slot />
</li>
