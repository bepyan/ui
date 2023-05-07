<script>
  import { cn } from '$lib/utils';
</script>

<td
  {...$$restProps}
  class={cn(
    'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
    $$props.class,
  )}
>
  <slot />
</td>
