import "./Select.scss";
import { clsx } from "clsx";
import { type UseFormRegisterReturn } from "react-hook-form";

type SelectProps = {
  id: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: boolean;
};

export function Select({ id, options, placeholder, registration, error }: SelectProps) {
  return (
    <select
      className={clsx("select", error && "select--error")}
      id={id}
      defaultValue=""
      {...registration}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
