import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,box-shadow,transform,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.125em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-sun-400 text-ink shadow-[0_6px_20px_-8px_rgb(233_165_32/0.8)] hover:bg-sun-300 hover:-translate-y-px active:translate-y-0",
        dark: "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-px active:translate-y-0",
        outline: "border-[1.5px] border-navy-900/20 bg-white text-ink hover:border-navy-900/50 hover:bg-surface",
        ghostLight: "border-[1.5px] border-white/30 text-white hover:bg-white/10 hover:border-white/60",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
