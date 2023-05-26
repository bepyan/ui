<script>
  import { Sun, Moon, Laptop } from 'lucide-svelte';

  import { useTheme } from './theme-provider.svelte';
  import Button from './ui/button.svelte';
  import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from './ui/dropdown';

  const { setDark, setLight, setSystem } = useTheme();
</script>

<Dropdown placement="bottom-end">
  <DropdownTrigger>
    <Button class="w-9 px-0" size="sm" variant="ghost">
      <Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem on:click={setLight}>
      <Sun class="mr-2 h-4 w-4" />
      <span>Light</span>
    </DropdownItem>
    <DropdownItem on:click={setDark}>
      <Moon class="mr-2 h-4 w-4" />
      <span>Dark</span>
    </DropdownItem>
    <DropdownItem on:click={setSystem}>
      <Laptop class="mr-2 h-4 w-4" />
      <span>System</span>
    </DropdownItem>
  </DropdownContent>
</Dropdown>
