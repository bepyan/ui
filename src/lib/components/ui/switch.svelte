<script context="module" lang="ts">
  export type SwitchProps = BaseProps<'button'> & {
    /** The controlled checked state of the switch. */
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    /** The name of the switch. Submitted with its owning form as part of a name/value pair. */
    name?: string;
    /** The value given as data when submitted with a `name`. */
    value?: string;
  };
</script>

<script lang="ts">
  type $$Props = SwitchProps;

  import type { BaseProps } from '$lib/types';
  import { cn } from '$lib/utils';

  export let required: $$Props['required'] = false;
  export let value: $$Props['value'] = 'on';

  export let checked: $$Props['checked'] = false;
  $: dataState = checked ? 'checked' : 'unchecked';

  export let disabled: $$Props['disabled'] = false;
  $: dataDisabled = disabled ? '' : undefined;

  let button: HTMLButtonElement;
  $: isFormControl = button ? button.closest('form') : false;
</script>

<button
  bind:this={button}
  aria-checked={checked}
  aria-required={required}
  data-disabled={dataDisabled}
  data-state={dataState}
  {disabled}
  role="switch"
  type="button"
  {value}
  {...$$restProps}
  class={cn(
    'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    $$props.class,
  )}
  on:click={() => {
    checked = !checked;
  }}
>
  <span
    class={cn(
      'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
      'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
    )}
    data-disabled={dataDisabled}
    data-state={dataState}
  />
</button>

{#if isFormControl}
  <input
    name={$$props.name}
    style:position="absolute"
    style:opacity="0"
    style:margin="0"
    style:transform="translateX(-100%)"
    style:pointer-events="none"
    aria-hidden="true"
    {checked}
    {disabled}
    hidden
    {required}
    tabIndex={-1}
    type="checkbox"
    {value}
  />
{/if}
