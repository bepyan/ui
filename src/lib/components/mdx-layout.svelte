<script context="module" lang="ts">
  import mediumZoom from 'medium-zoom';
  import { onMount } from 'svelte';

  import hr from './mdx/hr.svelte';
  import img from './mdx/img.svelte';
  import table from './mdx/table.svelte';
  import td from './mdx/td.svelte';
  import th from './mdx/th.svelte';
  import tr from './mdx/tr.svelte';

  export { hr, img, table, td, th, tr };
</script>

<script lang="ts">
  import GithubIcon from './icons/GithubIcon.svelte';
  import RadixIcon from './icons/RadixIcon.svelte';
  import { badgeVariants } from './ui/badge.svelte';
  import Separator from './ui/separator.svelte';

  export let title = '';
  export let description = '';
  export let refs = {};

  onMount(() => {
    mediumZoom(document.querySelectorAll('.mdx img'), {
      background: 'hsl(var(--background))',
    });
  });
</script>

<div class="mdx mx-auto w-full min-w-0">
  <div class="space-y-2">
    <h1 class="mb-2">
      {title}
    </h1>
    {#if description}
      <p class="text-lg text-muted-foreground">
        {description}
      </p>
    {/if}
    <div class="flex items-center space-x-2 pt-4">
      {#each Object.keys(refs) as ref}
        <a
          class={badgeVariants({ variant: 'secondary' })}
          href={refs[ref]}
          rel="noreferrer"
          target="_blank"
        >
          {#if ref.toLowerCase() === 'github'}
            <GithubIcon class="mr-1 h-3 w-3" />
          {:else if ref.toLowerCase().includes('radix')}
            <RadixIcon class="mr-1 h-3 w-3" />
          {/if}
          {ref}
        </a>
      {/each}
    </div>
  </div>
  <Separator class="my-8" />
  <slot />
</div>
