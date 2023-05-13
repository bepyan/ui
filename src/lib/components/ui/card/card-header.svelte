<script lang="ts">
  import { cn } from '$lib/utils';
</script>

<div {...$$restProps} class={cn('flex flex-col space-y-1.5 p-6', $$props.class)}>
  <slot />
</div>
