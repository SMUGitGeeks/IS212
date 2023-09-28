import {
    FILTER_ROLE_LISTINGS_BY_ROLE_ID,
    GET_ROLE_LISTING,
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR,
    SORT_ROLE_LISTINGS_BY_DATE,
    SORT_ROLE_LISTINGS_BY_NAME
} from '../actions/types';
import {ActionType, RoleListingsType} from "../types";

const initialState = {
    roleListings: [],
    rawRoleListings: [],
    roleListing: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;


    switch (type) {
        case GET_ROLE_LISTINGS:
            return {
                ...state,
                roleListings: payload,
                rawRoleListings: payload,
                loading: false
            };
        case GET_ROLE_LISTING:
            return {
                ...state,
                roleListing: payload,
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
                state.roleListings.sort((a: RoleListingsType, b: RoleListingsType) => (a.role_name > b.role_name) ? 1 : -1) :
                state.roleListings.sort((a: RoleListingsType, b: RoleListingsType) => (a.role_name < b.role_name) ? 1 : -1);
            return {
                ...state,
                roleListings: sortedRoleListings,
                rawRoleListings: sortedRoleListings,
            }
        case FILTER_ROLE_LISTINGS_BY_ROLE_ID:
            // payload is an Array of role ids
            if (payload["roleIds"].length === 0) {
                return {
                    ...state,
                    roleListings: state.rawRoleListings
                }
            } else {
                let filteredRoleListings = state.rawRoleListings.filter((rawRoleListing: RoleListingsType) => payload["roleIds"].includes(rawRoleListing.role_id));
                return {
                    ...state,
                    roleListings: filteredRoleListings,
                }
            }
        case SORT_ROLE_LISTINGS_BY_DATE:
            let sortedRoleListingsByDate = state.roleListings.sort((a: RoleListingsType, b: RoleListingsType) => (a.rl_open < b.rl_open) ? 1 : -1);
            return {
                ...state,
                roleListings: sortedRoleListingsByDate,
                rawRoleListings: sortedRoleListingsByDate,
            }
        default:
            return state;
    }
}