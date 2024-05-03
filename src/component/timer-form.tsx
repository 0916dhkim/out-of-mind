import { memo, useState } from "react";
import * as styles from "./timer-form.css";
import { Toolbar } from "./toolbar";

export const TimerForm = memo(() => {
  const [durationMinutesInput, setDurationMinutesInput] = useState("");

  function sendStartEvent() {
    try {
      const durationMinutes = parseInt(durationMinutesInput);
      window.electronAPI.send("start-timer", {
        duration: durationMinutes * 60 * 1000,
      });
    } catch {
      alert("Invalid duration");
    }
  }

  return (
    <Toolbar>
      <div className={styles.inputContainer}>
        <input
          type="number"
          className={styles.input}
          value={durationMinutesInput}
          onChange={(e) => {
            setDurationMinutesInput(e.target.value);
          }}
        />
        <span>mins</span>
      </div>
      <button className={styles.startButton} onClick={sendStartEvent}>
        Start
      </button>
    </Toolbar>
  );
});
