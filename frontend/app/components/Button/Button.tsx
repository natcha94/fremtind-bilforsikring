import "./Button.scss";

type ButtonProps = {
  variant: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button({ variant, type = "button", disabled, onClick, children }: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
