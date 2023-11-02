import axios from 'axios';
import {
    FILTER_ROLE_LISTINGS_BY_DEPARTMENT,
    FILTER_ROLE_LISTINGS_BY_LOCATION,
    FILTER_ROLE_LISTINGS_BY_ROLE_ID,
    GET_ROLE_LISTING,
    GET_ROLE_LISTINGS,
    ROLE_LISTINGS_ERROR,
    SORT_ROLE_LISTINGS_BY_DATE,
    SORT_ROLE_LISTINGS_BY_NAME,
    SORT_ROLE_LISTINGS_BY_SKILL_MATCH
} from './types';
import {
    ActionType,
    FilterRoleListingsByRoleIdPayloadType,
    GetRoleListingsByHRPayLoadType,
    PostRoleListingPayloadType,
    SortPayloadType,
    UpdateRoleListingLoadType,
} from "../types";

// res: role listing info, get role_id
// res2: role details from rold_id
// res3: get skill_id from role_id
// res4: get skill_id and ss_status from staff_id
// res6: check skill status from skill_id

export const calcSkillMatch = (rl_details: any, role_skills: any, staff_skills: any, skill_details: any) => {
    // input is 1 rl's detail, all role skills, 1 staff's skills, all skill details
    let final = 0;
    let skillMatch = 0;
    let skillCount = 0;
    for (let i = 0; i < role_skills.length; i++) {
        // get role skills
        if (rl_details.role_id === role_skills[i]["role_id"]) {
            // check role skill status
            for (let j = 0; j < skill_details.length; j++) {
                if (role_skills[i]["skill_id"] === skill_details[j]["skill_id"]) {
                    if (skill_details[j]["skill_status"] === "active") {
                        skillCount++;
                        // iterate through 1 staff's skills
                        for (let k = 0; k < staff_skills.length; k++) {
                            if (role_skills[i]["skill_id"] === staff_skills[k]["skill_id"]) {
                                // check staff skill status
                                if (staff_skills[k]["ss_status"] === "active") {
                                    skillMatch++;
                                }
                            }
                        }

                    }
                }
            }
        }
    }
    // round to nearest whole numnber
    final = Math.round((skillMatch / skillCount) * 100);
    return final;
}


export const getRoleListings = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        let res = await axios.get('/api/role_listing/details')             // role listing info, get role_id
        const res2 = await axios.get('/api/role/details');                   // role details from rold_id
        const res3 = await axios.get('/api/role/skills');                    // get skill_id from role_id
        const res4 = await axios.get('/api/staff/skills/' + id);             // get skill_id and ss_status from staff_id
        const res5 = await axios.get('/api/role_listing/applications');
        const res6 = await axios.get('/api/skill/details');                  // check skill status from skill_id
        const updaterRes = await axios.get('/api/role_listing/updater');           // get updater name and update time

        const date = new Date();
        
        // add role list start and end date to res.data
        for (let i = 0; i < res.data.length; i++) {
            if (date > new Date(res.data[i]["rl_close"])) {
                res.data[i].rl_status = "Closed";
            } else {
                res.data[i].rl_status = "Open";
            }
            // add role name, description, and role status to res.data
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["role_id"] === res2.data[j]["role_id"]) {
                    res.data[i].role_name = res2.data[j].role_name;
                    res.data[i].role_description = res2.data[j].role_description;
                    res.data[i].role_status = res2.data[j].role_status;
                }
            }
        }
        // add updater id, and update time to res.data
        for (let j = 0; j < updaterRes.data.length; j++) {
            for (let i = 0; i < res.data.length; i++) {
                if (updaterRes.data[j]["rl_id"] === res.data[i]["rl_id"]) {
                    // will keep overridding the previous updater name and time until the last one
                    res.data[i].rl_updater_id = updaterRes.data[j]["rl_updater"];
                    res.data[i].update_time = updaterRes.data[j]["rl_ts_update"];
                }
            }
        }

        // const rl_details = res.data;
        const role_skills = res3.data;
        const staff_skills = res4.data;
        const skill_details = res6.data;

        // add skillmatch to res.data
        for (let i = 0; i < res.data.length; i++) {
            res.data[i].skill_match = calcSkillMatch(res.data[i], role_skills, staff_skills, skill_details);
        }


        // application count
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
            payload: {action: "getRoleListings", msg: err.response?.statusText, status: err.response?.status, data: err.response?.data}
        });
    }
}
    

export const getRoleListing = (id: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get(`/api/role_listing/details/${id}`);
        const res2 = await axios.get('/api/role/details');
        // get updater name and update time
        const res3 = await axios.get('/api/staff/details');

        let output = null;

        for (let j = 0; j < res2.data.length; j++) {
            if (res.data[0]["role_id"] === res2.data[j]["role_id"]) {
                res.data[0].role_name = res2.data[j].role_name;
                res.data[0].role_description = res2.data[j].role_description;
                res.data[0].role_status = res2.data[j].role_status;
                output = res.data[0];
            }
        }

        const res4 = await axios.get(`/api/role_listing/updater/${id}`)
            .then((res) => {
                for (let j = 0; j < res.data.length; j++) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[j]["rl_id"] === res.data[i]["rl_id"]) {
                            // will keeo overridding the previous updater name and time until the last one
                            res.data[i].rl_updater_id = res.data[j]["rl_updater"];
                            res.data[i].update_time = res.data[j]["rl_ts_update"];
                            for (let k = 0; k < res3.data.length; k++) {
                                if (res.data[i].rl_updater_id === res3.data[k]["staff_id"]) {
                                    res.data[i].rl_updater = res3.data[k]["fname"] + " " + res3.data[k]["lname"];
                                }
                            }
                        }
                    }
                }
            })
            .catch((err) => {
                if (err.response?.status === 404) {
                res.data.rl_updater = undefined;
                res.data.update_time = undefined; 
                } else {
                    throw err;
                }
            });

        dispatch({
            type: GET_ROLE_LISTING,
            payload: output
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {action: "getRoleListing", msg: err.response?.statusText, status: err.response?.status}
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

export const filterRoleListingsByDepartment = (payload: any) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_ROLE_LISTINGS_BY_DEPARTMENT,
        payload
    });
}

export const filterRoleListingsByLocation = (payload: any) => async (dispatch: (action: ActionType) => void) => {
    dispatch({
        type: FILTER_ROLE_LISTINGS_BY_LOCATION,
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

export const updateRoleListing = (id: number, payload: UpdateRoleListingLoadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.put('/api/role_listing/' + id, payload)
    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
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
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}