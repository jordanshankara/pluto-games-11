import { SCORE } from "../actions/dummy";

const initialState = {
  score: 0,
};

function DummyGame(state = initialState, action) {
  switch (action.type) {
    case SCORE: {
      return {
        ...state,
        score: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default DummyGame;
