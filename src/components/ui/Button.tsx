import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        // Primary
        default: 'bg-brand-red text-white hover:bg-brand-red-900',
        // Secondary
        secondary:
          'bg-surface/60 text-white border border-border hover:border-color-gray-700 backdrop-blur-xl',
        // Ghost
        ghost: 'text-white hover:bg-white/10',
        // Destructive
        destructuve: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Link
        link: 'text-brand-red underline-offset-4 hover:underline rounded-none',
        // Icon
        icon: 'bg-surface/60 text-white border border-border-light hover:border-white/40 backdrop-blur-xl',
        'icon-active': 'bg-brand-red/80 text-white border border-brand-red backdrop-blur-xl',
      },
      size: {
        // Large
        lg: 'h-[52px] px-5 text-base',
        // Default
        default: 'h-[44px] px-4 text-sm',
        // Small
        sm: 'h-[38px] px-3 text-[13px]',
        // Icon
        icon: 'h-[52px] w-[52px]',
        'icon-sm': 'h-[44px] w-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
