<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { useDropdownStore } from './store';

  import { cn } from '$lib/utils';

  export let disabled = false;

  let isFocused = false;
  const dispatch = createEventDispatcher();

  const { open } = useDropdownStore();
</script>

<div
  aria-disabled={disabled || undefined}
  data-disabled={disabled ? '' : undefined}
  data-dropdown-item
  data-highlighted={isFocused ? '' : undefined}
  role="menuitem"
  tabindex="-1"
  {...$$restProps}
  class={cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors',
    'outline-none focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    $$props.class,
  )}
  on:pointermove={(e) => {
    if (e.pointerType === 'mouse') {
      if (disabled) {
        // contentFocus
        // contentContext.onItemLeave(event);
      } else {
        // subContent 이동일 떄...
        // contentContext.onItemEnter(event);
        if (!e.defaultPrevented) {
          e.currentTarget.focus();
        }
      }
    }
  }}
  on:pointerleave={() => {}}
  on:click={(e) => {
    dispatch('click', e);
    if (!e.defaultPrevented) {
      $open = false;
    }
  }}
  on:keydown={(e) => {
    if (disabled) return;
    if (['Enter', ' '].includes(e.key)) {
      e.currentTarget.click();
      e.preventDefault();
    }
  }}
  on:focus={() => {
    isFocused = true;
  }}
  on:blur={() => {
    isFocused = false;
  }}
>
  <slot />
</div>
