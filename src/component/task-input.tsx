import { proxy, useSnapshot } from "valtio";
import * as styles from "./task-input.css";

const state = proxy({
  task: "",
});

window.electronAPI.send("need-task", undefined);
window.electronAPI.on("task-loaded", ({ task }) => {
  state.task = task;
});

export function TaskInput() {
  const snap = useSnapshot(state);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    state.task = e.target.value;
    window.electronAPI.send("save-task", { task: e.target.value });
  };

  return (
    <textarea
      className={styles.textarea}
      placeholder="What are you working on?"
      value={snap.task}
      onChange={handleChange}
    />
  );
}
