import axios from 'axios';
import {
    FILTER_STAFF_LISTINGS_BY_SKILL_ID,
    FILTER_STAFF_LISTINGS_BY_STAFF_ID,
    FILTER_STAFF_LISTINGS_BY_DEPARTMENT,
    GET_STAFF_LISTING,
    GET_STAFF_LISTINGS,
    SORT_STAFF_LISTINGS_BY_FNAME,
    SORT_STAFF_LISTINGS_BY_LNAME,
    STAFF_LISTINGS_ERROR,
} from './types';
import {ActionType, SortPayloadType} from "../types";

// Get all staff
export const getStaffListings = () => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/staff/details')
        const res2 = await axios.get('/api/staff/skills')
        // [{"staff_id":1,"skill_id":1,"ss_status":"active"},{"staff_id":2,"skill_id":1,"ss_status":"active"},{"staff_id":3,"skill_id":2,"ss_status":"active"},{"staff_id":4,"skill_id":4,"ss_status":"active"},{"staff_id":6,"skill_id":1,"ss_status":"active"},{"staff_id":6,"skill_id":6,"ss_status":"active"},{"staff_id":7,"skill_id":7,"ss_status":"active"},{"staff_id":8,"skill_id":8,"ss_status":"active"}]
        const res3 = await axios.get('/api/skill/details');
        //[{"skill_id":1,"skill_name":"Java Programming","skill_status":"active"},{"skill_id":2,"skill_name":"Data Analysis","skill_status":"active"},{"skill_id":3,"skill_name":"Communication","skill_status":"inactive"},{"skill_id":4,"skill_name":"Python Programming","skill_status":"active"},{"skill_id":5,"skill_name":"Data Visualization","skill_status":"active"},{"skill_id":6,"skill_name":"Teamwork","skill_status":"inactive"},{"skill_id":7,"skill_name":"Financial Analysis","skill_status":"active"},{"skill_id":8,"skill_name":"Customer Service","skill_status":"inactive"}]
        // add skill_name and skill_status and skill_id to res.data.skills
        for (let i = 0; i < res.data.length; i++) {
            res.data[i].skills = [];
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["staff_id"] === res2.data[j]["staff_id"]) {
                    for (let k = 0; k < res3.data.length; k++) {
                        if (res2.data[j]["skill_id"] === res3.data[k]["skill_id"]) {
                            let res3Clone = Object.assign({}, res3.data[k]);

                            // add ss_status to res.data.skills
                            res3Clone.ss_status = res2.data[j]["ss_status"];
                            res.data[i].skills.push(res3Clone);
                        }
                    }
                }
            }
        }
        dispatch({
            type: GET_STAFF_LISTINGS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}

export const getStaffListing = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get(`/api/staff/details/${id}`);
        console.log(res.data[0]);
        dispatch({
            type: GET_STAFF_LISTING,
            payload: res.data[0]
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const sortStaffListingsByFName = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_STAFF_LISTINGS_BY_FNAME,
        payload
    });
}

export const sortStaffListingsByLName = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_STAFF_LISTINGS_BY_LNAME,
        payload
    });
}

export const filterStaffListingsByStaffId = (payload: any) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_STAFF_LISTINGS_BY_STAFF_ID,
        payload
    });
}

// Allow filtering of staff based on skill name
export const filterStaffListingsBySkillId = (payload: any) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_STAFF_LISTINGS_BY_SKILL_ID,
        payload
    });
}

// Allow filtering of staff based on department 
export const filterStaffListingsByDepartment = (payload: any) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_STAFF_LISTINGS_BY_DEPARTMENT,
        payload
    });
}


