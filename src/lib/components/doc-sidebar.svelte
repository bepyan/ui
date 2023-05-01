<script lang="ts">
  import { page } from '$app/stores';
  import type { NavItemWithChildren } from '$lib/constants/nav-config';
  import { cn } from '$lib/utils';

  export let sections: NavItemWithChildren[] = [];
</script>

<aside
  class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block"
>
  <div class="py-6 pr-6 lg:py-8">
    {#each sections as section}
      <div class="pb-6">
        <div class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</div>
        <div class="grid grid-flow-row auto-rows-max text-sm">
          {#each section.items as item}
            <a
              class={cn(
                'group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline',
                $page.url.pathname === item.href && 'font-medium bg-accent',
              )}
              href={item.href}
            >
              {item.title}
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</aside>
