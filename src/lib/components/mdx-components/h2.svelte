<script>
  import { cn } from '$lib/utils';
</script>

<h2
  {...$$restProps}
  class={cn(
    'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
    $$props.class,
  )}
>
  <slot />
</h2>
