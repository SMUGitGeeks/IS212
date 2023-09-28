import axios from 'axios';
import {GET_APPLICATIONS_BY_STAFF_ID, APPLICATIONS_ERROR} from './types';
import {ActionType, GetApplicationsByStaffIdPayloadType} from "../types";


// Get all skills
export const getApplicationsByStaffId = (payload: GetApplicationsByStaffIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        console.log(payload);
        const res = await axios.get('/api/staff/application/' + payload)
        // if no application
        if (res.data.length === 0) {
        }
        for (let i = 0; i < res.data.length; i++) {
            const res2 = await axios.get('/api/role_listing/details')
            const res3 = await axios.get('/api/role/details');
            for (let i = 0; i < res2.data.length; i++) {
                for (let j = 0; j < res3.data.length; j++) {
                    if (res2.data[i]["role_id"] === res3.data[j]["role_id"]) {
                        res2.data[i].role_name = res3.data[j].role_name;
                        res2.data[i].role_description = res3.data[j].role_description;
                        res2.data[i].role_status = res3.data[j].role_status;
                    }
                }
            }
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["rl_id"] === res2.data[j]["rl_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                }
            }
        }
        dispatch({
            type: GET_APPLICATIONS_BY_STAFF_ID,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: APPLICATIONS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

