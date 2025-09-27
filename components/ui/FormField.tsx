import React from "react";
import { Input, InputProps } from "./Input";
import { Label } from "./Label";
import styles from "./FormField.module.css";

export interface FormFieldProps extends InputProps {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  helperText?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, required = false, errorMessage, helperText, id, disabled, className, ...inputProps }, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={styles.formField}>
        {label && (
          <Label htmlFor={inputId} required={required} disabled={disabled}>
            {label}
          </Label>
        )}

        <Input ref={ref} id={inputId} disabled={disabled} className={className} {...inputProps} />

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        {helperText && !errorMessage && <div className={styles.helperText}>{helperText}</div>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
