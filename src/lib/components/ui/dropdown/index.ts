import DropdownContent from './dropdown-content.svelte';
import DropdownItem from './dropdown-item.svelte';
import DropdownLabel from './dropdown-label.svelte';
import DropdownSeparator from './dropdown-separator.svelte';
import DropdownShortcut from './dropdown-shortcut.svelte';
import DropdownTrigger from './dropdown-trigger.svelte';
import Root from './root.svelte';

const Dropdown = Root as typeof Root & {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
  Item: typeof DropdownItem;
  Label: typeof DropdownLabel;
  Separator: typeof DropdownSeparator;
  Shortcut: typeof DropdownShortcut;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Label = DropdownLabel;
Dropdown.Separator = DropdownSeparator;
Dropdown.Shortcut = DropdownShortcut;

export default Dropdown;
