<script>
  import { cn } from '$lib/utils';
</script>

<code
  {...$$restProps}
  class={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', $$props.class)}
>
  <slot />
</code>
