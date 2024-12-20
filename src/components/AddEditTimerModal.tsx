import React, { useState } from "react";
import { X, Clock } from "lucide-react";
import { useTimerStore } from "../store/useTimerStore";
import { validateTimerForm } from "../utils/validation";
import { Timer } from "../types/timer";
import Button from "./Button";
import { useToast } from "../hooks/useToast";

interface AddEditTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer?: Timer | null;
}

export const AddEditTimerModal: React.FC<AddEditTimerModalProps> = ({
  isOpen,
  onClose,
  timer
}) => {
  const { showToast } = useToast(); // Initialize the hook

  const [title, setTitle] = useState(timer?.title || "");
  const [description, setDescription] = useState(timer?.description || "");
  const [hours, setHours] = useState(
    Math.floor((timer?.duration || 0) / 3600) || 0
  );
  const [minutes, setMinutes] = useState(
    Math.floor(((timer?.duration || 0) % 3600) / 60) || 0
  );
  const [seconds, setSeconds] = useState((timer?.duration || 0) % 60 || 0);
  const [touched, setTouched] = useState({
    title: false,
    hours: false,
    minutes: false,
    seconds: false
  });

  const { addTimer, editTimer } = useTimerStore();

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!validateTimerForm({ title, description, hours, minutes, seconds })) {
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (timer?.id) {
      editTimer(timer.id, {
        title: title.trim(),
        description: description.trim(),
        duration: totalSeconds
      });
    } else {
      addTimer({
        title: title.trim(),
        description: description.trim(),
        duration: totalSeconds,
        remainingTime: totalSeconds,
        isRunning: false
      });
    }

    onClose();
    setTitle("");
    setDescription("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTouched({
      title: false,
      hours: false,
      minutes: false,
      seconds: false
    });
  };

  const handleClose = () => {
    onClose();
    setTouched({
      title: false,
      hours: false,
      minutes: false,
      seconds: false
    });
  };

  const isTimeValid = hours > 0 || minutes > 0 || seconds > 0;
  const isTitleValid = title.trim().length > 0 && title.length <= 50;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Add New Timer</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isTitleValid || isTimeValid) {
              handleSubmit();
            } else {
              showToast({
                message: "Please enter valid input in the form fields"
              });
            }
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched({ ...touched, title: true })}
              maxLength={50}
              className={`${
                touched.title && !isTitleValid
                  ? "border-red-500"
                  : "border-gray-300"
              } w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter timer title"
            />
            {touched.title && !isTitleValid && (
              <p className="mt-1 text-sm text-red-500">
                Title is required and must be less than 50 characters
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {title.length}/50 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`border-light-gray w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter timer description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Duration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) =>
                    setHours(Math.min(23, parseInt(e.target.value) || 0))
                  }
                  onBlur={() => setTouched({ ...touched, hours: true })}
                  className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-3 py-2 border ${
                    touched.hours ? "border-gray-300" : "border-light-gray"
                  }  w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(Math.min(59, parseInt(e.target.value) || 0))
                  }
                  onBlur={() => setTouched({ ...touched, minutes: true })}
                  className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-3 py-2 border ${
                    touched.minutes ? "border-gray-300" : "border-light-gray"
                  } w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) =>
                    setSeconds(Math.min(59, parseInt(e.target.value) || 0))
                  }
                  onBlur={() => setTouched({ ...touched, seconds: true })}
                  className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-3 py-2 border ${
                    touched.seconds ? "border-gray-300" : "border-light-gray"
                  } w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
            </div>
            {touched.hours &&
              touched.minutes &&
              touched.seconds &&
              !isTimeValid && (
                <p className="mt-2 text-sm text-red-500">
                  Please set a duration greater than 0
                </p>
              )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              onClick={handleClose}
              className="text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700"
            >
              {timer?.id ? "Save Changes" : "Add Timer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
