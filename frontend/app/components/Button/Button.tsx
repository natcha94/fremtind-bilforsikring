import "./Button.scss";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant: ButtonVariant;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button({ variant, type = "button", onClick, children }: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
