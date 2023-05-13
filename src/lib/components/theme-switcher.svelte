<script>
  import { Sun, Moon, Laptop } from 'lucide-svelte';

  import { useTheme } from './theme-provider.svelte';
  import Button from './ui/button.svelte';
  import Dropdown from './ui/dropdown';

  const { setDark, setLight, setSystem } = useTheme();
</script>

<Dropdown placement="bottom-end">
  <Dropdown.Trigger>
    <Button class="w-9 px-0" size="sm" variant="ghost">
      <Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item on:click={setLight}>
      <Sun class="mr-2 h-4 w-4" />
      <span>Light</span>
    </Dropdown.Item>
    <Dropdown.Item on:click={setDark}>
      <Moon class="mr-2 h-4 w-4" />
      <span>Dark</span>
    </Dropdown.Item>
    <Dropdown.Item on:click={setSystem}>
      <Laptop class="mr-2 h-4 w-4" />
      <span>System</span>
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
