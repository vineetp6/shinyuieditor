import { DragPos } from "../../state-logic/drag-logic";
import classes from "./style.module.css";

export function DragFeedbackRect({ status }: { status: DragPos }) {
  if (status)
    return (
      <div
        className={classes.rect}
        style={{
          "--top": status.YStart + "px",
          "--left": status.XStart + "px",
          width: status.width,
          height: status.height,
        }}
      ></div>
    );

  return <div className={classes.hidden}></div>;
}