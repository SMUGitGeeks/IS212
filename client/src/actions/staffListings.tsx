import axios from 'axios';
import {GET_STAFF_LISTING, GET_STAFF_LISTINGS, STAFF_LISTINGS_ERROR,} from './types';
import {ActionType} from "../types";

// Get all roles listings
export const getStaffListings = () => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/staff/details')
        dispatch({
            type: GET_STAFF_LISTINGS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getStaffListing = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get(`/api/staff/details/${id}`);

        dispatch({
            type: GET_STAFF_LISTING,
            payload: res.data[0]
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}




