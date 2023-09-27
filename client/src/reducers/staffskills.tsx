import {
    GET_STAFF_SKILLS,
    STAFF_SKILLS_ERROR
} from '../actions/types';

const initialState = {
    staffSkills: [],
    staffSkill: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action: any) {
    const { type, payload } = action;

    switch(type) {
        case GET_STAFF_SKILLS:
            return {
                ...state,
                staffSkills: payload,
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