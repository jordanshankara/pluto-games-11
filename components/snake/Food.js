import React from "react";
import styles from "../../styles/Snake.module.css";

const Food = (props) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };

  return <div className={styles.snakeFood} style={style}></div>;
};

export default Food;
