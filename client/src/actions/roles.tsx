import axios from 'axios';
import {GET_ROLES, ROLES_ERROR,} from './types';
import {ActionType} from "../types";

export const getRoles = () => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/role/details')
        dispatch({
            type: GET_ROLES,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: ROLES_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}





