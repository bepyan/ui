<script context="module" lang="ts">
  import hr from './mdx-components/hr.svelte';
  import img from './mdx-components/img.svelte';
  import table from './mdx-components/table.svelte';
  import td from './mdx-components/td.svelte';
  import th from './mdx-components/th.svelte';
  import tr from './mdx-components/tr.svelte';

  export { hr, img, table, td, th, tr };
</script>

<script lang="ts">
  import Separator from './ui/separator.svelte';

  export let title = '';
  export let description = '';
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
  </div>
  <Separator class="my-8" />
  <slot />
</div>
