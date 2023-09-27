import {
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR, SORT_ROLE_LISTINGS_BY_NAME, FILTER_ROLE_LISTINGS_BY_ROLE_ID
} from '../actions/types';

const initialState = {
    roleListings: [],
    rawRoleListings: [],
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
                rawRoleListings: payload,
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
                rawRoleListings: sortedRoleListings,
            }
        case FILTER_ROLE_LISTINGS_BY_ROLE_ID:
            // payload is an Array of role ids
            if (payload["roleIds"].length === 0 ){
                return {
                    ...state,
                    roleListings: state.rawRoleListings
            }
            }
            else {
            let filteredRoleListings = state.rawRoleListings.filter((rawRoleListing: any) => payload["roleIds"].includes(rawRoleListing.role_id));
            return {
                ...state,
                roleListings: filteredRoleListings,
            }}
        default:
            return state;
    }
}