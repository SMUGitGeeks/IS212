import axios from 'axios';
import {
    FILTER_ROLE_LISTINGS_BY_ROLE_ID,
    GET_ROLE_LISTING,
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR,
    SORT_ROLE_LISTINGS_BY_DATE,
    SORT_ROLE_LISTINGS_BY_NAME,
    SORT_ROLE_LISTINGS_BY_SKILL_MATCH,
    GET_ROLE_LISTINGS_CREATED_BY_HR,
    GET_ROLE_LISTINGS_CREATED_BY_HR_ERROR
} from './types';
import {ActionType, FilterRoleListingsByRoleIdPayloadType, SortPayloadType, GetRoleListingsByHRPayLoadType} from "../types";

// Get all roles listings
export const getRoleListings = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/role_listing/details')
        const res2 = await axios.get('/api/role/details');
        // role/skills have [{"role_id":2,"skill_id":1},{"role_id":5,"skill_id":2}...]
        const res3 = await axios.get('/api/role/skills');
        // staff/skills have [{"staff_id":1,"skill_id":1},{"staff_id":1,"skill_id":2}...]
        const res4 = await axios.get('/api/staff/skills/' + id);
        const res5 = await axios.get('/api/role_listing/applications');
        // include skill % match in role listings
        for (let i = 0; i < res.data.length; i++) {
            let skillMatch = 0;
            let skillCount = 0;
            for (let j = 0; j < res3.data.length; j++) {
                if (res.data[i]["role_id"] === res3.data[j]["role_id"]) {
                    skillCount++;
                    for (let k = 0; k < res4.data.length; k++) {
                        if (res3.data[j]["skill_id"] === res4.data[k]["skill_id"]) {
                            skillMatch++;
                        }
                    }
                }
            }
            res.data[i].skill_match = Math.round(skillMatch / skillCount * 100);

            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                    res.data[i].role_description = res2.data[j].role_description;
                    res.data[i].role_status = res2.data[j].role_status;
                }
            }
        }

        // include number of applications in role listings
        for (let i = 0; i < res.data.length; i++) {
            let applicationCount = 0;
            for (let j = 0; j < res5.data.length; j++) {
                if (res.data[i]["rl_id"] === res5.data[j]["rl_id"]) {
                    applicationCount++;
                }
            }
            res.data[i].application_count = applicationCount;
        }

        dispatch({
            type: GET_ROLE_LISTINGS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getRoleListing = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get(`/api/role_listing/details/${id}`);
        const res2 = await axios.get('/api/role/details');
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                    res.data[i].role_description = res2.data[j].role_description;
                    res.data[i].role_status = res2.data[j].role_status;
                }
            }
        }

        dispatch({
            type: GET_ROLE_LISTING,
            payload: res.data[0]
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const sortRoleListingsByName = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_ROLE_LISTINGS_BY_NAME,
        payload
    });
}

export const filterRoleListingsByRoleId = (payload: FilterRoleListingsByRoleIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_ROLE_LISTINGS_BY_ROLE_ID,
        payload
    });
}

export const sortRoleListingsByDate = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_ROLE_LISTINGS_BY_DATE,
        payload
    });
}

export const sortRoleListingsBySkillMatch = (payload: SortPayloadType) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: SORT_ROLE_LISTINGS_BY_SKILL_MATCH,
        payload
    });
}

// HR

// get all role listings created by HR
export const getRoleListingsCreatedByHR = (payload: GetRoleListingsByHRPayLoadType) => async (dispatch: (action: ActionType) => void) => {
    // payload is HR's staff id
    try{
        const res = await axios.get('/api/role_listing/details')
        const res2 = await axios.get('/api/role/details');
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res2.data.length; j++) {                
                // check if the role listing is still open or closed
                let today = new Date();
                // console.log(today)
                if (res.data[i]["rl_creator"] === payload && res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                    res.data[i].role_description = res2.data[j].role_description;
                    res.data[i].role_status = res2.data[j].role_status;
                    if (today > new Date(res.data[i]["rl_close"])) {
                        res.data[i].rl_status = "Closed";
                    }
                    else {
                        res.data[i].rl_status = "Open";
                    }
                }
            }
        }

        dispatch({
            type: GET_ROLE_LISTINGS_CREATED_BY_HR,
            payload: res.data
        });
    }
    catch (err: any) {
        dispatch({
            type: GET_ROLE_LISTINGS_CREATED_BY_HR_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}




