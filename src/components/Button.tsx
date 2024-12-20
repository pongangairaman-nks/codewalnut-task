import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Optional button types (defaults to 'button')
  onClick?: () => void;
  className: string;
  children: React.ReactNode; // Content of the button (text, icons, or elements)
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className,
  children
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
