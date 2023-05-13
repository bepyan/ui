import type { Placement } from '@floating-ui/dom';
import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

import useFloating from '$lib/hooks/useFloating';

const CONTEXT_KEY = Symbol();

export interface DropdownProps {
  defaultOpen: boolean;
  placement?: Placement;
}

interface DropdownStore {
  open: Writable<boolean>;
  defaultOpen: boolean;
  triggerEl: Writable<HTMLElement | null>;
  contentRootEl: Writable<HTMLElement | null>;
}

export const createDropdownStore = ({ defaultOpen, placement }: DropdownProps) => {
  const open = writable(defaultOpen);
  const triggerEl = writable<HTMLElement | null>(null);
  const contentRootEl = writable<HTMLElement | null>(null);

  useFloating(triggerEl, contentRootEl, {
    placement,
  });

  return setContext<DropdownStore>(CONTEXT_KEY, {
    open,
    defaultOpen,
    triggerEl,
    contentRootEl,
  });
};

export const useDropdownStore = () => {
  return getContext<DropdownStore>(CONTEXT_KEY);
};
