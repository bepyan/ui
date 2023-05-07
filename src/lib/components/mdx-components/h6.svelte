<script>
  import { cn } from '$lib/utils';
</script>

<h6
  {...$$restProps}
  class={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', $$props.class)}
>
  <slot />
</h6>
