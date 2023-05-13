<script lang="ts">
  import { cn } from '$lib/utils';
</script>

<div {...$$restProps} class={cn('text-sm text-muted-foreground', $$props.class)}>
  <slot />
</div>
