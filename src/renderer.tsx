import { createRoot } from "react-dom/client";
import { App } from "./component/app";

const appDiv = document.getElementById("app");
if (appDiv == null) {
  throw new Error("#app element not found");
}
const root = createRoot(appDiv);
root.render(<App />);

