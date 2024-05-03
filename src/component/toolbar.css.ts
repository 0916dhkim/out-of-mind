import { style } from "@vanilla-extract/css";

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0 1rem",
});

export const dragArea = style({
  flexShrink: 0,
  padding: "0.5rem",
  border: "1px solid black",
  borderRadius: "50%",
  cursor: "move",
  width: 36,
  height: 36,
  textAlign: "center",
});
