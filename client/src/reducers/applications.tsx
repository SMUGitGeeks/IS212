import {APPLICATIONS_ERROR, GET_APPLICATIONS_BY_STAFF_ID, GET_APPLICATION_BY_STAFF_ID_AND_RL_ID} from '../actions/types';

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
        case GET_APPLICATION_BY_STAFF_ID_AND_RL_ID:
            const application = state.applications.filter((application: any) => application.rl_id === payload);
            return {
                ...state,
                application: application,
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