import {APPLICATIONS_ERROR, GET_APPLICATIONS_BY_STAFF_ID} from '../actions/types';

import {ActionType} from "../types";

const initialState = {
    applications: [],
    application: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;

    switch (type) {
        case GET_APPLICATIONS_BY_STAFF_ID:
            return {
                ...state,
                applications: payload,
                loading: false
            };
        case APPLICATIONS_ERROR:
            return {
                ...state,
                error: payload,
                applications: [],
                loading: false
            }
        default:
            return state;
    }
}