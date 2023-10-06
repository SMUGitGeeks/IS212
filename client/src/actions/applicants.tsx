import axios from 'axios';
import {GET_APPLICANTS_BY_ROLE_LISTING_ID, APPLICANTS_ERROR, GET_APPLICANT_BY_STAFF_ID, APPLICANT_ERROR} from './types';
import {ActionType, GetApplicantsByRoleListingIdPayloadType} from "../types";


// Get all skills
export const getApplicantsByRoleListingId = (payload: GetApplicantsByRoleListingIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        // payload is the role listing id
        console.log(payload);
        const res = await axios.get('/api/role_listing/applications/' + payload)
        // if no applicants
        if (res.data.length === 0) {
        }
        for (let j = 0; j < res.data.length; j++) {
            const res2 = await axios.get('/api/staff/details')
            for (let i = 0; i < res2.data.length; i++) {
                if (res.data[j]["staff_id"] === res2.data[i]["staff_id"]) {
                    res.data[j].fname = res2.data[i].fname;
                    res.data[j].lname = res2.data[i].lname;
                    res.data[j].dept = res2.data[i].dept;
                    res.data[j].email = res2.data[i].email;
                    res.data[j].phone = res2.data[i].phone;
                    res.data[j].biz_address = res2.data[i].biz_address;
                    res.data[j].sys_role = res2.data[i].sys_role;
                }
            }
            // for (let j = 0; j < res2.data.length; j++) {
            //     if (res.data[i]["rl_id"] === res2.data[j]["rl_id"]) {
            //         res.data[i].role_name = res2.data[j].role_name;
            //     }
            // }
        }
        dispatch({
            type: GET_APPLICANTS_BY_ROLE_LISTING_ID,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: APPLICANTS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Get applicant by staff ID
export const getApplicantByStaffId = (staffId: number) => async (dispatch: (action: ActionType) => void, getState: any) => {
    try {
        // Get the applicants data from the state
        const applicants = await getState().applicants.applicants;
        // console.log(applicants)
    
        // Find the applicant with the matching staff ID
        const applicant = applicants.find((applicant: any) => applicant.staff_id === staffId);
        console.log(applicant)
    
        // Get the staff information for the HR
        // const staffRes = await axios.get(`/api/staff/details/${applicant.staff_id}`);
        // const staff = staffRes.data;

        // const staffInformation = { ...applicant, staff };
        // console.log(staff);
        // console.log(staffInformation)

        dispatch({
        type: GET_APPLICANT_BY_STAFF_ID,
        payload: applicant,
        });
    } catch (err: any) {
        dispatch({
        type: APPLICANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
  };