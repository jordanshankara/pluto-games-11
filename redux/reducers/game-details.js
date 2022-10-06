import { FETCH, FETCH_SUCCESS, FETCH_FAIL } from "../actions/game-details";

const initialState = {
  state: null,
  loading: false,
  gameDetails: null,
  error: null,
};

function ReadGameDetails(state = initialState, action) {
  switch (action.type) {
    case FETCH: {
      return {
        ...state,
        loading: true,
        state: "LOADING",
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        state: "SUCCESS",
        gameDetails: action.payload,
        error: null,
      };
    }

    case FETCH_FAIL: {
      return {
        ...state,
        loading: false,
        state: "ERROR",
        gameDetails: null,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default ReadGameDetails;
