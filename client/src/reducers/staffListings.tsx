import {
    FILTER_STAFF_LISTINGS_BY_SKILL_ID,
    FILTER_STAFF_LISTINGS_BY_STAFF_ID,
    FILTER_STAFF_LISTINGS_BY_DEPARTMENT,
    GET_STAFF_LISTING,
    GET_STAFF_LISTINGS,
    SORT_STAFF_LISTINGS_BY_FNAME,
    SORT_STAFF_LISTINGS_BY_LNAME,
    STAFF_LISTINGS_ERROR,
    // CLEAR_ALL_STAFF_LISTINGS_FILTERS
} from '../actions/types';
import {ActionType} from "../types";

const initialState = {
    staffListings: [],
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
            }
            else {
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
            if (payload["staffIds"] === undefined || payload["staffIds"].length === 0) {
                return {
                    ...state,
                    staffListings: state.rawStaffListings
                }
            } else {
                let filteredStaffListings = state.rawStaffListings.filter((rawStaffListing: any) => payload["staffIds"] === (rawStaffListing.staff_id));
                return {
                    ...state,
                    staffListings: filteredStaffListings,
                }
            }
        // case FILTER_STAFF_LISTINGS_BY_SKILL_ID:
        //     // payload is an Array of skill ids
        //     if (payload["skillIds"].length === 0) {
        //         return {
        //             ...state,
        //             staffListings: state.rawStaffListings
        //         }
        //     } else {
        //         let filteredStaffListings = state.rawStaffListings.filter((rawStaffListing: any) => {
        //                 let skillIds = rawStaffListing.skills.map((skill: any) => skill.skill_id);
        //                 // check that all payload skill ids are in the skillIds array
        //                 for (let i = 0; i < payload["skillIds"].length; i++) {
        //                     if (!skillIds.includes(payload["skillIds"][i])) {
        //                         return false;
        //                     }
        //                 }
                        
        //                 return true;
        //             }
        //         );
        //         return {
        //             ...state,
        //             staffListings: filteredStaffListings,
        //         }
        //     }
        case FILTER_STAFF_LISTINGS_BY_SKILL_ID:
            // payload is an Array of skill ids
            if (payload["skillIds"].length === 0) {
                return {
                ...state,
                staffListings: state.rawStaffListings
                };
            } else {
                let filteredStaffListings = state.rawStaffListings.filter((rawStaffListing: any) => {
                let skillIds = rawStaffListing.skills.map((skill: any) => skill.skill_id);
                
                // Check that all payload skill ids are in the skillIds array
                const allSkillIdsIncluded = payload["skillIds"].every((selectedSkillId: any) =>
                    skillIds.includes(selectedSkillId)
                );
                
                // Check that all skills have 'skill_status' set to 'active'
                const allSkillsActive = rawStaffListing.skills.every(
                    (skill: any) => skill.ss_status === 'active'
                );
                
                return allSkillIdsIncluded && allSkillsActive;
                });
                
                return {
                ...state,
                staffListings: filteredStaffListings,
                };
            }
        
        case FILTER_STAFF_LISTINGS_BY_DEPARTMENT:
            // payload is an Array of department names
            if (payload["dept"] === undefined || payload["dept"].length === 0) {
                return {
                    ...state,
                    staffListings: state.rawStaffListings
                }
            } else {
                let filteredStaffListings = state.rawStaffListings.filter((rawStaffListing: any) => payload["dept"] === (rawStaffListing.dept));
                return {
                    ...state,
                    staffListings: filteredStaffListings,
                }
            }
        // case CLEAR_ALL_STAFF_LISTINGS_FILTERS:
        //     return {
        //         ...state,
        //         staffListings: state.rawStaffListings,
        //     }
        default:
            return state;
    }
}