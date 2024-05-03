import { style } from "@vanilla-extract/css";
import { inter } from "./font.css";

export const textarea = style({
  flex: 1,
  fontFamily: inter,
  resize: "none",
  padding: "0.5rem",
});
