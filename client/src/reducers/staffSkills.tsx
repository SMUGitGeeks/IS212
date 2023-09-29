import {GET_STAFF_SKILLS_BY_STAFF_ID, STAFF_SKILLS_ERROR} from '../actions/types';

import {ActionType} from "../types";

const initialState = {
    staffSkills: [],
    staffSkill: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;

    switch (type) {
        case GET_STAFF_SKILLS_BY_STAFF_ID:
            return {
                ...state,
                staffSkill: payload,
                loading: false
            };
        case STAFF_SKILLS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}