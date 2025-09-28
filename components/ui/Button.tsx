import React from "react";
import styles from "./Button.module.css";
import { Spinner } from "./Spinner";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = "md", variant = "primary", children, className, loading = false, disabled, ...props }, ref) => {
    // Combine CSS module classes
    const buttonClasses = [styles.button, styles[size], styles[variant], loading && styles.loading, className].filter(Boolean).join(" ");

    return (
      <button ref={ref} className={buttonClasses} disabled={disabled || loading} {...props}>
        {loading && <Spinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
