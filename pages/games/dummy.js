import styles from "../../styles/Dummy.module.css";
import { Button, Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../services/firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SCORE } from "../../redux/actions/dummy";
import React, { useEffect } from "react";
import { TOTAL_SCORE } from "../../redux/actions/score";
import MusicPlayer from "../../components/AudioPlayer";

export default function DummyGames() {
  const score = useSelector((state) => state.dummy.score);
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const randomScore = () => {
    const number = Math.floor(Math.random() * 10);
    return number;
  };

  const shuffleNumber = (e) => {
    e.preventDefault();
    const shuffle = setInterval(() => {
      dispatch({
        type: SCORE,
        payload: randomScore(),
      });
    }, 50);
    setTimeout(() => {
      clearInterval(shuffle);
      const recentScore = randomScore();
      dispatch({
        type: SCORE,
        payload: recentScore,
      });
      dispatch({
        type: TOTAL_SCORE,
        payload: recentScore,
      });
    }, 1000);
  };

  useEffect(() => {
    dispatch({
      type: SCORE,
      payload: 0,
    });
  }, []);

  return (
    <Container fluid id="dummy" className={styles.dummy}>
      <ToastContainer theme="dark" />
      <MusicPlayer link="https://firebasestorage.googleapis.com/v0/b/pluto-games-10.appspot.com/o/bgm%2FProject%20DMM%20-%20Kimi%20Ni%20Dekiru%20Nanika.mp3?alt=media&token=b873dd6d-5dd5-44b0-ba75-72b38d300d24" />
      {currentUser ? (
        <Container className="d-flex align-items-center flex-column">
          <h2 className="text-white text-center">Shuffle Your Number</h2>
          <div className={styles.score}>{score}</div>

          <Button
            color="light"
            outline
            onClick={shuffleNumber}
            className="px-5 py-3"
          >
            Shuffle
          </Button>
        </Container>
      ) : (
        <div>
          <h1 className="text-white">Please Login Before Play</h1>
        </div>
      )}
    </Container>
  );
}