import axios from 'axios';
import {
    LOGIN_STAFF,
    LOGIN_HR,
    LOGIN_ERROR,
    LOGOUT
} from './types';

// Get all roles
export const loginStaff = () => async (dispatch: any)  => {
    try {
        dispatch({
            type: LOGIN_STAFF,
            payload: 3
        });
    } catch (err: any) {
        dispatch({
            type: LOGIN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const loginHR = () => async (dispatch: any)  => {
    try {
        dispatch({
            type: LOGIN_HR,
            payload: 1
        });
    } catch (err: any) {
        dispatch({
            type: LOGIN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const logout = () => async (dispatch: any)  => {
    try {
        dispatch({
            type: LOGOUT,
            payload: "logout"
        });
    } catch (err: any) {
        dispatch({
            type: LOGIN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}