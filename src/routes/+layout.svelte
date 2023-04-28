<script>
  import '../app.css';
  import ThemeProvider from '$lib/components/theme-provider.svelte';
</script>

<ThemeProvider>
  <div class="relative flex min-h-screen flex-col">
    <div class="flex-1">
      <slot />
    </div>
  </div>
</ThemeProvider>
