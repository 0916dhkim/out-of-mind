import { useSnapshot } from "valtio";
import { Clock } from "./clock";
import { state } from "./store";
import { TaskInput } from "./task-input";
import { TimerForm } from "./timer-form";
import * as styles from "./app.css";
import { TimerControl } from "./timer-control";

export function App() {
  const snap = useSnapshot(state);

  return (
    <div className={styles.layout}>
      <TaskInput />
      {snap.timer.type === "ready" && <TimerForm />}
      {(snap.timer.type === "running" || snap.timer.type === "paused") && (
        <TimerControl
          remainingTime={snap.timer.remainingTime}
          duration={snap.timer.duration}
          paused={snap.timer.type === "paused"}
        />
      )}
    </div>
  );
}
