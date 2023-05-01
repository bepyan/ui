export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItem[];
}

interface NavConfig {
  mainNav: NavItem[];
  sidebarNav: NavItemWithChildren[];
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs/introduction',
    },
    {
      title: 'Components',
      href: '/docs/components/button',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: Object.keys(import.meta.glob(`/src/content/docs/*.svx`)).map((path) => {
        const filename = path.replace('/src/content/docs/', '').replace('.svx', '');

        return {
          title: filename.replace(/^[a-z]/g, (char) => char.toUpperCase()),
          href: `/docs/${filename}`,
        };
      }),
    },
    {
      title: 'Components',
      items: Object.keys(import.meta.glob(`/src/content/docs/components/*.svx`)).map((path) => {
        const filename = path.replace('/src/content/docs/components/', '').replace('.svx', '');

        return {
          title: filename.replace(/^[a-z]/g, (char) => char.toUpperCase()),
          href: `/docs/components/${filename}`,
        };
      }),
    },
  ],
};
