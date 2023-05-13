<script lang="ts">
  import { cn } from '$lib/utils';
</script>

<div
  {...$$restProps}
  class={cn('text-lg font-semibold leading-none tracking-tight', $$props.class)}
>
  <slot />
</div>
