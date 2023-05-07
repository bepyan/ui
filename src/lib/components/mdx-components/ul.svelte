<script>
  import { cn } from '$lib/utils';
</script>

<ul {...$$restProps} class={cn('my-6 ml-6 list-disc', $$props.class)}>
  <slot />
</ul>
