<script>
  import { cn } from '$lib/utils';
</script>

<pre
  {...$$restProps}
  class={cn(
    'mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 data-[theme=dark]:bg-background data-[theme=light]:bg-white',
    $$props.class,
  )}>
  <slot />
</pre>
