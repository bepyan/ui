<script>
  import CopyButton from '../ui/copy-button.svelte';

  export let raw = '';

  let isRaw = false;
</script>

<div class="rounded-md border relative">
  <div class="absolute right-0 top-0 z-10">
    <div class="flex items-center justify-end px-3 py-3 gap-1">
      <button
        class="border px-1.5 bg-background text-foreground hover:bg-muted text-xs rounded-md h-6"
        class:border-transparent={isRaw}
        on:click={() => (isRaw = false)}
      >
        Preview
      </button>
      <button
        class="border px-1.5 bg-background text-foreground hover:bg-muted text-xs rounded-md h-6"
        class:border-transparent={!isRaw}
        on:click={() => (isRaw = true)}>Code</button
      >
      <CopyButton class="ml-1.5" value={raw} />
    </div>
  </div>

  <div class="flex min-h-[350px] justify-center p-10 items-center" class:hidden={isRaw}>
    <slot />
  </div>
  <div class:hidden={!isRaw}>
    <pre style:margin="0" style:padding="0" class="example border-none">{raw}</pre>
  </div>
</div>
