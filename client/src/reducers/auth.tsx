import {
    LOGIN_STAFF,
    LOGIN_HR,
    LOGOUT,
    LOGIN_ERROR
} from '../actions/types';

const initialState = {
    user: "",
    loading: true,
    error: {}
}

export default function(state = initialState, action: any) {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_STAFF:
            return {
                ...state,
                user: payload,
                loading: false
            };
        case LOGIN_HR:
            return {
                ...state,
                user: payload,
                loading: false
            };
        case LOGOUT:
            return {
                ...state,
                user: "",
                loading: false
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
}