import {
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR
} from '../actions/types';

const initialState = {
    roleListings: [],
    roleListing: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action: any) {
    const { type, payload } = action;

    switch(type) {
        case GET_ROLE_LISTINGS:
            return {
                ...state,
                roleListings: payload,
                loading: false
            };
        case ROLE_LISTINGS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}