<script>
  import Button from '$lib/components/ui/button.svelte';
  import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownLabel,
    DropdownSeparator,
    DropdownItem,
    DropdownShortcut,
  } from '$lib/components/ui/dropdown';
</script>

<Dropdown>
  <DropdownTrigger>
    <Button variant="outline">Open</Button>
  </DropdownTrigger>
  <DropdownContent class="w-56">
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>
      <span>Profile</span>
      <DropdownShortcut>⇧⌘P</DropdownShortcut>
    </DropdownItem>
    <DropdownItem disabled>
      <span>Billing</span>
    </DropdownItem>
    <DropdownItem>
      <span>Settings</span>
    </DropdownItem>
  </DropdownContent>
</Dropdown>
