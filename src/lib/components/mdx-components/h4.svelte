<script>
  import { cn } from '$lib/utils';
</script>

<h4
  {...$$restProps}
  class={cn('font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight', $$props.class)}
>
  <slot />
</h4>
