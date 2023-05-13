import type { ActionReturn } from 'svelte/action';
import { listen } from 'svelte/internal';

export type ClickOutsideEvent = CustomEvent<{
  outsideTarget: HTMLElement;
}>;

interface Attributes {
  'on:clickOutside': (e: ClickOutsideEvent) => void;
}

export default function clickOutside(node: HTMLElement): ActionReturn<{}, Attributes> {
  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement;

    if (node && !node.contains(target)) {
      node.dispatchEvent(
        new CustomEvent('clickOutside', {
          detail: {
            outsideTarget: target,
          },
        }) satisfies ClickOutsideEvent,
      );
    }
  };

  const stop = listen(document, 'click', handleClick, true);

  return {
    destroy() {
      stop();
    },
  };
}
