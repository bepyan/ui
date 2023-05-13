<script lang="ts">
  import { cn } from '$lib/utils';
</script>

<div {...$$restProps} class={cn('flex items-center p-6 pt-0', $$props.class)}>
  <slot />
</div>
