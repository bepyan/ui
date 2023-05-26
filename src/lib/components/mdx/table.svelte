<script>
  import { cn } from '$lib/utils';
</script>

<div class="my-6 w-full overflow-y-auto">
  <table {...$$restProps} class={cn('w-full', $$props.class)}>
    <slot />
  </table>
</div>
