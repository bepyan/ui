<script lang="ts">
  import { createDropdownStore, type DropdownProps } from './store';

  export let open = false;
  export let defaultOpen = false;
  export let placement: DropdownProps['placement'] = 'bottom';
  export let onOpenChange = (open: boolean) => {};

  const { open: storeOpen } = createDropdownStore({
    defaultOpen,
    placement,
  });

  $: {
    open = $storeOpen;
    onOpenChange($storeOpen);
  }
</script>

<slot />
