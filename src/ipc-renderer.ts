import type { EventName, EventPayload } from "./event";

declare global {
  interface Window {
    electronAPI: {
      on: <TEventName extends EventName>(
        eventName: TEventName,
        handler: (payload: EventPayload<TEventName>) => void,
      ) => void;
      send: <TEventName extends EventName>(
        eventName: TEventName,
        payload: EventPayload<TEventName>,
      ) => void;
    };
  }
}
