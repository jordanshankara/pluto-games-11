import styles from "../../styles/Rps.module.css";
import FaHandRock from "../../public/assets/batu.png";
import FaHandPaper from "../../public/assets/kertas.png";
import FaHandScissors from "../../public/assets/gunting.png";
import { Container, Button, Row, Col } from "reactstrap";
import { useAuth } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  CHOICE,
  COMPUTER,
  DETERMINER,
  PLAYER,
  START,
  WIN,
} from "../../redux/actions/rps";
import { TOTAL_SCORE } from "../../redux/actions/score";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }

  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];
  return <img src={Icon.src} {...props} alt="Choice" />;
}

function Player({ name = "Player", action = "rock" }) {
  return (
    <Col className="d-flex justify-content-center align-items-start">
      <div className={styles.player}>
        <div className="p-3 w-100 fw-bold">
          <span className="text-white">{`${name}`}</span>
        </div>
        <div>{action && <ActionIcon action={action} className="w-100" />}</div>
      </div>
    </Col>
  );
}
function Score({ score = 0 }) {
  return (
    <Col className={styles.scores}>
      <h4 className="text-white">{`Your Score: ${score}`}</h4>
    </Col>
  );
}

function ActionButton({ action, onActionSelected }) {
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

function ShowWinner({ winner = 0 }) {
  const text = {
    "-1": "You Win!",
    0: "Tie",
    1: "You Lose!",
    start: "START GAME",
  };

  return (
    <Col className="d-flex align-items-center justify-content-center">
      <h4 className="text-white">{text[winner]}</h4>
    </Col>
  );
}

function Rps() {
  const playerAction = useSelector((state) => state.rps.playerAction);
  const computerAction = useSelector((state) => state.rps.computerAction);
  const playerScore = useSelector((state) => state.rps.playerScore);
  const winner = useSelector((state) => state.rps.winner);
  const choice = useSelector((state) => state.rps.choice);
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();
    dispatch({
      type: CHOICE,
      payload: selectedAction,
    });
    dispatch({
      type: PLAYER,
      payload: selectedAction,
    });
    dispatch({
      type: COMPUTER,
      payload: newComputerAction,
    });

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    dispatch({
      type: WIN,
      payload: newWinner,
    });

    if (newWinner === -1) {
      dispatch({
        type: DETERMINER,
        payload: playerScore + 1,
      });
    } else if (newWinner === 1) {
      if (playerScore > 0) {
        dispatch({
          type: DETERMINER,
          payload: playerScore - 1,
        });
      } else {
        dispatch({
          type: DETERMINER,
          payload: playerScore,
        });
      }
    }
  };

  const onRestart = () => {
    dispatch({
      type: START,
    });
  };

  useEffect(() => {
    if (choice.length == 10) {
      toast.info("Your Score: " + playerScore);
      dispatch({
        type: TOTAL_SCORE,
        payload: playerScore,
      });
      setTimeout(() => {
        dispatch({
          type: START,
        });
      }, 2000);
    }
  });

  return (
    <Container fluid id="rps" className={styles.rps + " min-vh-100"}>
      <ToastContainer theme="dark" />
      {currentUser ? (
        <>
          <div>
            <h1 className="text-white">Rock Paper Scissors</h1>
          </div>

          <Container>
            <Row className="w-100">
              <Player xs="12" md="6" name="Player" action={playerAction} />
              <Player xs="12" md="6" name="Computer" action={computerAction} />
            </Row>
          </Container>
          <div className={styles.btnAction}>
            <Row xs={3} className="mb-4">
              <Col>
                <ActionButton
                  action="rock"
                  onActionSelected={onActionSelected}
                />
              </Col>
              <Col>
                <ActionButton
                  action="paper"
                  onActionSelected={onActionSelected}
                />
              </Col>
              <Col>
                <ActionButton
                  action="scissors"
                  onActionSelected={onActionSelected}
                />
              </Col>
            </Row>
            <Row xs={1} className="mb-4">
              <Col>
                <Button
                  block
                  color="danger"
                  onClick={onRestart}
                  className="fw-bold text-uppercase"
                >
                  New Game
                </Button>
              </Col>
            </Row>
            <Row>
              <div className="text-white">
                Play 10 Rounds to Get your Score!
              </div>
            </Row>
          </div>

          <Container className="d-flex justify-content-center">
            <Row className={styles.scores + " border py-4"}>
              <ShowWinner xs={12} sm={6} winner={winner} />
              <Score xs={12} sm={6} name="Player" score={playerScore} />
            </Row>
          </Container>
        </>
      ) : (
        <div>
          <h1 className="text-white">Please Login Before Play</h1>
        </div>
      )}
    </Container>
  );
}

export default Rps;
