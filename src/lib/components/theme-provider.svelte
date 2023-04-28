<script context="module" lang="ts">
  import { getContext, setContext } from 'svelte';
  import { writable, type Readable } from 'svelte/store';

  const CONTEXT_KEY = Symbol();
  const STORAGE_KEY = 'theme';
  const MEDIA = '(prefers-color-scheme: dark)';
  const COLOR_SCHEME_LIST = ['light', 'dark'] as const;
  const THEME_LIST = ['light', 'dark', 'system'] as const;

  type SchemeType = (typeof COLOR_SCHEME_LIST)[number];
  type ThemeType = (typeof THEME_LIST)[number];

  export interface ThemeStore extends Readable<ThemeType> {
    setLight: () => void;
    setDark: () => void;
    setSystem: () => void;
  }

  export const createThemeStore = () => {
    //----- util -----//
    const getInitTheme = () => {
      const theme = THEME_LIST.find((v) => v === localStorage.getItem(STORAGE_KEY));
      return theme ?? 'system';
    };

    const applyTheme = (scheme: SchemeType) => {
      const d = document.documentElement;
      d.classList.remove(...COLOR_SCHEME_LIST);
      d.classList.add(scheme);
      d.style.colorScheme = scheme;
    };

    const handleMediaQuery = (e?: MediaQueryListEvent | MediaQueryList) => {
      if (!e) e = window.matchMedia(MEDIA);
      applyTheme(e.matches ? 'dark' : 'light');
    };

    const listenMediaQuery = () => {
      const mediaQuery = window.matchMedia(MEDIA);

      mediaQuery.addEventListener
        ? mediaQuery.addEventListener('change', handleMediaQuery)
        : mediaQuery.addListener(handleMediaQuery);

      handleMediaQuery();

      return () => {
        mediaQuery.removeEventListener
          ? mediaQuery.removeEventListener('change', handleMediaQuery)
          : mediaQuery.removeListener(handleMediaQuery);
      };
    };
    //----------------//

    const initTheme = getInitTheme();
    const { subscribe, set } = writable<ThemeType>(initTheme);

    subscribe((value) => {
      localStorage.setItem(STORAGE_KEY, value);

      if (value === 'system') {
        return listenMediaQuery();
      }

      applyTheme(value);
    });

    const store = {
      subscribe,
      setLight: () => set('light'),
      setDark: () => set('dark'),
      setSystem: () => set('system'),
    } satisfies ThemeStore;

    setContext(CONTEXT_KEY, store);
  };

  export const useTheme = () => {
    return getContext<ThemeStore>(CONTEXT_KEY);
  };
</script>

<script lang="ts">
  import { browser } from '$app/environment';

  if (browser) {
    createThemeStore();
  }

  const updateFn = `!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if('system'===e||(!e&&true)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme = 'dark';c.add('dark')}else{d.style.colorScheme = 'light';c.add('light')}}else if(e){c.add(e|| '')}if(e==='light'||e==='dark')d.style.colorScheme=e}catch(e){}}()`;
  const updateScript = '<scr' + 'ipt>' + updateFn + '</scr' + 'ipt>';
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<svelte:head>{@html updateScript}</svelte:head>

<slot />
