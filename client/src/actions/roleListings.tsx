import axios from 'axios';
import {
    FILTER_ROLE_LISTINGS_BY_ROLE_ID,
    GET_ROLE_LISTING,
    GET_ROLE_LISTINGS,
    GET_ROLE_LISTINGS_CREATED_BY_HR,
    GET_ROLE_LISTINGS_CREATED_BY_HR_ERROR,
    ROLE_LISTINGS_ERROR,
    SORT_ROLE_LISTINGS_BY_DATE,
    SORT_ROLE_LISTINGS_BY_NAME,
    SORT_ROLE_LISTINGS_BY_SKILL_MATCH,
    POST_ROLE_LISTING
} from './types';
import {
    ActionType,
    FilterRoleListingsByRoleIdPayloadType,
    GetRoleListingsByHRPayLoadType,
    SortPayloadType,
    UpdateRoleListingLoadType,
    PostRoleListingPayloadType,
} from "../types";

export const getRoleListings = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/role_listing/details')
        const res2 = await axios.get('/api/role/details');
        const res3 = await axios.get('/api/role/skills');
        const res4 = await axios.get('/api/staff/skills/' + id);
        const res5 = await axios.get('/api/role_listing/applications');
        const date = new Date();
        for (let i = 0; i < res.data.length; i++) {
            if (date > new Date(res.data[i]["rl_close"])) {
                res.data.splice(i, 1);
                i--;
            }
        }
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
        // get updater name and update time
        const res3 = await axios.get('/api/staff/details');
        const res4 = await axios.get(`/api/role_listing/updater/${id}`);
        
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    if (res2.data[j]["role_status"] === "active") {
                        res.data[i].role_name = res2.data[j].role_name;
                        res.data[i].role_description = res2.data[j].role_description;
                        res.data[i].role_status = res2.data[j].role_status;
                    }
                }
            }
        }
        for (let j = 0; j < res4.data.length; j++) {
            for (let i = 0; i < res.data.length; i++) {
                if (res4.data[j]["rl_id"] === res.data[i]["rl_id"]) {
                    // will keeo overridding the previous updater name and time until the last one
                    res.data[i].rl_updater_id = res4.data[j]["rl_updater"];
                    res.data[i].update_time = res4.data[j]["rl_ts_update"];
                    for (let k = 0; k < res3.data.length; k++) {
                        if ( res.data[i].rl_updater_id  === res3.data[k]["staff_id"]) {
                            res.data[i].rl_updater = res3.data[k]["fname"] + " " + res3.data[k]["lname"];
                        }
                    }
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

export const getRoleListingsCreatedByHR = (payload: GetRoleListingsByHRPayLoadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/role_listing/details')
        const res2 = await axios.get('/api/role/details');

        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res2.data.length; j++) {
                let today = new Date();
                if (res.data[i]["rl_creator"] === payload && res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                    res.data[i].role_description = res2.data[j].role_description;
                    res.data[i].role_status = res2.data[j].role_status;
                    if (today > new Date(res.data[i]["rl_close"])) {
                        res.data[i].rl_status = "Closed";
                    } else {
                        res.data[i].rl_status = "Open";
                    }
                    console.log(res.data[i].rl_status)
                } else if (res.data[i]["rl_creator"] !== payload){
                    res.data.splice(i, 1);
                    i--;
                }
            }

        }

        dispatch({
            type: GET_ROLE_LISTINGS_CREATED_BY_HR,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: GET_ROLE_LISTINGS_CREATED_BY_HR_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const updateRoleListing = (id: number, payload: UpdateRoleListingLoadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.put('/api/role_listing/' + id, payload)
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



export const postRoleListing = (payload: PostRoleListingPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        console.log("postRL got clicked");
        const {rl_id, role_id, rl_desc, rl_source, rl_open, rl_close, rl_creator, location, department} = payload;
        console.log(payload);        
        const res = await axios.post('/api/role_listing/', payload);
        // dispatch({
        //     type: POST_ROLE_LISTING,
        //     payload: res.data
        // });
        
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}