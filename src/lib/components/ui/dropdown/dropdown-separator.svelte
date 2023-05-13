<script>
  import Separator from '../separator.svelte';

  import { cn } from '$lib/utils';
</script>

<Separator {...$$restProps} class={cn('-mx-1 my-1 h-px bg-muted', $$props.class)} />
