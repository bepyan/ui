<script>
  import '../app.css';
  import DocSidebar from '$lib/components/doc-sidebar.svelte';
  import SiteFooter from '$lib/components/site-footer.svelte';
  import SiteHeader from '$lib/components/site-header.svelte';
  import ThemeProvider from '$lib/components/theme-provider.svelte';

  export let data;
</script>

<ThemeProvider>
  <div class="relative flex min-h-screen flex-col">
    <div class="flex-1">
      <SiteHeader items={data.mainNav} />
      <div
        class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
      >
        <DocSidebar sections={data.sidebarNav} />
        <slot />
      </div>
      <SiteFooter />
    </div>
  </div>
</ThemeProvider>
