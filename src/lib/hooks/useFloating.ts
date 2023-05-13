import { autoUpdate, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom';
import { onDestroy } from 'svelte';
import { derived, type Readable } from 'svelte/store';

export default function useFloating(
  referenceEl: Readable<HTMLElement | null>,
  floatingEl: Readable<HTMLElement | null>,
  options?: {
    placement?: Placement;
  },
) {
  let cleanupAutoUpdate: (() => void) | undefined;

  const unsubscribe = derived([referenceEl, floatingEl], (values) => values).subscribe(
    ([$referenceEl, $floatingEl]) => {
      if (cleanupAutoUpdate) cleanupAutoUpdate();
      if (!$referenceEl || !$floatingEl) return;

      const cleanup = autoUpdate($referenceEl, $floatingEl, async () => {
        const { x, y } = await computePosition($referenceEl, $floatingEl, {
          strategy: 'fixed',
          placement: options?.placement ?? 'bottom',
          middleware: [offset(4), flip(), shift()],
        });

        Object.assign($floatingEl.style, {
          transform: `translate3d(${x}px, ${y}px, 0px)`,
        });
      });

      cleanupAutoUpdate = () => {
        cleanup();
        cleanupAutoUpdate = undefined;
      };
    },
  );

  onDestroy(() => {
    unsubscribe();
    cleanupAutoUpdate?.();
  });
}
