<script>
  import { cn } from '$lib/utils';
</script>

<h1 {...$$restProps} class={cn('font-heading mt-2 scroll-m-20 text-4xl font-bold', $$props.class)}>
  <slot />
</h1>
