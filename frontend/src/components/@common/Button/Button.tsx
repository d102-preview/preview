import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  textSize?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

const Button = ({
  width = 'w-16',
  height = 'h-8',
  text,
  backgroundColor,
  borderColor,
  borderRadius = 'rounded-lg',
  hoverBackgroundColor,
  hoverTextColor,
  textColor,
  textSize = 'text-sm',
  children,
  ...props
}: PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={`text-center font-bold ${width} ${height} ${backgroundColor} ${borderColor} ${borderRadius} ${hoverBackgroundColor} ${hoverTextColor} ${textColor} ${textSize}`}
      {...props}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
