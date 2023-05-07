<script context="module" lang="ts">
  import a from './mdx-components/a.svelte';
  import blockquote from './mdx-components/blockquote.svelte';
  import code from './mdx-components/code.svelte';
  import h1 from './mdx-components/h1.svelte';
  import h2 from './mdx-components/h2.svelte';
  import h3 from './mdx-components/h3.svelte';
  import h4 from './mdx-components/h4.svelte';
  import h5 from './mdx-components/h5.svelte';
  import h6 from './mdx-components/h6.svelte';
  import hr from './mdx-components/hr.svelte';
  import img from './mdx-components/img.svelte';
  import li from './mdx-components/li.svelte';
  import ol from './mdx-components/ol.svelte';
  import p from './mdx-components/p.svelte';
  import pre from './mdx-components/pre.svelte';
  import table from './mdx-components/table.svelte';
  import td from './mdx-components/td.svelte';
  import th from './mdx-components/th.svelte';
  import tr from './mdx-components/tr.svelte';
  import ul from './mdx-components/ul.svelte';

  export {
    a,
    blockquote,
    code,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    img,
    li,
    ol,
    p,
    pre,
    table,
    td,
    th,
    tr,
    ul,
  };
</script>

<script lang="ts">
  import H1 from './mdx-components/h1.svelte';
  import P from './mdx-components/p.svelte';
  import Separator from './ui/separator.svelte';

  export let title = '';
  export let description = '';
</script>

<div class="mx-auto w-full min-w-0">
  <div class="space-y-2">
    <H1 class="mb-2">
      {title}
    </H1>
    {#if description}
      <P class="text-lg text-muted-foreground">
        {description}
      </P>
    {/if}
  </div>
  <Separator class="my-8" />
  <slot />
</div>
