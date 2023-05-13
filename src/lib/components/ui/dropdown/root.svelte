<script lang="ts">
  import { createDropdownStore } from './store';

  export let open = false;
  export let defaultOpen = false;
  export let onOpenChange = (open: boolean) => {};

  const { open: storeOpen } = createDropdownStore({
    open,
    defaultOpen,
  });

  $: {
    open = $storeOpen;
    onOpenChange($storeOpen);
  }
</script>

<slot />
