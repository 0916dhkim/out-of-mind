import { contextBridge, ipcRenderer } from "electron";
import type { EventName, EventPayload } from "./event";

contextBridge.exposeInMainWorld("electronAPI", {
  on: <TEventName extends EventName>(
    eventName: TEventName,
    handler: (payload: EventPayload<TEventName>) => void,
  ) => {
    ipcRenderer.on(eventName, (_, payload) => {
      handler(payload);
    });
  },
  send: <TEventName extends EventName>(
    eventName: TEventName,
    payload: EventPayload<TEventName>,
  ) => {
    ipcRenderer.send(eventName, payload);
  },
});
