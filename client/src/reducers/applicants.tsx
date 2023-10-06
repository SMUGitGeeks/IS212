import {GET_APPLICANTS_BY_ROLE_LISTING_ID, APPLICANTS_ERROR, GET_APPLICANT_BY_STAFF_ID, APPLICANT_ERROR} from '../actions/types';

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
            };
        case GET_APPLICANT_BY_STAFF_ID:
            return {
                ...state,
                applicant: payload,
                loading: false
            };
        case APPLICANT_ERROR:
            return {
                ...state,
                error: payload,
                applicant: null,
                loading: false
            };
        default:
            return state;
    }
}