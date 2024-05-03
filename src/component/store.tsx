import { proxy } from "valtio";

export type TimerState =
  | {
      type: "ready";
    }
  | {
      type: "running";
      remainingTime: number;
      duration: number;
    }
  | {
      type: "paused";
      remainingTime: number;
      duration: number;
    };

export type AppState = {
  timer: TimerState;
};

export const state = proxy<AppState>({
  timer: { type: "ready" },
});

window.electronAPI.on("tick", ({ remainingTime, duration }) => {
  state.timer = proxy({
    type: "running",
    remainingTime,
    duration,
  });
});

window.electronAPI.on("timer-complete", () => {
  state.timer = proxy({
    type: "ready",
  });
});

window.electronAPI.on("timer-paused", ({ remainingTime, duration }) => {
  state.timer = proxy({
    type: "paused",
    remainingTime,
    duration,
  });
});
