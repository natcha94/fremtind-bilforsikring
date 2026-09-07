import "./FormField.scss";
import { type UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  children?: React.ReactNode;
  error?: string;
  registration?: UseFormRegisterReturn;
};

export function FormField({ id, label, type = "text", placeholder, children, error, registration }: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>
      {children ?? (
        <input
          className={`form-field__input${error ? " form-field__input--error" : ""}`}
          id={id}
          type={type}
          placeholder={placeholder}
          {...registration}
        />
      )}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
