<script>
  import { useTheme } from '$lib/components/theme-provider.svelte';
  import Button from '$lib/components/ui/button.svelte';

  const theme = useTheme();
</script>

<div class="p-4 flex gap-4">
  <Button on:click={theme.setLight}>Light</Button>
  <Button on:click={theme.setDark}>Dark</Button>
  <Button on:click={theme.setSystem}>System</Button>
</div>
<div>
  {$theme}
</div>
