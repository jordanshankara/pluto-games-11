import { Button } from "reactstrap";
import styles from "../../styles/Rps.module.css";
import { ActionIcon } from "./ActionIcon";

export function ActionButton({ action, onActionSelected }) {
  return (
    <Button
      color="light"
      className={styles.roundBtn}
      onClick={() => onActionSelected(action)}
      block
    >
      <ActionIcon action={action} />
      <span className="text-uppercase fw-bold d-none d-md-inline-block ms-2">
        {action}
      </span>
    </Button>
  );
}
