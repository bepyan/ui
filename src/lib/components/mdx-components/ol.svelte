<script>
  import { cn } from '$lib/utils';
</script>

<ol {...$$restProps} class={cn('my-6 ml-6 list-decimal', $$props.class)}>
  <slot />
</ol>
