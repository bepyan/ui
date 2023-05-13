<script lang="ts">
  import { useDropdownStore } from './store';

  import clickOutside from '$lib/hooks/click-outside';
  import portal from '$lib/hooks/portal';
  import { cn } from '$lib/utils';

  const { open, triggerEl, contentRootEl } = useDropdownStore();

  let contentEl: HTMLElement;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') e.preventDefault();
    if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();

    const content = e.currentTarget as HTMLElement;
    const items = [...content.querySelectorAll<HTMLElement>(`[data-dropdown-item]`)].filter(
      (item) => !item.hasAttribute('data-disabled'),
    );

    const target = e.target as HTMLElement;
    const isItemFocused = target.dataset.dropdownItem !== undefined;

    if (['PageUp', 'Home'].includes(e.key) || (!isItemFocused && e.key === 'ArrowDown')) {
      items.at(0)?.focus();
      return;
    }
    if (['PageDown', 'End'].includes(e.key) || (!isItemFocused && e.key === 'ArrowUp')) {
      items.at(-1)?.focus();
      return;
    }

    if (isItemFocused) {
      const currentItemIndex = items.indexOf(target);

      if (e.key === 'ArrowDown') {
        items.at(currentItemIndex + 1)?.focus();
        return;
      }
      if (e.key === 'ArrowUp') {
        currentItemIndex && items.at(currentItemIndex - 1)?.focus();
        return;
      }
    }
  };

  $: {
    if ($open) {
      contentEl?.focus();
    }
  }
</script>

{#if $open}
  <div
    bind:this={$contentRootEl}
    class="fixed left-0 top-0 z-50 min-w-max"
    on:clickOutside={(e) => {
      if ($triggerEl?.contains(e.detail.outsideTarget)) return;
      $open = false;
    }}
    use:clickOutside
    use:portal
  >
    <div
      bind:this={contentEl}
      aria-orientation="vertical"
      data-dropdown-content
      role="menu"
      tabindex="-1"
      on:keydown={handleKeydown}
      {...$$restProps}
      class={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        $$props.class,
      )}
    >
      <slot />
    </div>
  </div>
{/if}
