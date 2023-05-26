<script>
  import { cn } from '$lib/utils';
</script>

<tr {...$$restProps} class={cn('m-0 border-t p-0 even:bg-muted', $$props.class)}>
  <slot />
</tr>
