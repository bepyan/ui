<script lang="ts">
  import { cn } from '$lib/utils';
</script>

<div
  {...$$restProps}
  class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', $$props.class)}
>
  <slot />
</div>
