<script lang="ts">
  import ThemeSwitcher from './theme-switcher.svelte';

  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import type { NavItem } from '$lib/constants/nav-config';
  import { cn } from '$lib/utils';

  export let items: NavItem[] = [];
</script>

<header
  class="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
  <div class="container flex h-14 items-center">
    <div class="mr-4 hidden md:flex md:items-center">
      <a class="mr-6 flex items-center space-x-2" href="/">
        <div class="mb-1 h-5 w-5 rounded-full bg-foreground" />
        <span class="hidden font-bold sm:inline-block">bepyan/ui</span>
      </a>
      <nav class="flex items-center gap-6 text-sm font-medium">
        {#each items as item}
          <a
            class={cn(
              'transition-colors hover:text-foreground/80',
              $page.url.pathname === item.href ? 'text-foreground' : 'text-foreground/60',
            )}
            href={item.href}
          >
            {item.title}
          </a>
        {/each}
      </nav>
    </div>
    <div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
      {#if browser}
        <ThemeSwitcher />
      {/if}
    </div>
  </div>
</header>
