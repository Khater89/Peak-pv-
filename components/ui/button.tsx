import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[2px] text-[0.8125rem] font-semibold uppercase tracking-[0.16em] transition-[background-color,border-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.125em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-ink text-[#faf8f4] hover:bg-sun-500",
        dark: "bg-ink text-[#faf8f4] hover:bg-sun-500",
        gold: "bg-sun-400 text-white hover:bg-sun-500",
        outline: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-[#faf8f4]",
        ghostLight: "border-[1.5px] border-white/30 text-white hover:bg-white/10 hover:border-white/60",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-7",
        lg: "h-14 px-9",
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
