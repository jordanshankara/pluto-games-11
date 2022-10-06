import { PLAYED } from "../actions/history";

const initialState = {
  true: [],
};

function GamePlayed(state = initialState, action) {
  switch (action.type) {
    case PLAYED: {
      return {
        ...state,
        true: [...state.true, action.payload],
      };
    }

    default: {
      return state;
    }
  }
}

export default GamePlayed;
