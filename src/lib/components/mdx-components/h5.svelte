<script>
  import { cn } from '$lib/utils';
</script>

<h5
  {...$$restProps}
  class={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', $$props.class)}
>
  <slot />
</h5>
