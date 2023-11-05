import axios from 'axios';
import {APPLICATIONS_ERROR, GET_APPLICATIONS_BY_STAFF_ID, GET_APPLICATION_BY_STAFF_ID_AND_RL_ID} from './types';
import {ActionType, GetApplicationsByStaffIdPayloadType, PostApplicationPayloadType, UploadApplicationPayloadType} from "../types";

export const getApplicationsByStaffId = (payload: GetApplicationsByStaffIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        const list_of_applications_by_staff_id = await axios.get('/api/staff/application/' + payload)
        if (list_of_applications_by_staff_id.data.length === 0) {
        }
        for (let i = 0; i < list_of_applications_by_staff_id.data.length; i++) {
            const list_of_all_role_listing_details = await axios.get('/api/role_listing/details')
            const list_of_all_role_details = await axios.get('/api/role/details');
            for (let i = 0; i < list_of_all_role_listing_details.data.length; i++) {
                for (let j = 0; j < list_of_all_role_details.data.length; j++) {
                    if (list_of_all_role_listing_details.data[i]["role_id"] === list_of_all_role_details.data[j]["role_id"]) {
                        list_of_all_role_listing_details.data[i].role_name = list_of_all_role_details.data[j].role_name;
                        list_of_all_role_listing_details.data[i].role_description = list_of_all_role_details.data[j].role_description;
                        list_of_all_role_listing_details.data[i].role_status = list_of_all_role_details.data[j].role_status;
                    }
                }
            }
            for (let j = 0; j < list_of_all_role_listing_details.data.length; j++) {
                if (list_of_applications_by_staff_id.data[i]["rl_id"] === list_of_all_role_listing_details.data[j]["rl_id"]) {
                    list_of_applications_by_staff_id.data[i].role_name = list_of_all_role_listing_details.data[j].role_name;
                }
            }
        }
        dispatch({
            type: GET_APPLICATIONS_BY_STAFF_ID,
            payload: list_of_applications_by_staff_id.data
        });
    } catch (err: any) {
        if (err.response?.status === 404) {
            dispatch({
                type: GET_APPLICATIONS_BY_STAFF_ID,
                payload: []
            });
        } else {
            dispatch({
                type: APPLICATIONS_ERROR,
                payload: {msg: err.response?.statusText, status: err.response?.status}
            });
        }
    }
}

export const getApplicationByStaffIdAndRLId = (rl_id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        dispatch({
            type: GET_APPLICATION_BY_STAFF_ID_AND_RL_ID,
            payload: rl_id,
        });
    } catch (err: any) {
        dispatch({
            type: APPLICATIONS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}



export const postApplication = (payload: PostApplicationPayloadType) => async (dispatch: (action: ActionType) => void) => {
    // post data retrieved from frontend with data retrieved from the frontend
    try {
        console.log("got clicked")
        
        // let payload = {"rl_id": 1,
        // "staff_id":1,                 // staff_id here has a different convention from the usual staffId used in payload
        // "role_app_status": "applied"
        // }
        console.log(payload)
        const list_of_applications_by_staff_id = await axios.post('/api/staff/application/', payload)

        
    } catch (err: any) {
        dispatch({
            type: APPLICATIONS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }

}

export const updateApplication = (payload: UploadApplicationPayloadType ) => async (dispatch: (action: ActionType) => void) => {
    // post data retrieved from frontend with data retrieved from the frontend
    try {
        console.log("got clicked")
        
        // let payload = {"rl_id": 3,
        // "staff_id":3,                 // staff_id here has a different convention from the usual staffId used in payload
        // "role_app_status": "applied",
        // "app_text": "Hello word"
        // }
        console.log(payload)
        const {rl_id, staff_id} = payload;
        console.log("role_id: "+ rl_id)
        console.log("staff_id: "+ staff_id)
        const list_of_applications_by_staff_id = await axios.put(`/api/staff/application/${rl_id}/${staff_id}`, payload)

        
    } catch (err: any) {
        dispatch({
            type: APPLICATIONS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }

}

