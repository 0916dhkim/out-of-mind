import { style } from "@vanilla-extract/css";

export const inputContainer = style({
  flex: 1,
  minWidth: 0,
  border: "1px solid black",
  display: "flex",
  padding: "0.5rem",
  gap: "0.25rem",
  borderRadius: "0.25rem",
});

export const input = style({
  flex: 1,
  minWidth: 0,
  textAlign: "right",
});

export const startButton = style({
  border: "1px solid black",
  borderRadius: "0.25rem",
  padding: "0.5rem",
});
