import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_ROLE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  role: "",
  access_token: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload.role,
        access_token: action.payload.data,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        role: "",
        access_token: "",
      };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
}