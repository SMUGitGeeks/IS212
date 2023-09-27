import {GET_ROLES, ROLES_ERROR} from '../actions/types';

import {ActionType} from "../types";

const initialState = {
    roles: [],
    role: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;

    switch (type) {
        case GET_ROLES:
            return {
                ...state,
                roles: payload,
                loading: false
            };
        case ROLES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}