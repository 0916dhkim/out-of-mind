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
  const snap = useSnapshot(state, {
    // `sync` option is needed to prevent cursor jumping.
    // Related: https://github.com/pmndrs/valtio/issues/132
    sync: true,
  });

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
