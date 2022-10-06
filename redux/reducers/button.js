import { DONE, PROCESSING, STATIC } from "../actions/button";

const initialState = {
  process: "STATIC",
  load: false,
  color: "primary",
  text: "Submit",
};

function ButtonState(state = initialState, action) {
  switch (action.type) {
    case STATIC: {
      return initialState;
    }

    case PROCESSING: {
      return {
        ...state,
        process: "PROCESSING",
        load: true,
        color: "secondary",
        text: "Processing...",
      };
    }

    case DONE: {
      return {
        ...state,
        process: "DONE",
        load: true,
        color: "success",
        text: "Done!",
      };
    }

    default: {
      return state;
    }
  }
}

export default ButtonState;
