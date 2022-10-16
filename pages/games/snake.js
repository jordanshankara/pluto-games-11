import React from "react";
import styles from "../../styles/Snake.module.css";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../services/firebase";
import SnakeBox from "../../components/snake/SnakeBox";
import MusicPlayer from "../../components/AudioPlayer";

function SnakeGame() {
  const currentUser = useAuth();
  return (
    <Container fluid id="snakegame" className={styles.snakeGame}>
      <ToastContainer theme="dark" />
      <MusicPlayer link="https://firebasestorage.googleapis.com/v0/b/pluto-games-10.appspot.com/o/bgm%2FTREASURE%20-%20HELLO.mp3?alt=media&token=50983d62-753b-41ef-a64c-c3afca1c2f36" />
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
