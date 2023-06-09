<script context="module" lang="ts">
  import { type VariantProps, cva } from 'class-variance-authority';

  import type { BaseProps } from '$lib/types';
  import { cn } from '$lib/utils';

  export type ButtonProps = BaseProps<'button'> & VariantProps<typeof buttonVariants> & {};

  const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'underline-offset-4 hover:underline text-primary',
        },
        size: {
          default: 'h-10 py-2 px-4',
          xs: 'h-8 px-2 rounded-md text-xs',
          sm: 'h-9 px-3 rounded-md',
          lg: 'h-11 px-8 rounded-md',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    },
  );
</script>

<script lang="ts">
  type $$Props = ButtonProps;

  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'default';
</script>

<button {...$$props} class={cn(buttonVariants({ variant, size, class: $$props.class }))} on:click>
  <slot>button</slot>
</button>
