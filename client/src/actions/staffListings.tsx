import axios from 'axios';
import {
    FILTER_STAFF_LISTINGS_BY_SKILL_ID,
    FILTER_STAFF_LISTINGS_BY_STAFF_ID,
    GET_STAFF_LISTING,
    GET_STAFF_LISTING_BY_RL_ID_AND_STAFF_ID,
    GET_STAFF_LISTINGS,
    GET_STAFF_LISTINGS_BY_RL_ID,
    SORT_STAFF_LISTINGS_BY_FNAME,
    SORT_STAFF_LISTINGS_BY_LNAME,
    SORT_STAFF_LISTINGS_BY_SKILL_MATCH,
    STAFF_LISTINGS_ERROR,
} from './types';
import {ActionType, SortPayloadType} from "../types";

export const getStaffListings = () => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/staff/details')
        const res2 = await axios.get('/api/staff/skills')
        const res3 = await axios.get('/api/skill/details');
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
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });

    }
}

export const getStaffListing = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get(`/api/staff/details/${id}`);
        dispatch({
            type: GET_STAFF_LISTING,
            payload: res.data[0]
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
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
        const res = await axios.get('/api/role_listing/details')
        const res2 = await axios.get('/api/staff/details');
        const res3 = await axios.get('/api/role/skills');
        const res4 = await axios.get('/api/staff/skills');
        const res5 = await axios.get('/api/role_listing/applications/' + payload)
        if (res5.data.length === 0) {
        }
        for (let i = 0; i < res5.data.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
                if (res5.data[i]["rl_id"] === res.data[j]["rl_id"]) {
                    res5.data[i].role_id = res.data[j].role_id;
                }
            }
            for (let j = 0; j < res2.data.length; j++) {
                if (res5.data[i]["staff_id"] === res2.data[j]["staff_id"]) {
                    res5.data[i].fname = res2.data[j].fname;
                    res5.data[i].lname = res2.data[j].lname;
                    res5.data[i].dept = res2.data[j].dept;
                    res5.data[i].email = res2.data[j].email;
                    res5.data[i].phone = res2.data[j].phone;
                    res5.data[i].biz_address = res2.data[j].biz_address;
                    res5.data[i].sys_role = res2.data[j].sys_role;
                }
            }
            let skillMatch = 0;
            let skillCount = 0;
            let rl_skill_list = [];
            for (let j = 0; j < res3.data.length; j++) {
                if (res5.data[i]["role_id"] === res3.data[j]["role_id"]) {
                    skillCount++;
                    rl_skill_list.push(res3.data[j]["skill_id"]);
                }
            }
            for (let k = 0; k < res4.data.length; k++) {
                if (rl_skill_list.includes(res4.data[k]["skill_id"]) && (res4.data[k]["staff_id"] === res5.data[i]["staff_id"]) && (res4.data[k]["ss_status"] === "active")) {
                    skillMatch++;
                }
            }
            res5.data[i].skill_match = Math.round(skillMatch / skillCount * 100);
        }
        dispatch({
            type: GET_STAFF_LISTINGS_BY_RL_ID,
            payload: res5.data
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}

export const getStaffListingByRLIdAndStaffId = (staffId: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        dispatch({
            type: GET_STAFF_LISTING_BY_RL_ID_AND_STAFF_ID,
            payload: staffId,
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_LISTINGS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}

export const sortStaffListingsBySkillMatch = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_STAFF_LISTINGS_BY_SKILL_MATCH,
        payload
    });
}