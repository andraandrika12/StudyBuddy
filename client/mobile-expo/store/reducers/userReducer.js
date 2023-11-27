import { FETCH_USER_PROFILE } from "../actions/actionTypes";
const initialState = {
    profileUser: {}
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_PROFILE:
            return {
                ...state,
                profileUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer
