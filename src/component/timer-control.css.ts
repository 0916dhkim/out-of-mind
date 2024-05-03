import { style } from "@vanilla-extract/css";

export const timerContainer = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  padding: "0 1rem",
});

export const controlButton = style({
  padding: "0.5rem",
  border: "1px solid black",
  borderRadius: "0.25rem",
});

export const spacer = style({
  flex: 1,
});
