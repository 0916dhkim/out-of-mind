import { globalStyle, style } from "@vanilla-extract/css";
import { inter } from "./font.css";

globalStyle("*:where(:not(iframe, canvas, img, svg, video):not(svg *))", {
  all: "unset",
  display: "revert",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  fontFamily: inter,
});

globalStyle("b", {
  fontWeight: "bold",
});

export const layout = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100svh",
  paddingBottom: "1rem",
});
