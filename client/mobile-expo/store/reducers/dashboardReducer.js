import {
  FETCH_DASHBOARD_STUDENT,
  FETCH_DASHBOARD_TEACHER,
} from "../actions/actionTypes";

const initialState = {
  dataStudent: {},
  dataTeacher: {},
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_STUDENT:
      return {
        ...state,
        dataStudent: action.payload,
      };
    case FETCH_DASHBOARD_TEACHER:
      return {
        ...state,
        dataTeacher: action.payload,
      };
    default:
      return state;
  }
}
