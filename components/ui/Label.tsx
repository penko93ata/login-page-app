import React from "react";
import styles from "./Label.module.css";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required = false, disabled = false, children, ...props }, ref) => {
    const labelClasses = [styles.label, required && styles.required, disabled && styles.disabled, className].filter(Boolean).join(" ");

    return (
      <label ref={ref} className={labelClasses} {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
