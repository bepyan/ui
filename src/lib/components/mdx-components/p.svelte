<script>
  import { cn } from '$lib/utils';
</script>

<p {...$$restProps} class={cn('leading-7 [&:not(:first-child)]:mt-6', $$props.class)}>
  <slot />
</p>
