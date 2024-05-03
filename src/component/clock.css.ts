import { style } from "@vanilla-extract/css";

export const container = style({
  //alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const clock = style({
  alignSelf: "stretch",
  fontSize: "4rem",
  display: "flex",
  letterSpacing: "0.5rem",
});

export const minute = style({
  flex: 1,
  textAlign: "right",
});

export const second = style({
  flex: 1,
});
