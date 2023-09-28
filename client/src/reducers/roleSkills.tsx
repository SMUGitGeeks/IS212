import {
    GET_ROLE_SKILLS_BY_ROLE_ID,
    ROLE_SKILLS_ERROR
} from '../actions/types';

const initialState = {
    roleSkills: [],
    roleSkill: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action: any) {
    const { type, payload } = action;

    switch(type) {
        case GET_ROLE_SKILLS_BY_ROLE_ID:
            return {
                ...state,
                roleSkills: payload,
                loading: false
            };
        case ROLE_SKILLS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}