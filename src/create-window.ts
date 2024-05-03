import { BrowserWindow } from "electron";
import { TimerService } from "./timer-service";
import path from "node:path";
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  readWindowFile,
  writeWindowFile,
} from "./window-file";
import { TaskService } from "./task-service";

const DIST = path.join(__dirname, "../dist");

const timerService = TimerService();
const taskService = TaskService();

export function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: DEFAULT_WIDTH,
    minWidth: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    minHeight: DEFAULT_HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setBounds(readWindowFile());
  mainWindow.setAlwaysOnTop(true);
  mainWindow.setVisibleOnAllWorkspaces(true);

  timerService.attach(mainWindow);
  taskService.attach(mainWindow);
  mainWindow.on("close", () => {
    timerService.detach();
    taskService.detach();
    const bounds = mainWindow.getBounds();
    writeWindowFile(bounds);
  });

  // and load the index.html of the app.
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(DIST, "index.html"));
  }
}
