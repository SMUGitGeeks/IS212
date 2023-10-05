import {GET_SKILLS, SKILLS_ERROR} from '../actions/types';

import {ActionType} from "../types";

const initialState = {
    skills: [],
    skill: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;

    switch (type) {
        case GET_SKILLS:
            return {
                ...state,
                skills: payload,
                loading: false
            };
        case SKILLS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}