import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as styles from "./progress-ring.css";

type ProgressRingProps = {
  trackColor: string;
  color: string;
  value: number;
  radius: number;
  strokeWidth: number;
};

export function ProgressRing(props: ProgressRingProps) {
  const normalizedRadius = props.radius - props.strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - props.value * circumference;

  return (
    <svg
      width={props.radius * 2}
      height={props.radius * 2}
      className={styles.svg}
      style={assignInlineVars({
        [styles.minWidth]: `${props.radius * 2}px`,
        [styles.minHeight]: `${props.radius * 2}px`,
      })}
    >
      <circle
        stroke={props.trackColor}
        fill="transparent"
        strokeWidth={props.strokeWidth}
        r={normalizedRadius}
        cx={props.radius}
        cy={props.radius}
      />
      <circle
        stroke={props.color}
        fill="transparent"
        strokeWidth={props.strokeWidth}
        strokeDasharray={circumference + " " + circumference}
        style={{
          strokeDashoffset,
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
        r={normalizedRadius}
        cx={props.radius}
        cy={props.radius}
      />
    </svg>
  );
}
