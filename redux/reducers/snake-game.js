import {
  BEGIN,
  DIRECTION,
  ENLARGE_SNAKE,
  // FOOD_POSITION,
  RESTART,
  SNAKE,
  SPEED,
} from "../actions/snake-game";

const initialState = {
  // food: [96, 96],
  speed: 200,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [4, 0],
  ],
  interval: "",
  display: "flex",
  score: 0,
};

function SnakeReducers(state = initialState, action) {
  switch (action.type) {
    case RESTART: {
      return {
        // food: [96, 96],
        speed: 200,
        direction: "RIGHT",
        snakeDots: [
          [0, 0],
          [4, 0],
        ],
        interval: "",
        display: "flex",
      };
    }

    case BEGIN: {
      return {
        ...state,
        // food: action.payload.food,
        interval: action.payload,
        display: "none",
        score: 0,
      };
    }

    case DIRECTION: {
      return {
        ...state,
        direction: action.payload,
      };
    }

    case SNAKE: {
      return {
        ...state,
        snakeDots: action.payload,
      };
    }
    // case FOOD_POSITION: {
    //   return {
    //     ...state,
    //     food: action.payload,
    //   };
    // }
    case ENLARGE_SNAKE: {
      return {
        ...state,
        snakeDots: action.payload.snakeDots,
        score: action.payload.score,
      };
    }
    case SPEED: {
      return {
        ...state,
        speed: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default SnakeReducers;
