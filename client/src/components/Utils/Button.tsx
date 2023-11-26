import Image from "next/image";

interface ButtonProps {
  buttonTitle?: string;
  buttonClassNames?: string;
  buttonIcon?: string;
  buttonIconClassNames?: string;
  disabled?: boolean;
  onClick?: () => void;
}
const Button = ({
  buttonTitle = "",
  buttonClassNames,
  buttonIcon,
  buttonIconClassNames,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`bg-secondary px-4 py-2 rounded-full my-2 ${buttonClassNames} transition-all duration-500 ease-in-out `}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonIcon && (
        <Image
          src={buttonIcon}
          alt={buttonTitle}
          className={`w-6 h-6${buttonIconClassNames}`}
        />
      )}
      {buttonTitle}
    </button>
  );
};

export default Button;
