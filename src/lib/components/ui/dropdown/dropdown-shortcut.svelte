<script>
  import { cn } from '$lib/utils';
</script>

<span {...$$restProps} class={cn('ml-auto text-xs tracking-widest opacity-60', $$props.class)}>
  <slot />
</span>
