<script lang="ts">
  import Separator from '$lib/components/ui/separator.svelte';

  export let data;
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
  <div class="mx-auto w-full min-w-0 prose">
    <div class="space-y-2">
      <h1 class="mb-2">
        {data.title}
      </h1>
      {#if data.description}
        <p class="text-lg text-muted-foreground">
          {data.description}
        </p>
      {/if}
    </div>
    <Separator class="my-8" />
    <svelte:component this={data.content} />
  </div>
</main>
