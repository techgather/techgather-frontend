import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[4px] border px-6 py-1 text-[12px] leading-14 font-medium w-fit shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow]',
  {
    variants: {
      variant: {
        default:
          'inline-block border-gray_5 text-gray_15 [a&]:hover:bg-primary/90 h-18 max-w-121 overflow-hidden text-ellipsis whitespace-nowrap capitalize',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        admin:
          'border-gray_5 text-gray_15 bg-white cursor-pointer px-10 py-4 text-[13px] leading-15 h-auto gap-10 hover:border-main_2 hover:text-main_2 transition-colors [&>svg]:size-[14px]',
        'admin-active':
          'border-main_2 text-white bg-main_2 cursor-pointer px-10 py-4 text-[13px] leading-15 h-auto gap-10 [&>svg]:size-[14px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
