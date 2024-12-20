interface ToastAction {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ToastOptions {
  message: string;
  duration?: number;
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  action?: ToastAction;
}
