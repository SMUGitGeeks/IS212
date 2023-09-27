import {
    GET_ROLES,
    ROLE_ERROR
} from '../actions/types';

const initialState = {
    roles: [],
    role: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action: any) {
    const { type, payload } = action;

    switch(type) {
        case GET_ROLES:
            return {
                ...state,
                roles: payload,
                loading: false
            };
        case ROLE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}