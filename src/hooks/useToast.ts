// useToast.ts (Custom Hook)

import { toast } from "sonner";

interface ToastAction {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ToastOptions {
  message: string;
  duration?: number;
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  action?: ToastAction;
}

export const useToast = () => {
  const showToast = ({
    message,
    duration = 5000,
    position = window.innerWidth < 768 ? "bottom-right" : "top-right",
    action
  }: ToastOptions) => {
    toast.success(message, {
      duration,
      position,
      action: action
        ? {
            label: action.label,
            onClick: (event) => {
              action.onClick(event);
            }
          }
        : undefined
    });
  };

  return { showToast };
};
