import { FETCH, FETCH_SUCCESS, FETCH_FAIL } from "../actions/games";

const initialState = {
  state: null,
  loading: false,
  gameData: null,
  error: null,
};

function ReadDatabase(state = initialState, action) {
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
        gameData: action.payload,
        error: null,
      };
    }

    case FETCH_FAIL: {
      return {
        ...state,
        loading: false,
        state: "ERROR",
        gameData: null,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default ReadDatabase;
