import {
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR, SORT_ROLE_LISTINGS_BY_NAME
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
        case SORT_ROLE_LISTINGS_BY_NAME:
            let sortedRoleListings = action.payload.direction === "asc" ?
                state.roleListings.sort((a: any, b: any) => (a.role_name > b.role_name) ? 1 : -1) :
                state.roleListings.sort((a: any, b: any) => (a.role_name < b.role_name) ? 1 : -1);
            return {
                ...state,
                roleListings: sortedRoleListings,
            }
        default:
            return state;
    }
}