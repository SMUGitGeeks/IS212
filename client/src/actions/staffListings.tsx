import axios from 'axios';
import {
    FILTER_STAFF_LISTINGS_BY_SKILL_ID,
    FILTER_STAFF_LISTINGS_BY_STAFF_ID,
    GET_STAFF_LISTING,
    GET_STAFF_LISTINGS,
    GET_STAFF_LISTINGS_BY_RL_ID,
    SORT_STAFF_LISTINGS_BY_FNAME,
    SORT_STAFF_LISTINGS_BY_LNAME,
    SORT_STAFF_LISTINGS_BY_SKILL_MATCH,
    STAFF_LISTINGS_ERROR,
} from './types';
import {ActionType, SortPayloadType} from "../types";

// Get all staff listings
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
                            res.data[i].skills.push(res3.data[k]);
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

export const filterStaffListingsBySkillId = (payload: any) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_STAFF_LISTINGS_BY_SKILL_ID,
        payload
    });
}

export const getStaffListingsByRLId = (payload: any) => async (dispatch: (action: ActionType) => void) => {
    try {
        // payload is the role listing id
        console.log(payload);

        const res = await axios.get('/api/role_listing/details')
        const res2 = await axios.get('/api/role/details');
        // role/skills have [{"role_id":2,"skill_id":1},{"role_id":5,"skill_id":2}...]
        const res3 = await axios.get('/api/role/skills');
        // staff/skills have [{"staff_id":1,"skill_id":1},{"staff_id":1,"skill_id":2}...]
        const res4 = await axios.get('/api/staff/skills');
        const res5 = await axios.get('/api/role_listing/applications/' + payload)
        const res6 = await axios.get('/api/staff/details');
        // if no applicants
        if (res5.data.length === 0) {
        }
        // for each application, get skill % match with the role listing
        for (let i = 0; i < res5.data.length; i++) {
            let skillMatch = 0;
            let skillCount = 0;
            for (let j = 0; j < res3.data.length; j++) {
                if (res5.data[i]["role_id"] === res3.data[j]["role_id"]) {
                    skillCount++;
                    for (let k = 0; k < res4.data.length; k++) {
                        if (res3.data[j]["skill_id"] === res4.data[k]["skill_id"]) {
                            skillMatch++;
                        }
                    }
                }
            }
            res5.data[i].skill_match = Math.round(skillMatch / skillCount * 100);

            // for each application, get staff details
            for (let j = 0; j < res6.data.length; j++) {
                if (res5.data[i]["staff_id"] === res6.data[j]["staff_id"]) {
                    res5.data[i].fname = res6.data[j].fname;
                    res5.data[i].lname = res6.data[j].lname;
                    res5.data[i].dept = res6.data[j].dept;
                    res5.data[i].email = res6.data[j].email;
                    res5.data[i].phone = res6.data[j].phone;
                    res5.data[i].biz_address = res6.data[j].biz_address;
                    res5.data[i].sys_role = res6.data[j].sys_role;
                }
            }
        }
        dispatch({
            type: GET_STAFF_LISTINGS_BY_RL_ID,
            payload: res5.data
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const sortStaffListingsBySkillMatch = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_STAFF_LISTINGS_BY_SKILL_MATCH,
        payload
    });
}