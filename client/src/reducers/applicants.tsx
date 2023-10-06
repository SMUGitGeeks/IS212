import {GET_APPLICANTS_BY_ROLE_LISTING_ID, APPLICANTS_ERROR} from '../actions/types';

import {ActionType} from "../types";

const initialState = {
    applicants: [],
    applicant: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;

    switch (type) {
        case GET_APPLICANTS_BY_ROLE_LISTING_ID:
            return {
                ...state,
                applicants: payload,
                loading: false
            };
        case APPLICANTS_ERROR:
            return {
                ...state,
                error: payload,
                applicants: [],
                loading: false
            }
        default:
            return state;
    }
}