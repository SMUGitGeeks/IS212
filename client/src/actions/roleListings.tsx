import axios from 'axios';
import {
    FILTER_ROLE_LISTINGS_BY_ROLE_ID,
    GET_ROLE_LISTINGS,
    GET_ROLE_LISTING,
    ROLE_LISTINGS_ERROR,
    SORT_ROLE_LISTINGS_BY_DATE,
    SORT_ROLE_LISTINGS_BY_NAME
} from './types';
import {ActionType, FilterRoleListingsByRoleIdPayloadType, SortPayloadType} from "../types";

// Get all roles listings
export const getRoleListings = () => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/role_listing/details')
        const res2 = await axios.get('/api/role/details');
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                    res.data[i].role_description = res2.data[j].role_description;
                    res.data[i].role_status = res2.data[j].role_status;
                }
            }
        }


        dispatch({
            type: GET_ROLE_LISTINGS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getRoleListing = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get(`/api/role_listing/details/${id}`);
        const res2 = await axios.get('/api/role/details');
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                    res.data[i].role_description = res2.data[j].role_description;
                    res.data[i].role_status = res2.data[j].role_status;
                }
            }
        }

        dispatch({
            type: GET_ROLE_LISTING,
            payload: res.data[0]
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const sortRoleListingsByName = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_ROLE_LISTINGS_BY_NAME,
        payload
    });
}

export const filterRoleListingsByRoleId = (payload: FilterRoleListingsByRoleIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_ROLE_LISTINGS_BY_ROLE_ID,
        payload
    });
}

export const sortRoleListingsByDate = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_ROLE_LISTINGS_BY_DATE,
        payload
    });
}




