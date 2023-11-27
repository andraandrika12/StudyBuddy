import { FETCH_PROJECTS, FETCH_PROJECTS_BY_ID } from "../actions/actionTypes";

const initialState = {
  projects: [],
  project: [],
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
      case FETCH_PROJECTS_BY_ID:
        return {
        ...state,
        project: action.payload,
        };
    default:
      return state;
  }
}
