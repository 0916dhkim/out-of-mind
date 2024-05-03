import { ProgressRing } from "./progress-ring";
import * as styles from "./timer-control.css";
import { Toolbar } from "./toolbar";

type TimerControlProps = {
  remainingTime: number;
  duration: number;
  paused: boolean;
};

export function TimerControl(props: TimerControlProps) {
  function sendPauseEvent() {
    window.electronAPI.send("pause-timer", undefined);
  }

  function sendUnpauseEvent() {
    window.electronAPI.send("unpause-timer", undefined);
  }

  function sendStopEvent() {
    window.electronAPI.send("stop-timer", undefined);
  }

  const displayTime = Math.ceil(props.remainingTime / 1000 / 60);

  return (
    <Toolbar>
      <ProgressRing
        radius={18}
        color="navy"
        trackColor="lightgray"
        value={props.remainingTime / props.duration}
        strokeWidth={14}
      />
      <span>
        <b>{displayTime}</b> {displayTime === 1 ? "minute" : "minutes"} left
      </span>
      <div className={styles.spacer} />
      {props.paused ? (
        <button className={styles.controlButton} onClick={sendUnpauseEvent}>
          Unpause
        </button>
      ) : (
        <button className={styles.controlButton} onClick={sendPauseEvent}>
          Pause
        </button>
      )}
      <button className={styles.controlButton} onClick={sendStopEvent}>
        Stop
      </button>
    </Toolbar>
  );
}
