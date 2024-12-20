// redux/actions/timerActions.ts
import { useDispatch, useSelector } from "react-redux";
import {
  loadTimers,
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer
} from "../reducers/timerReducer";
import { Timer } from "../../types/timer";

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector(
    (state: { timer: { timers: Timer[] } }) => state.timer.timers
  );

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
