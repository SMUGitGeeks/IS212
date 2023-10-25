import {LOGIN_ERROR, LOGIN_HR, LOGIN_STAFF, LOGOUT} from './types';
import {ActionType} from "../types";

export const loginStaff = () => async (dispatch: (action: ActionType) => void) => {
    try {
        dispatch({
            type: LOGIN_STAFF,
            payload: 3
        });
    } catch (err: any) {
        dispatch({
            type: LOGIN_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}

export const loginHR = () => async (dispatch: (action: ActionType) => void) => {
    try {
        dispatch({
            type: LOGIN_HR,
            payload: 1
        });
    } catch (err: any) {
        dispatch({
            type: LOGIN_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}

export const logout = () => async (dispatch: (action: ActionType) => void) => {
    try {
        dispatch({
            type: LOGOUT,
            payload: "logout"
        });
    } catch (err: any) {
        dispatch({
            type: LOGIN_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}