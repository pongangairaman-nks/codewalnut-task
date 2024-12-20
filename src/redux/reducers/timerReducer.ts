// redux/reducers/timerReducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { Timer } from "../../types/timer";

const initialState = {
  timers: [] as Timer[]
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    //creating a new reducer for loading timers from the local storage
    loadTimers: (state) => {
      // loading timers from local storage
      const persistedTimers = localStorage.getItem("timers");
      if (persistedTimers) {
        state.timers = JSON.parse(persistedTimers);
      } else {
        state.timers = [];
      }
    },
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now()
      });

      //adding timers to the local storage
      localStorage.setItem("timers", JSON.stringify(state.timers));
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(
        (timer) => timer.id !== action.payload
      );
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

        //adding timers to the local storage
        localStorage.setItem("timers", JSON.stringify(state.timers));
      }
    }
  }
});

export default timerSlice.reducer;
export const {
  loadTimers,
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer
} = timerSlice.actions;
