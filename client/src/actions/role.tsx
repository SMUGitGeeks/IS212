import axios from 'axios';
import {
    GET_ROLES,
    ROLE_ERROR
} from './types';

// Get all roles
export const getRoles = () => async (dispatch: any) => {
    try {
        const res = await axios.get('/api/roles');

        dispatch({
            type: GET_ROLES,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}