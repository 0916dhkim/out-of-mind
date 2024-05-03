import { z } from "zod";
import path from "node:path";
import { app } from "electron";
import { readFileSync, writeFileSync } from "node:fs";

export const DEFAULT_WIDTH = 360;
export const DEFAULT_HEIGHT = 128;

const windowStateFilePath = path.resolve(
  app.getPath("userData"),
  "window-state.json",
);

const windowFileSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

type WindowFile = z.infer<typeof windowFileSchema>;

const DEFAULT_WINDOW_FILE: WindowFile = {
  x: 0,
  y: 0,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
};

function parseWindowFile(rawString: string): WindowFile {
  try {
    const obj = JSON.parse(rawString);
    return windowFileSchema.parse(obj);
  } catch {
    return DEFAULT_WINDOW_FILE;
  }
}

export function readWindowFile() {
  try {
    const fileContent = readFileSync(windowStateFilePath, { encoding: "utf8" });
    return parseWindowFile(fileContent);
  } catch {
    return DEFAULT_WINDOW_FILE;
  }
}

export function writeWindowFile(windowState: WindowFile) {
  writeFileSync(windowStateFilePath, JSON.stringify(windowState), {
    encoding: "utf8",
  });
}
