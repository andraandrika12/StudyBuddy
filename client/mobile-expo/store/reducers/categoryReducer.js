import { FETCH_CATEGORIES_SUCCESS } from "../actions/actionTypes";

const initialState = {
    categories: []
}

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}