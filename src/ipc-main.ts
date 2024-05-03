import { BrowserWindow, ipcMain } from "electron";
import type { EventName, EventPayload } from "./event";

export function on<TEventName extends EventName>(
  eventName: TEventName,
  handler: (payload: EventPayload<TEventName>) => void,
) {
  ipcMain.on(eventName, (_, payload) => {
    handler(payload);
  });
}

export function send<TEventName extends EventName>(
  window: BrowserWindow,
  eventName: TEventName,
  payload: EventPayload<TEventName>,
) {
  window.webContents.send(eventName, payload);
}
