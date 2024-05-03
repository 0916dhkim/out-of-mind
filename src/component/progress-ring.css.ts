import { style, createVar } from "@vanilla-extract/css";

export const minWidth = createVar();
export const minHeight = createVar();

export const svg = style({
  minWidth,
  minHeight,
});
