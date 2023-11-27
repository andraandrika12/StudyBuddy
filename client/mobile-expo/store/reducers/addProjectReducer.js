import { ADD_PROJECT_SUCCESS } from "../actions/actionTypes";

const initialState = {
  role: "",
  access_token: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
      };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          role: "",
          access_token: "",
        };
    default:
      return state;
  }
}
