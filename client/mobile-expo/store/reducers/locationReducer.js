import { FETCH_LOCATIONS_SUCCESS } from "../actions/actionTypes";

const initialState = {
    locations: []
}

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.payload
            }
        default:
            return state;
    }
}