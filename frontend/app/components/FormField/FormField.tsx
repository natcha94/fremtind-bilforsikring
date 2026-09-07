import "./FormField.scss";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  children?: React.ReactNode;
};

export function FormField({ id, label, type = "text", placeholder, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>
      {children ?? (
        <input
          className="form-field__input"
          id={id}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
