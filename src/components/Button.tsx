import React from "react";
import { ButtonProps } from "../types/button";

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
