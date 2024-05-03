import * as styles from "./clock.css";

type ClockProps = {
  remainingSeconds: number;
};

export function Clock(props: ClockProps) {
  const minuteText = Math.floor(props.remainingSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secondText = Math.floor(props.remainingSeconds % 60)
    .toString()
    .padStart(2, "0");
  return (
    <div className={styles.container}>
      <div className={styles.clock}>
        <span className={styles.minute}>{minuteText}</span>
        <span>:</span>
        <span className={styles.second}>{secondText}</span>
      </div>
    </div>
  );
}
