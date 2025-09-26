import React from "react";
import styles from "./Button.module.css";

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
        {loading && (
          <svg className={styles.spinner} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className={styles.spinnerCircle} cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
            <path
              className={styles.spinnerPath}
              fill='currentColor'
              d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
