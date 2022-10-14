import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Button } from "reactstrap";
import styles from "../styles/Audio.module.css";

function MusicPlayer({ link }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={
        styles.audioPlayer +
        " d-flex justify-content-center align-items-center rounded bg-white px-2"
      }
      style={{ width: `${toggle ? "50px" : "fit-content"}` }}
    >
      <Button
        className="rounded"
        outline
        color={toggle ? "primary" : "danger"}
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? (
          <i className="fa-solid fa-caret-right"></i>
        ) : (
          <i className="fa-solid fa-caret-left"></i>
        )}
      </Button>
      <span
        className="ms-2"
        style={{ display: `${toggle ? "none" : "block"}` }}
      >
        BGM
      </span>
      <ReactAudioPlayer
        style={{ opacity: `${toggle ? 0 : 1}` }}
        src={link}
        autoPlay
        controls
        loop
        volume={0.3}
      />
    </div>
  );
}

export default MusicPlayer;
