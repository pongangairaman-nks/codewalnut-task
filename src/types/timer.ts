export interface Timer {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  remainingTime: number;
  isRunning: boolean;
  createdAt: number;
}

export interface AddEditTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer?: Timer | null;
}

export interface TimerControlsProps {
  isRunning: boolean;
  remainingTime: number;
  duration: number;
  onToggle: () => void;
  onRestart: () => void;
}

export interface TimerItemProps {
  timer: Timer;
}

export interface TimerProgressProps {
  progress: number;
}

export interface TimerFormData {
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
}
