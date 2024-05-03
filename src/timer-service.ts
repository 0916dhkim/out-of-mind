import type { BrowserWindow } from "electron";
import electron = require("electron");

import { on, send } from "./ipc-main";

const TICK_INTERVAL_MS = 10;

type State =
  | {
      type: "ready";
    }
  | {
      type: "running";
      endTime: number;
      duration: number;
    }
  | {
      type: "paused";
      remainingTime: number;
      duration: number;
    };

export function TimerService() {
  let state: State = { type: "ready" };
  let window: BrowserWindow | undefined;

  function start(duration: number) {
    state = {
      type: "running",
      endTime: Date.now() + duration,
      duration,
    };
  }

  function pause() {
    if (state.type === "running") {
      const remainingTime = state.endTime - Date.now();
      state = {
        type: "paused",
        remainingTime,
        duration: state.duration,
      };
      if (window) {
        send(window, "timer-paused", {
          remainingTime,
          duration: state.duration,
        });
      }
    }
  }

  function unpause() {
    if (state.type === "paused") {
      state = {
        type: "running",
        endTime: Date.now() + state.remainingTime,
        duration: state.duration,
      };
    }
  }

  function stop() {
    if (state.type !== "ready") {
      state = { type: "ready" };
      if (window) {
        send(window, "timer-complete", undefined);
      }
    }
  }

  function attach(next: BrowserWindow) {
    window = next;
  }

  function detach() {
    window = undefined;
  }

  function tick() {
    if (state.type === "running") {
      const remainingTime = state.endTime - Date.now();
      const beforeTimerEnd = remainingTime > 0;
      if (beforeTimerEnd) {
        if (window) {
          send(window, "tick", { remainingTime, duration: state.duration });
        }
      } else {
        state = { type: "ready" };
        new electron.Notification({
          title: "Timer complete",
          urgency: "normal",
        }).show();
        if (window) {
          send(window, "timer-complete", undefined);
        }
      }
    }
  }

  on("start-timer", ({ duration }) => start(duration));
  on("pause-timer", () => pause());
  on("unpause-timer", () => unpause());
  on("stop-timer", () => stop());
  setInterval(tick, TICK_INTERVAL_MS);

  return {
    attach,
    detach,
  };
}

export type TimerService = ReturnType<typeof TimerService>;
