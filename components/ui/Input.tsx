import React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.ComponentProps<"input"> {
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, fullWidth = false, ...props }, ref) => {
  // Combine CSS module classes for input
  const inputClasses = [styles.input, fullWidth && styles.fullWidth, className].filter(Boolean).join(" ");

  return <input type={type} className={inputClasses} ref={ref} {...props} />;
});

Input.displayName = "Input";

export { Input };
