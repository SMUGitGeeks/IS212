import {
    GET_STAFF_LISTING,
    GET_STAFF_LISTINGS,
    SORT_STAFF_LISTINGS_BY_FNAME,
    SORT_STAFF_LISTINGS_BY_LNAME,
    STAFF_LISTINGS_ERROR,
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
            return {
                ...state,
                staffListings: payload,
                staffListing: payload[0],
                rawStaffListings: payload,
                loading: false
            };
        case GET_STAFF_LISTING:
            return {
                ...state,
                roleListing: payload,
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
        default:
            return state;
    }
}