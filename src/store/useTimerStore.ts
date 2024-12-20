import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "../types/timer";

const initialState = {
  timers: [] as Timer[]
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    loadTimers: (state) => {
      // Check if there's any stored data in localStorage
      const persistedTimers = localStorage.getItem("timers");

      // If timers are found in localStorage, parse and update the state
      if (persistedTimers) {
        state.timers = JSON.parse(persistedTimers);
      } else {
        state.timers = []; // Default to an empty array if no timers are found
      }
    },
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now()
      });

      // Persist the updated timers list to localStorage
      localStorage.setItem("timers", JSON.stringify(state.timers));
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(
        (timer) => timer.id !== action.payload
      );
      // Persist the updated timers list in localStorage
      localStorage.setItem("timers", JSON.stringify(state.timers));
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
      }
    },
    updateTimer: (state) => {
      state.timers.forEach((timer) => {
        if (timer.isRunning && timer.remainingTime > 0) {
          timer.remainingTime -= 1;
          if (timer.remainingTime === 0) {
            timer.isRunning = false;
          }
        }
      });
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find(
        (timer) => timer.id === action.payload.id
      );
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;

        // Persist the updated timers list in localStorage
        localStorage.setItem("timers", JSON.stringify(state.timers));
      }
    }
  }
});

const store = configureStore({
  reducer: timerSlice.reducer
});

export { store };

export const {
  loadTimers,
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    loadTimers: () => dispatch(loadTimers()),
    addTimer: (timer: Omit<Timer, "id" | "createdAt">) =>
      dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: () => dispatch(updateTimer()),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) =>
      dispatch(editTimer({ id, updates }))
  };
};
