import {GET_STAFF_LISTING, GET_STAFF_LISTINGS, STAFF_LISTINGS_ERROR,} from '../actions/types';
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
        default:
            return state;
    }
}