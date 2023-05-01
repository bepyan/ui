import { navConfig } from '$lib/constants/nav-config';

export async function load() {
  return {
    ...navConfig,
  };
}
