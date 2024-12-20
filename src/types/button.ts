export interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Optional button types (defaults to 'button')
  onClick?: () => void;
  className: string;
  children: React.ReactNode; // Content of the button (text, icons, or elements)
}
