<script>
  import { cn } from '$lib/utils';
</script>

<blockquote {...$$restProps} class={cn('mt-6 border-l-2 pl-6 italic', $$props.class)}>
  <slot />
</blockquote>
