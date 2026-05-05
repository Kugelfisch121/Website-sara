import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "highlight" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light focus:ring-primary",
  secondary:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
  highlight: "bg-highlight text-white hover:bg-highlight-dark focus:ring-highlight",
  ghost: "bg-transparent text-primary hover:bg-accent focus:ring-primary",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center font-sans font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

type ButtonAsButton = { href?: undefined; external?: never } & ComponentPropsWithoutRef<"button">;
type ButtonAsLink = { href: string; external?: boolean; children?: React.ReactNode };

type ButtonProps = (ButtonAsButton | ButtonAsLink) & {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, children } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { children, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
