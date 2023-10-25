import {
    FILTER_ROLE_LISTINGS_BY_DEPARTMENT,
    FILTER_ROLE_LISTINGS_BY_LOCATION,
    FILTER_ROLE_LISTINGS_BY_ROLE_ID,
    GET_ROLE_LISTING,
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR,
    SORT_ROLE_LISTINGS_BY_DATE,
    SORT_ROLE_LISTINGS_BY_NAME,
    SORT_ROLE_LISTINGS_BY_SKILL_MATCH,
    POST_ROLE_LISTING,
} from '../actions/types';
import {ActionType, RoleListingsType} from "../types";

const initialState = {
    roleListings: [],
    rawRoleListings: [],
    roleListing: null,
    loading: true,
    error: {},
    hrRoleListings: [],
    hrRoleListing: null,
    filters: {"role": [], "location": [], "department": []}
}

export const handleFiltering = (rawRoleListings: any, filters: any) => {
    let filteredRoleListings = rawRoleListings;
    let roleOptions: number[] = filters["role"];
    let locationOptions: string[] = filters["location"];
    let departmentOptions: string[] = filters["department"];
    if (roleOptions.length > 0) {
        filteredRoleListings = filteredRoleListings.filter((filteredRoleListing: RoleListingsType) => roleOptions.includes(filteredRoleListing.role_id));
    }
    if (locationOptions.length > 0) {
        filteredRoleListings = filteredRoleListings.filter((filteredRoleListing: RoleListingsType) => locationOptions.includes(filteredRoleListing.location));
    }
    if (departmentOptions.length > 0) {
        filteredRoleListings = filteredRoleListings.filter((filteredRoleListing: RoleListingsType) => departmentOptions.includes(filteredRoleListing.department));
    }
    return filteredRoleListings;
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;
    const aggregateFilters = (filter: string, options: []) => {
        switch (filter) {
            case "role":
                state.filters["role"] = options;
                break;
            case "location":
                state.filters["location"] = options;
                break;
            case "department":
                state.filters["department"] = options;
                break;
        }
    }


    switch (type) {
        case GET_ROLE_LISTINGS:
            return {
                ...state,
                roleListings: payload,
                roleListing: payload[0],
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
            };
        case FILTER_ROLE_LISTINGS_BY_ROLE_ID:
            aggregateFilters("role", payload["roleIds"]);
            let filteredRoleListingsByRoleId = handleFiltering(state.rawRoleListings, state.filters);
            return {
                ...state,
                roleListings: filteredRoleListingsByRoleId,
            }
        case FILTER_ROLE_LISTINGS_BY_LOCATION:
            aggregateFilters("location", payload["locations"]);
            let filteredRoleListingsByLocation = handleFiltering(state.rawRoleListings, state.filters);
            return {
                ...state,
                roleListings: filteredRoleListingsByLocation,
            }
        case FILTER_ROLE_LISTINGS_BY_DEPARTMENT:
            aggregateFilters("department", payload["departments"]);
            let filteredRoleListingsByDepartment = handleFiltering(state.rawRoleListings, state.filters);
            return {
                ...state,
                roleListings: filteredRoleListingsByDepartment,
            }
        case SORT_ROLE_LISTINGS_BY_DATE:
            let sortedRoleListingsByDate = state.roleListings.sort((a: RoleListingsType, b: RoleListingsType) => (a.rl_open < b.rl_open) ? 1 : -1);
            return {
                ...state,
                roleListings: sortedRoleListingsByDate,
                rawRoleListings: sortedRoleListingsByDate,
            };
        case SORT_ROLE_LISTINGS_BY_SKILL_MATCH:
            let sortedRoleListingsBySkillMatch = state.roleListings.sort((a: RoleListingsType, b: RoleListingsType) => (a.skill_match < b.skill_match) ? 1 : -1);
            return {
                ...state,
                roleListings: sortedRoleListingsBySkillMatch,
                rawRoleListings: sortedRoleListingsBySkillMatch,
            };
        case POST_ROLE_LISTING:
            return {
                ...state,
                roleListings: [...state.roleListings, payload],
                rawRoleListings: [...state.rawRoleListings, payload],
                loading: false
            }
        default:
            return state;
    }
}