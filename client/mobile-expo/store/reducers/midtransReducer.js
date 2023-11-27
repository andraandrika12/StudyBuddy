import { FETCH_REDIRECT_URL } from "../actions/actionTypes";

const initialState = {
    urlRedirect: ""
}

export default function midtransReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REDIRECT_URL:
            return {
                ...state,
                urlRedirect: action.payload.redirect_url
            }
        default:
            return state;
    }
}