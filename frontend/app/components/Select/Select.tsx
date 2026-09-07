import "./Select.scss";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  id: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
};

export function Select({ id, options, placeholder, defaultValue = "" }: SelectProps) {
  return (
    <select className="select" id={id} defaultValue={defaultValue}>
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
