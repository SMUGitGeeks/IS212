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
        const list_of_staffs_details = await axios.get('/api/staff/details')
        const list_of_skills_of_staffs = await axios.get('/api/staff/skills')
        const list_of_skills_details = await axios.get('/api/skill/details');
        for (let i = 0; i < list_of_staffs_details.data.length; i++) {
            list_of_staffs_details.data[i].skills = [];
            for (let j = 0; j < list_of_skills_of_staffs.data.length; j++) {
                if (list_of_staffs_details.data[i]["staff_id"] === list_of_skills_of_staffs.data[j]["staff_id"]) {
                    for (let k = 0; k < list_of_skills_details.data.length; k++) {
                        if (list_of_skills_of_staffs.data[j]["skill_id"] === list_of_skills_details.data[k]["skill_id"]) {
                            list_of_staffs_details.data[i].skills.push(list_of_skills_details.data[k]);
                        }
                    }
                }
            }
        }
        dispatch({
            type: GET_STAFF_LISTINGS,
            payload: list_of_staffs_details.data
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
        const list_of_staff_details_by_staff_id = await axios.get(`/api/staff/details/${id}`);
        dispatch({
            type: GET_STAFF_LISTING,
            payload: list_of_staff_details_by_staff_id.data[0]
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
        const list_of_all_role_listing_details = await axios.get('/api/role_listing/details')
        const list_of_staffs_details = await axios.get('/api/staff/details');
        const list_of_skills_of_roles = await axios.get('/api/role/skills');
        const list_of_skills_of_staffs = await axios.get('/api/staff/skills');
        const list_of_applications_by_role_listing_id = await axios.get('/api/role_listing/applications/' + payload)
        if (list_of_applications_by_role_listing_id.data.length === 0) {
        }
        for (let i = 0; i < list_of_applications_by_role_listing_id.data.length; i++) {
            for (let j = 0; j < list_of_all_role_listing_details.data.length; j++) {
                if (list_of_applications_by_role_listing_id.data[i]["rl_id"] === list_of_all_role_listing_details.data[j]["rl_id"]) {
                    list_of_applications_by_role_listing_id.data[i].role_id = list_of_all_role_listing_details.data[j].role_id;
                }
            }
            for (let j = 0; j < list_of_staffs_details.data.length; j++) {
                if (list_of_applications_by_role_listing_id.data[i]["staff_id"] === list_of_staffs_details.data[j]["staff_id"]) {
                    list_of_applications_by_role_listing_id.data[i].fname = list_of_staffs_details.data[j].fname;
                    list_of_applications_by_role_listing_id.data[i].lname = list_of_staffs_details.data[j].lname;
                    list_of_applications_by_role_listing_id.data[i].dept = list_of_staffs_details.data[j].dept;
                    list_of_applications_by_role_listing_id.data[i].email = list_of_staffs_details.data[j].email;
                    list_of_applications_by_role_listing_id.data[i].phone = list_of_staffs_details.data[j].phone;
                    list_of_applications_by_role_listing_id.data[i].biz_address = list_of_staffs_details.data[j].biz_address;
                    list_of_applications_by_role_listing_id.data[i].sys_role = list_of_staffs_details.data[j].sys_role;
                }
            }
            let skillMatch = 0;
            let skillCount = 0;
            let rl_skill_list = [];
            for (let j = 0; j < list_of_skills_of_roles.data.length; j++) {
                if (list_of_applications_by_role_listing_id.data[i]["role_id"] === list_of_skills_of_roles.data[j]["role_id"]) {
                    skillCount++;
                    rl_skill_list.push(list_of_skills_of_roles.data[j]["skill_id"]);
                }
            }
            for (let k = 0; k < list_of_skills_of_staffs.data.length; k++) {
                if (rl_skill_list.includes(list_of_skills_of_staffs.data[k]["skill_id"]) && (list_of_skills_of_staffs.data[k]["staff_id"] === list_of_applications_by_role_listing_id.data[i]["staff_id"]) && (list_of_skills_of_staffs.data[k]["ss_status"] === "active")) {
                    skillMatch++;
                }
            }
            list_of_applications_by_role_listing_id.data[i].skill_match = Math.round(skillMatch / skillCount * 100);
        }
        dispatch({
            type: GET_STAFF_LISTINGS_BY_RL_ID,
            payload: list_of_applications_by_role_listing_id.data
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