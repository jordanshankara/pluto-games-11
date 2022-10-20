import { FETCH, FETCH_SUCCESS, FETCH_FAIL } from "../actions/game-details";

const initialState = {
  gameDetails: null,
};

function ReadGameDetails(state = initialState, action) {
  switch (action.type) {
    case FETCH: {
      return {
        ...state,
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        gameDetails: action.payload,
      };
    }

    case FETCH_FAIL: {
      return {
        ...state,
        gameDetails: null,
      };
    }

    default: {
      return state;
    }
  }
}

export default ReadGameDetails;
