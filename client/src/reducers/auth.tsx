import {LOGIN_ERROR, LOGIN_HR, LOGIN_STAFF, LOGOUT} from '../actions/types';

import {ActionType} from "../types";

const initialState = {
    user: null,
    loading: true,
    error: {},
    isHR: false,
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_STAFF:
            return {
                ...state,
                user: payload,
                loading: false,
                isHR: false
            };
        case LOGIN_HR:
            return {
                ...state,
                user: payload,
                loading: false,
                isHR: true
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                isHR: false
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