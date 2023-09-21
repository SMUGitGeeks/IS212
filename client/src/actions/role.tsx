import axios from 'axios';
import {
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR
} from './types';

// Get all roles
export const getRoles = () => async (dispatch: any) => {
    try {
        const res = await axios.get('/api/role_listing/details');

        dispatch({
            type: GET_ROLE_LISTINGS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}