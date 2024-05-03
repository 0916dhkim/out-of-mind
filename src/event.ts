export type EventSpecs = {
  "start-timer": { duration: number };
  "pause-timer": undefined;
  "unpause-timer": undefined;
  "stop-timer": undefined;
  "save-task": { task: string };
  "need-task": undefined;
  tick: { remainingTime: number; duration: number };
  "timer-complete": undefined;
  "timer-paused": { remainingTime: number; duration: number };
  "task-loaded": { task: string };
};

export type EventName = keyof EventSpecs;
export type EventPayload<T extends EventName> = EventSpecs[T];
