import { Col } from "reactstrap";
import styles from "../../styles/Rps.module.css";
import { ActionIcon } from "./ActionIcon";

export function Player({ name = "Player", action = "rock" }) {
  return (
    <Col className="d-flex justify-content-center align-items-start">
      <div className={styles.player} id="playerBox">
        <div className="p-3 w-100 fw-bold">
          <span className="text-white" id="playerName">{`${name}`}</span>
        </div>
        <div>{action && <ActionIcon action={action} className="w-100" />}</div>
      </div>
    </Col>
  );
}
