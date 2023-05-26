<script context="module" lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority';

  import type { BaseProps } from '$lib/types';
  import { cn } from '$lib/utils';

  export const badgeVariants = cva(
    'inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
      variants: {
        variant: {
          default: 'bg-primary hover:bg-primary/80 border-transparent text-primary-foreground',
          secondary:
            'bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground',
          destructive:
            'bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground',
          outline: 'text-foreground',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  );

  export type BadgeProps = BaseProps<'div'> & VariantProps<typeof badgeVariants> & {};
</script>

<script lang="ts">
  type $$Props = BadgeProps;

  export let variant: $$Props['variant'] = 'default';
</script>

<div {...$$restProps} class={cn(badgeVariants({ variant }), $$props.class)} on:click />
