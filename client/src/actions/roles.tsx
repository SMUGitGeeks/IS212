import axios from 'axios';
import {
    GET_ROLES,
    ROLES_ERROR,
} from './types';

// Get all roles
export const getRoles = () => async (dispatch: any) => {
    try {
        const res = await axios.get('/api/role/details')


        dispatch({
            type: GET_ROLES,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: ROLES_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}




