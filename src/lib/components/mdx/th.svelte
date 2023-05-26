<script>
  import { cn } from '$lib/utils';
</script>

<th
  {...$$restProps}
  class={cn(
    'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
    $$props.class,
  )}
>
  <slot />
</th>
