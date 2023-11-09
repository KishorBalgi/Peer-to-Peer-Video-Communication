interface ButtonProps {
  buttonTitle: string;
  buttonClassNames?: string;
  disabled?: boolean;
  onClick?: () => void;
}
const Button = ({
  buttonTitle,
  buttonClassNames,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`glow bg-secondary px-4 py-2 rounded-full my-2 ${buttonClassNames}`}
      disabled={disabled}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
