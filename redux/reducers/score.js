import { TOTAL_SCORE } from "../actions/score";

const initialState = {
  score: 0,
};

function TotalScore(state = initialState, action) {
  switch (action.type) {
    case TOTAL_SCORE: {
      return {
        ...state,
        score: state.score + action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default TotalScore;
