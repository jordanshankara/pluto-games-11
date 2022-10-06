import { EDIT, PROFILE_PIC, USER, VIEW } from "../actions/profile";

const initialState = {
  user: "",
  profilePic: null,
  editToggle: false,
};

function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case PROFILE_PIC: {
      return {
        ...state,
        profilePic: action.payload,
      };
    }

    case EDIT: {
      return {
        ...state,
        editToggle: false,
      };
    }

    case VIEW: {
      return {
        ...state,
        editToggle: true,
      };
    }

    default: {
      return state;
    }
  }
}

export default ProfileReducer;
