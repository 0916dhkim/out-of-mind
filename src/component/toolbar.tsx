import * as styles from "./toolbar.css";

type ToolbarProps = {
  children: React.ReactNode;
};

export function Toolbar({ children }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      {children}
      <div className={styles.dragArea} style={{ "-webkit-app-region": "drag" }}>
        ✥
      </div>
    </div>
  );
}
