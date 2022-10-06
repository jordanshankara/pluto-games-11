import React from "react";
import styles from "../../styles/Snake.module.css";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../services/firebase";
import SnakeBox from "../../components/snake/SnakeBox";

function SnakeGame() {
  const currentUser = useAuth();
  return (
    <Container fluid id="snakegame" className={styles.snakeGame}>
      <ToastContainer theme="dark" />
      {currentUser ? (
        <SnakeBox />
      ) : (
        <div>
          <h1 className="text-white">Please Login Before Play</h1>
        </div>
      )}
    </Container>
  );
}

export default SnakeGame;
