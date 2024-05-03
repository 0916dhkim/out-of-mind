import { BrowserWindow, app } from "electron";
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { on, send } from "./ipc-main";

const taskFilePath = path.resolve(app.getPath("userData"), "task.txt");

export function TaskService() {
  let window: BrowserWindow | undefined;

  function readTaskFile() {
    try {
      return readFileSync(taskFilePath, { encoding: "utf8" });
    } catch {
      return null;
    }
  }

  function attach(next: BrowserWindow) {
    window = next;
  }

  function detach() {
    window = undefined;
  }

  on("save-task", ({ task }) => {
    writeFileSync(taskFilePath, task, { encoding: "utf8" });
  });

  on("need-task", () => {
    const taskFromFile = readTaskFile();
    if (window && taskFromFile) {
      send(window, "task-loaded", { task: taskFromFile });
    }
  });

  return {
    attach,
    detach,
  };
}
