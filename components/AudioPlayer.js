import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Button } from "reactstrap";
import styles from "../styles/Audio.module.css";

function MusicPlayer({ link }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={
        styles.audioPlayer +
        " d-flex justify-content-center align-items-center bg-light rounded-circle p-2"
      }
    >
      <Button
        id="toggleAudio"
        className={styles.audioBtn + " rounded-circle"}
        outline
        color={toggle ? "danger" : "primary"}
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? (
          <i className="fa-solid fa-volume-xmark"></i>
        ) : (
          <i className="fa-solid fa-volume-up"></i>
        )}
      </Button>

      <ReactAudioPlayer
        src={link}
        autoPlay
        loop
        volume={0.2}
        muted={toggle ? true : false}
      />
    </div>
  );
}

export default MusicPlayer;
