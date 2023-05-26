<script lang="ts">
  import { CheckIcon, CopyIcon } from 'lucide-svelte';

  import { cn } from '$lib/utils';

  export let value: string;
  let hasCopied = false;

  const handleCopy = () => {
    if (hasCopied) return;

    navigator.clipboard.writeText(value);
    hasCopied = true;
  };

  $: if (hasCopied) {
    setTimeout(() => {
      hasCopied = false;
    }, 2000);
  }
</script>

<button
  on:click={handleCopy}
  {...$$restProps}
  class={cn(
    'relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm transition-all hover:bg-muted focus:outline-none',
    $$props.class,
  )}
>
  <span class="sr-only">Copy</span>
  {#if hasCopied}
    <CheckIcon class="h-3 w-3" />
  {:else}
    <CopyIcon class="h-3 w-3" />
  {/if}
</button>
