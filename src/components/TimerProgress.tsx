import React from "react";
import { TimerProgressProps } from "../types/timer";

export const TimerProgress: React.FC<TimerProgressProps> = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
    <div
      className="h-full rounded-full bg-blue-600 transition-all duration-1000"
      style={{ width: `${progress}%` }}
    />
  </div>
);
