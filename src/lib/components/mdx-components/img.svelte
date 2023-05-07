<script>
  import { cn } from '$lib/utils';

  export let alt = '';
</script>

<img {alt} {...$$restProps} class={cn('rounded-md', $$props.class)} />
