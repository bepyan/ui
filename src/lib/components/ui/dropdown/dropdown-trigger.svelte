<script lang="ts">
  import { useDropdownStore } from './store';

  export let disabled = false;

  const { open, triggerEl } = useDropdownStore();
</script>

<div
  bind:this={$triggerEl}
  class="inline-block"
  aria-expanded={$open}
  aria-haspopup="menu"
  data-disabled={disabled ? '' : undefined}
  on:pointerdown={(e) => {
    if (disabled) return;
    // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
    // but not when the control key is pressed (avoiding MacOS right click)
    if (e.button === 0 && e.ctrlKey === false) {
      $open = !$open;
      // prevent trigger focusing when opening
      if ($open) e.preventDefault();
    }
  }}
  on:keydown={(e) => {
    if (disabled) return;
    if (['Enter', ' '].includes(e.key)) $open = !$open;
    if (['ArrowDown'].includes(e.key)) $open = true;
    // prevent scrolling window
    if (['Enter', ' ', 'ArrowDown'].includes(e.key)) e.preventDefault();
  }}
>
  <slot />
</div>
