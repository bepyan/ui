<script context="module" lang="ts">
  // [ ] Scrollbar sits on top of the scrollable content, taking up no space.
  // [ ] Scrolling is native; no underlying position movements via CSS transformations.
  // [ ] Shims pointer behaviors only when interacting with the controls, so keyboard controls are unaffected.
  // [ ] Supports Right to Left direction.

  type Direction = 'ltr' | 'rtl';
  type Sizes = {
    content: number;
    viewport: number;
    scrollbar: {
      size: number;
      paddingStart: number;
      paddingEnd: number;
    };
  };

  function toInt(value?: string) {
    return value ? parseInt(value, 10) : 0;
  }

  function getThumbRatio(viewportSize: number, contentSize: number) {
    const ratio = viewportSize / contentSize;
    return isNaN(ratio) ? 0 : ratio;
  }

  function getThumbSize(sizes: Sizes) {
    const ratio = getThumbRatio(sizes.viewport, sizes.content);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
    // minimum of 18 matches macOS minimum
    return Math.max(thumbSize, 18);
  }

  function clamp(value: number, [min, max]: [number, number]): number {
    return Math.min(max, Math.max(min, value));
  }

  function getThumbOffsetFromScroll(scrollPos: number, sizes: Sizes, dir: Direction = 'ltr') {
    const thumbSizePx = getThumbSize(sizes);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const scrollbar = sizes.scrollbar.size - scrollbarPadding;
    const maxScrollPos = sizes.content - sizes.viewport;
    const maxThumbPos = scrollbar - thumbSizePx;
    const scrollClampRange = dir === 'ltr' ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
    const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange as [number, number]);
    const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
    return interpolate(scrollWithoutMomentum);
  }

  // https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
  function linearScale(input: readonly [number, number], output: readonly [number, number]) {
    return (value: number) => {
      if (input[0] === input[1] || output[0] === output[1]) return output[0];
      const ratio = (output[1] - output[0]) / (input[1] - input[0]);
      return output[0] + ratio * (value - input[0]);
    };
  }

  function useDebounceCallback(callback: () => void, delay: number) {
    let debounceTimer = window.setTimeout(callback, delay);
    return () => {
      window.clearTimeout(debounceTimer);
    };
  }

  function useResizeObserver(element: HTMLElement, onResize: () => void) {
    let rAF = 0;
    /**
     * Resize Observer will throw an often benign error that says `ResizeObserver loop
     * completed with undelivered notifications`. This means that ResizeObserver was not
     * able to deliver all observations within a single animation frame, so we use
     * `requestAnimationFrame` to ensure we don't deliver unnecessary observations.
     * Further reading: https://github.com/WICG/resize-observer/issues/38
     */
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rAF);
      rAF = window.requestAnimationFrame(onResize);
    });
    resizeObserver.observe(element);
    console.log('listen resize ', element);

    return () => {
      window.cancelAnimationFrame(rAF);
      resizeObserver.unobserve(element);
      console.log('remove listen resize ', element);
    };
  }

  export function tryOnDestroy(fn: () => void) {
    try {
      get_current_component();
      onDestroy(fn);
    } catch {
      // fail silently
    }
  }

  function resizeObserverStore(
    target: Element,
    callback: (entries: ResizeObserverEntry[]) => void,
  ) {
    let observer: ResizeObserver | null = null;

    function cleanUp() {
      console.log('try cleanup', observer, target);
      if (observer !== null) {
        console.log('cleanup', observer, target);
        observer.disconnect();
        observer = null;
      }
    }

    function connect() {
      cleanUp();
      observer = new ResizeObserver(callback);
      observer.observe(target);
      console.log('observe', target);
    }

    function stop() {
      cleanUp();
    }

    tryOnDestroy(cleanUp);

    connect();

    return {
      stop,
    };
  }
</script>

<script lang="ts">
  import { get_current_component, onDestroy } from 'svelte/internal';

  import { cn } from '$lib/utils';

  export let dir: Direction = 'rtl';
  export let orientation: 'horizontal' | 'vertical' = 'vertical';
  $: isHorizontal = orientation === 'horizontal';
  $: isVertical = orientation === 'vertical';

  export let scrollHideDelay = 600;

  let sizes: Sizes = {
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
  };
  let cornerWidth = 0;
  let cornerHeight = 0;

  let scrollAreaEl: HTMLElement;
  let viewportEl: HTMLElement;
  let contentEl: HTMLElement;
  let scrollbarEl: HTMLElement;
  let thumbEl: HTMLElement;

  /* -------------------------------------------------------------------------------------------------
   * SCROLLBAR
   * -----------------------------------------------------------------------------------------------*/

  // HOVER
  let isHoverIn = false;
  let hideTimer = 0;

  const handlePointerEnter = () => {
    window.clearTimeout(hideTimer);
    isHoverIn = true;
  };

  const handlePointerLeave = () => {
    hideTimer = window.setTimeout(() => (isHoverIn = false), scrollHideDelay);
  };

  // SIZE
  const handleResize = () => {
    if (!viewportEl || !scrollbarEl) return;

    const scrollbarComputedStyle = getComputedStyle(scrollbarEl);

    sizes = {
      content: viewportEl.scrollHeight,
      viewport: viewportEl.offsetHeight,
      scrollbar: {
        size: scrollbarEl.clientHeight,
        paddingStart: toInt(scrollbarComputedStyle.paddingTop),
        paddingEnd: toInt(scrollbarComputedStyle.paddingBottom),
      },
    };

    console.log('resize', sizes);
  };

  $: viewportEl && resizeObserverStore(viewportEl, useDebounceCallback(handleResize, 10));
  $: contentEl && resizeObserverStore(contentEl, useDebounceCallback(handleResize, 10));
  $: scrollbarEl && resizeObserverStore(scrollbarEl, useDebounceCallback(handleResize, 10));

  $: hasThumb = (() => {
    const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
    Boolean(thumbRatio > 0 && thumbRatio < 1);
  })();

  // -------------------------------------------------------------------------------------------------

  /* -------------------------------------------------------------------------------------------------
   * THUMB
   * -----------------------------------------------------------------------------------------------*/

  let pointerOffset = 0;

  const handleThumbPointerUp = () => {
    pointerOffset = 0;
  };

  const handleThumbPointerDown = (event: any) => {
    const thumb = event.target as HTMLElement;
    const thumbRect = thumb.getBoundingClientRect();
    const x = event.clientX - thumbRect.left;
    const y = event.clientY - thumbRect.top;
    pointerOffset = y;
  };

  const onThumbPositionChange = () => {
    if (viewportEl && thumbEl) {
      const offset = getThumbOffsetFromScroll(viewportEl.scrollTop, sizes);
      thumbEl.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
  };
</script>

<!-- <svelte:window on:wheel|nonpassive={handleWheel} /> -->

<div
  bind:this={scrollAreaEl}
  {...$$restProps}
  class={cn('relative overflow-hidden', $$props.class)}
  on:pointerenter={handlePointerEnter}
  on:pointerleave={handlePointerLeave}
>
  <div
    bind:this={viewportEl}
    style:overflow-x={isHorizontal ? 'scroll' : 'hidden'}
    style:overflow-y={isVertical ? 'scroll' : 'hidden'}
    class="w-full h-full rounded-[inherit]"
    data-no-scrollbar
  >
    <div bind:this={contentEl} class="min-w-full table">
      <slot />
    </div>
  </div>
  {#if isHoverIn}
    <div
      bind:this={scrollbarEl}
      style:bottom="{cornerHeight}px"
      class={cn(
        'flex touch-none select-none transition-colors absolute top-0',
        dir === 'ltr' && 'left-0',
        dir === 'rtl' && 'right-0',
        isHorizontal && 'h-2.5 border-t border-t-transparent p-[1px]',
        isVertical && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      )}
      data-orientation={orientation}
      data-visible={isHoverIn}
    >
      <div
        bind:this={thumbEl}
        style:width={undefined}
        style:height="{getThumbSize(sizes)}px"
        style:transform="translate3d(0px, {pointerOffset}px, 0px)"
        class="relative flex-1 rounded-full bg-border"
        data-visible={hasThumb}
        on:pointerup={handleThumbPointerUp}
        on:pointerdown={handleThumbPointerDown}
      />
    </div>
  {/if}
  <!-- corner -->
  <!-- <div>corner</div> -->
</div>

<style>
  [data-no-scrollbar] {
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
  }
  [data-no-scrollbar]::-webkit-scrollbar {
    display: none;
  }
</style>
