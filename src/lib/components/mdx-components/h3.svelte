<script>
  import { cn } from '$lib/utils';
</script>

<h3
  {...$$restProps}
  class={cn('font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight', $$props.class)}
>
  <slot />
</h3>
