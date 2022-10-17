import { ADD_URL, CROP, EDIT, SCALE, USER, VIEW } from "../actions/profile";

const initialState = {
  user: "",
  editToggle: false,
  modal: false,
  pictureURL: "",
  scaleValue: 1,
};

function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case USER: {
      return {
        ...state,
        user: action.payload,
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

    case CROP: {
      return {
        ...state,
        modal: action.payload,
      };
    }
    case ADD_URL: {
      return {
        ...state,
        pictureURL: action.payload,
      };
    }

    case SCALE: {
      return {
        ...state,
        scaleValue: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default ProfileReducer;
