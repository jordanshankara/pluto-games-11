import {
  CHOICE,
  COMPUTER,
  DETERMINER,
  PLAYER,
  START,
  WIN,
} from "../actions/rps";

const initialState = {
  playerAction: "",
  computerAction: "",
  playerScore: 0,
  winner: "start",
  choice: [],
};

function RpsState(state = initialState, action) {
  switch (action.type) {
    case START: {
      return {
        playerAction: "",
        computerAction: "",
        playerScore: 0,
        winner: "start",
        choice: [],
      };
    }

    case DETERMINER: {
      return {
        ...state,
        playerScore: action.payload,
      };
    }

    case PLAYER: {
      return {
        ...state,
        playerAction: action.payload,
      };
    }

    case COMPUTER: {
      return {
        ...state,
        computerAction: action.payload,
      };
    }
    case WIN: {
      return {
        ...state,
        winner: action.payload,
      };
    }
    case CHOICE: {
      return {
        ...state,
        choice: [...state.choice, action.payload],
      };
    }

    default: {
      return state;
    }
  }
}

export default RpsState;
