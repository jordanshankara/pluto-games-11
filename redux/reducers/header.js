import { TOGGLE } from "../actions/header";

const initialState = {
  isOpen: false,
};

function NavbarToggle(state = initialState, action) {
  switch (action.type) {
    case TOGGLE: {
      return {
        ...state,
        isOpen: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default NavbarToggle;
