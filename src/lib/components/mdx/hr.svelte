<script>
  import Separator from '../ui/separator.svelte';

  import { cn } from '$lib/utils';
</script>

<Separator {...$$restProps} class={cn('my-4 md:my-8', $$props.class)} />
