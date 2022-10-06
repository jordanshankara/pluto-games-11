import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import styles from "../../styles/Snake.module.css";
import { Button, Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
  BEGIN,
  DIRECTION,
  ENLARGE_SNAKE,
  RESTART,
  SNAKE,
  SPEED,
} from "../../redux/actions/snake-game";
import { TOTAL_SCORE } from "../../redux/actions/score";

function getRandomCoordinates() {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  return [x, y];
}

const ScoreBox = ({ score = 0 }) => {
  return (
    <div className="w-100 border border p-4">
      <h3 className="text-center text-white">{`Your Score: ${score}`}</h3>
    </div>
  );
};

const GameOver = ({ display, action }) => {
  return (
    <div
      className={styles.gameOver}
      style={{ display: `${display}` }}
      onClick={action}
    >
      <h3 className="text-center text-white">Click or Press Enter to Play</h3>
    </div>
  );
};

const Arrow = ({ direction, action }) => {
  return (
    <Col>
      <Button color="success" onClick={action} className={styles.arrowBtn}>
        <i className={`fa-solid fa-arrow-${direction}`}></i>
      </Button>
    </Col>
  );
};

class SnakeBox extends Component {
  state = {
    food: [0, 0],
  };
  componentDidMount() {
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  playNow = () => {
    toast.info("You can play with either keyboard or cursor button!");
    const intervalId = setInterval(this.moveSnake, this.props.snakeState.speed);
    this.props.dispatch({
      type: BEGIN,
      payload: intervalId,
    });
    this.setState({
      food: getRandomCoordinates(),
    });
  };

  changeDirection = (dir1, dir2) => {
    if (this.props.snakeState.direction !== dir1) {
      this.props.dispatch({
        type: DIRECTION,
        payload: dir2,
      });
    } else {
      this.props.dispatch({
        type: DIRECTION,
        payload: this.props.snakeState.direction,
      });
    }
  };

  toUp = (e) => {
    this.changeDirection("DOWN", "UP");
  };
  toLeft = (e) => {
    this.changeDirection("RIGHT", "LEFT");
  };
  toRight = (e) => {
    this.changeDirection("LEFT", "RIGHT");
  };
  toDown = (e) => {
    this.changeDirection("UP", "DOWN");
  };

  onKeyDown = (e) => {
    e.preventDefault();
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.changeDirection("DOWN", "UP");
        break;
      case 37:
        this.changeDirection("RIGHT", "LEFT");
        break;
      case 39:
        this.changeDirection("LEFT", "RIGHT");
        break;
      case 40:
        this.changeDirection("UP", "DOWN");
        break;
      case 13:
        if (this.props.snakeState.display === "flex") {
          this.playNow();
        }
        break;
      default:
    }
  };

  moveSnake = () => {
    let dots = [...this.props.snakeState.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.props.snakeState.direction) {
      case "RIGHT":
        head = [head[0] + 4, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 4, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 4];
        break;
      case "UP":
        head = [head[0], head[1] - 4];
        break;
      default:
    }
    dots.push(head);
    dots.shift();
    this.props.dispatch({
      type: SNAKE,
      payload: dots,
    });
  };

  checkIfOutOfBorders() {
    let head =
      this.props.snakeState.snakeDots[
        this.props.snakeState.snakeDots.length - 1
      ];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.props.snakeState.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head =
      this.props.snakeState.snakeDots[
        this.props.snakeState.snakeDots.length - 1
      ];
    let gameFood = this.state.food;
    if (head[0] === gameFood[0] && head[1] === gameFood[1]) {
      this.setState({
        food: getRandomCoordinates(),
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.props.snakeState.snakeDots];
    newSnake.unshift([]);
    let data = {
      snakeDots: newSnake,
      score: this.props.snakeState.score + 1,
    };

    this.props.dispatch({
      type: ENLARGE_SNAKE,
      payload: data,
    });
  }

  increaseSpeed() {
    if (this.props.snakeState.speed > 10) {
      this.props.dispatch({
        type: SPEED,
        payload: this.props.snakeState.speed - 10,
      });
    } else if (
      this.props.snakeState.speed > 5 &&
      this.props.snakeState.speed <= 10
    ) {
      this.props.dispatch({
        type: SPEED,
        payload: this.props.snakeState.speed - 1,
      });
    }
  }

  onGameOver() {
    clearInterval(this.props.snakeState.interval);
    this.props.dispatch({
      type: RESTART,
    });
    this.setState({
      food: [0, 0],
    });
    this.props.dispatch({
      type: TOTAL_SCORE,
      payload: this.props.snakeState.score,
    });
    toast.info(`Your Score: ${this.props.snakeState.score}`);
  }

  render() {
    return (
      <div className={styles.snakeBox}>
        <div className={styles.gameArea + " mb-4"}>
          <Snake snakeDots={this.props.snakeState.snakeDots} />
          <Food dot={this.state.food} />
          <GameOver
            display={this.props.snakeState.display}
            action={this.playNow}
          />
        </div>
        <div className={styles.cursorBox}>
          <Row>
            <Col></Col>
            <Arrow direction="up" action={this.toUp} />
            <Col></Col>
          </Row>
          <Row>
            <Arrow direction="left" action={this.toLeft} />
            <Col></Col>
            <Arrow direction="right" action={this.toRight} />
          </Row>
          <Row>
            <Col></Col>
            <Arrow direction="down" action={this.toDown} />
            <Col></Col>
          </Row>
        </div>
        <ScoreBox score={this.props.snakeState.score} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snakeState: state.snakeGame,
});

export default connect(mapStateToProps)(SnakeBox);
