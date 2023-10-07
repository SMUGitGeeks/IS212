import {
    FILTER_STAFF_LISTINGS_BY_SKILL_ID,
    FILTER_STAFF_LISTINGS_BY_STAFF_ID,
    GET_STAFF_LISTING,
    GET_STAFF_LISTINGS,
    GET_STAFF_LISTINGS_BY_RL_ID,
    SORT_STAFF_LISTINGS_BY_FNAME,
    SORT_STAFF_LISTINGS_BY_LNAME,
    SORT_STAFF_LISTINGS_BY_SKILL_MATCH,
    STAFF_LISTINGS_ERROR,
    GET_STAFF_LISTING_BY_RL_ID_AND_STAFF_ID,
} from '../actions/types';
import {ActionType} from "../types";

const initialState = {
    staffListings: [],
    staffListingsByRLId: [],
    rawStaffListings: [],
    staffListing: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action: ActionType) {
    const {type, payload} = action;


    switch (type) {
        case GET_STAFF_LISTINGS:
            // check if staffListing is null
            if (state.staffListing === null) {
                return {
                    ...state,
                    staffListings: payload,
                    staffListing: payload[0],
                    rawStaffListings: payload,
                    loading: false
                };
            } else {
                return {
                    ...state,
                    staffListings: payload,
                    rawStaffListings: payload,
                    loading: false
                };
            }
        case GET_STAFF_LISTING:
            return {
                ...state,
                staffListing: payload,
                loading: false
            };
        case STAFF_LISTINGS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case SORT_STAFF_LISTINGS_BY_FNAME:
            let sortedStaffListings = action.payload.direction === "ascF" ?
                state.staffListings.sort((a: any, b: any) => (a.fname > b.fname) ? 1 : -1) :
                state.staffListings.sort((a: any, b: any) => (a.fname < b.fname) ? 1 : -1);
            return {
                ...state,
                staffListings: sortedStaffListings,
                rawStaffListings: sortedStaffListings,
            }
        case SORT_STAFF_LISTINGS_BY_LNAME:
            let sortedStaffListings2 = action.payload.direction === "ascL" ?
                state.staffListings.sort((a: any, b: any) => (a.lname > b.lname) ? 1 : -1) :
                state.staffListings.sort((a: any, b: any) => (a.lname < b.lname) ? 1 : -1);
            return {
                ...state,
                staffListings: sortedStaffListings2,
                rawStaffListings: sortedStaffListings2,
            }
        case FILTER_STAFF_LISTINGS_BY_STAFF_ID:
            // payload is an Array of role ids
            if (payload["staffIds"].length === 0) {
                return {
                    ...state,
                    staffListings: state.rawStaffListings
                }
            } else {
                let filteredStaffListings = state.rawStaffListings.filter((rawStaffListing: any) => payload["staffIds"].includes(rawStaffListing.staff_id));
                return {
                    ...state,
                    staffListings: filteredStaffListings,
                }
            }
        case FILTER_STAFF_LISTINGS_BY_SKILL_ID:
            // payload is an Array of skill ids
            if (payload["skillIds"].length === 0) {
                return {
                    ...state,
                    staffListings: state.rawStaffListings
                }
            } else {
                let filteredStaffListings = state.rawStaffListings.filter((rawStaffListing: any) => {
                        let skillIds = rawStaffListing.skills.map((skill: any) => skill.skill_id);
                        for (let i = 0; i < payload["skillIds"].length; i++) {
                            if (skillIds.includes(payload["skillIds"][i])) {
                                return true;
                            }
                        }
                        return false;
                    }
                );
                return {
                    ...state,
                    staffListings: filteredStaffListings,
                }
            }
        case GET_STAFF_LISTINGS_BY_RL_ID:
            return {
                ...state,
                staffListingsByRLId: payload,
                loading: false
            }
        case GET_STAFF_LISTING_BY_RL_ID_AND_STAFF_ID:
                const staffListing = state.staffListingsByRLId.filter((staffListing: any) => staffListing.staff_id === payload);
            return {
                ...state,
                staffListing: staffListing,
                loading: false
            };
        case SORT_STAFF_LISTINGS_BY_SKILL_MATCH:
            let sortedStaffListingsBySkillMatch = state.staffListingsByRLId.sort((a: any, b: any) => (a.skill_match < b.skill_match) ? 1 : -1);
            return {
                ...state,
                staffListings: sortedStaffListingsBySkillMatch,
                rawStaffListings: sortedStaffListingsBySkillMatch,
            }
        default:
            return state;
    }
}