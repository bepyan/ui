<script>
  export let data;
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
  <svelte:component this={data.content} />
</main>
