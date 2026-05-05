interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "gold";
  className?: string;
}

const variantClasses = {
  default: "bg-accent text-brand-text-light",
  green: "bg-primary/10 text-primary",
  gold: "bg-highlight/15 text-highlight-dark",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
