import { getContext, setContext } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

import useFloating from '$lib/hooks/useFloating';

const CONTEXT_KEY = Symbol();

interface DropdownStore {
  open: Writable<boolean>;
  defaultOpen: boolean;
  triggerEl: Writable<HTMLElement | null>;
  contentRootEl: Writable<HTMLElement | null>;
}

export const createDropdownStore = ({ defaultOpen }: any) => {
  const open = writable(defaultOpen);
  const triggerEl = writable<HTMLElement | null>(null);
  const contentRootEl = writable<HTMLElement | null>(null);

  useFloating(triggerEl, contentRootEl);

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
