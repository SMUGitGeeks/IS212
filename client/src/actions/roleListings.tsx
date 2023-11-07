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

// list_of_all_role_listing_details: role listing info, get role_id
// list_of_all_role_details: role details from rold_id
// list_of_skills_of_roles: get skill_id from role_id
// list_of_skills_by_staff_id: get skill_id and ss_status from staff_id
// list_of_skills_details: check skill status from skill_id

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
        let list_of_all_role_listing_details = await axios.get('/api/role_listing/details')             // role listing info, get role_id
        const list_of_all_role_details = await axios.get('/api/role/details');                   // role details from rold_id
        const list_of_skills_of_roles = await axios.get('/api/role/skills');                    // get skill_id from role_id
        const list_of_skills_by_staff_id = await axios.get('/api/staff/skills/' + id);             // get skill_id and ss_status from staff_id
        const list_of_applications_details = await axios.get('/api/role_listing/applications');
        const list_of_skills_details = await axios.get('/api/skill/details');                  // check skill status from skill_id
        const list_of_all_role_listing_updaters = await axios.get('/api/role_listing/updater');           // get updater name and update time

        const date = new Date();
        
        // add role list start and end date to list_of_all_role_listing_details.data
        for (let i = 0; i < list_of_all_role_listing_details.data.length; i++) {
            if (date > new Date(list_of_all_role_listing_details.data[i]["rl_close"])) {
                list_of_all_role_listing_details.data[i].rl_status = "Closed";
            } else {
                list_of_all_role_listing_details.data[i].rl_status = "Open";
            }
            // add role name, description, and role status to list_of_all_role_listing_details.data
            for (let j = 0; j < list_of_all_role_details.data.length; j++) {
                if (list_of_all_role_listing_details.data[i]["role_id"] === list_of_all_role_details.data[j]["role_id"]) {
                    list_of_all_role_listing_details.data[i].role_name = list_of_all_role_details.data[j].role_name;
                    list_of_all_role_listing_details.data[i].role_description = list_of_all_role_details.data[j].role_description;
                    list_of_all_role_listing_details.data[i].role_status = list_of_all_role_details.data[j].role_status;
                }
            }
        }
        // add updater id, and update time to list_of_all_role_listing_details.data
        for (let j = 0; j < list_of_all_role_listing_updaters.data.length; j++) {
            for (let i = 0; i < list_of_all_role_listing_details.data.length; i++) {
                if (list_of_all_role_listing_updaters.data[j]["rl_id"] === list_of_all_role_listing_details.data[i]["rl_id"]) {
                    // will keep overridding the previous updater name and time until the last one
                    list_of_all_role_listing_details.data[i].rl_updater_id = list_of_all_role_listing_updaters.data[j]["rl_updater"];
                    list_of_all_role_listing_details.data[i].update_time = list_of_all_role_listing_updaters.data[j]["rl_ts_update"];
                }
            }
        }

        // const rl_details = list_of_all_role_listing_details.data;
        const role_skills = list_of_skills_of_roles.data;
        const staff_skills = list_of_skills_by_staff_id.data;
        const skill_details = list_of_skills_details.data;

        // add skillmatch to list_of_all_role_listing_details.data
        for (let i = 0; i < list_of_all_role_listing_details.data.length; i++) {
            list_of_all_role_listing_details.data[i].skill_match = calcSkillMatch(list_of_all_role_listing_details.data[i], role_skills, staff_skills, skill_details);
        }


        // application count
        for (let i = 0; i < list_of_all_role_listing_details.data.length; i++) {
            let applicationCount = 0;
            for (let j = 0; j < list_of_applications_details.data.length; j++) {
                if (list_of_all_role_listing_details.data[i]["rl_id"] === list_of_applications_details.data[j]["rl_id"]) {
                    applicationCount++;
                }
            }
            list_of_all_role_listing_details.data[i].application_count = applicationCount;
        }
        dispatch({
            type: GET_ROLE_LISTINGS,
            payload: list_of_all_role_listing_details.data
        });

    } catch (err: any) {
        dispatch({
            type: ROLE_LISTINGS_ERROR,
            payload: {action: "getRoleListings", msg: err.response?.statusText, status: err.response?.status, data: err.response?.data}
        });
    }
}
    

export const getRoleListing = (id: number, userId: number) => async (dispatch: (action: ActionType) => void) => {
    try {
        const list_of_role_listing_details_by_id = await axios.get(`/api/role_listing/details/${id}`);
        const list_of_all_role_details = await axios.get('/api/role/details');
        const list_of_applications_details = await axios.get('/api/role_listing/applications');
        // get updater name and update time
        const list_of_staffs_details = await axios.get('/api/staff/details');
        const list_of_skills_by_staff_id = await axios.get('/api/staff/skills/' + userId);             // get skill_id and ss_status from staff_id
        const list_of_skills_details = await axios.get('/api/skill/details');                  // check skill status from skill_id
        const list_of_skills_of_roles = await axios.get('/api/role/skills');                    // get skill_id from role_id

        let applicationCount = 0;
        // let output = null;

        for (let j = 0; j < list_of_all_role_details.data.length; j++) {
            if (list_of_role_listing_details_by_id.data[0]["role_id"] === list_of_all_role_details.data[j]["role_id"]) {
                list_of_role_listing_details_by_id.data[0].role_name = list_of_all_role_details.data[j].role_name;
                list_of_role_listing_details_by_id.data[0].role_description = list_of_all_role_details.data[j].role_description;
                list_of_role_listing_details_by_id.data[0].role_status = list_of_all_role_details.data[j].role_status;
                // output = list_of_role_listing_details_by_id.data[0];
            }
        }

        for (let k = 0; k < list_of_applications_details.data.length; k++) {
            if (list_of_role_listing_details_by_id.data[0]["rl_id"] === list_of_applications_details.data[k]["rl_id"]) {
                applicationCount++;
            }
        }
        list_of_role_listing_details_by_id.data[0].application_count = applicationCount;

        for (let k = 0; k < list_of_staffs_details.data.length; k++) {
            if (list_of_role_listing_details_by_id.data[0]["rl_source"] === list_of_staffs_details.data[k]["staff_id"]) {
                list_of_role_listing_details_by_id.data[0].source_name = list_of_staffs_details.data[k]["fname"] + " " + list_of_staffs_details.data[k]["lname"];
            }
            if (list_of_role_listing_details_by_id.data[0]["rl_creator"] === list_of_staffs_details.data[k]["staff_id"]) {
                list_of_role_listing_details_by_id.data[0].creator_name = list_of_staffs_details.data[k]["fname"] + " " + list_of_staffs_details.data[k]["lname"];
            }
        }

        list_of_role_listing_details_by_id.data[0].skill_match = calcSkillMatch(list_of_role_listing_details_by_id.data[0], list_of_skills_of_roles.data, list_of_skills_by_staff_id.data, list_of_skills_details.data);

        let update_records: any = [];
        await axios.get(`/api/role_listing/updater/${id}`)
            .then((list_of_all_updater_details) => {
                // const list_of_all_updater_details = res.data;
                for (let j = 0; j < list_of_role_listing_details_by_id.data.length; j++) {
                    for (let i = 0; i < list_of_all_updater_details.data.length; i++) {
                        for (let k = 0; k < list_of_staffs_details.data.length; k++) {
                            if (list_of_all_updater_details.data[j]["rl_updater"] === list_of_staffs_details.data[k]["staff_id"]) {
                                // list_of_role_listing_details_by_id.data[i].rl_updater = list_of_staffs_details.data[k]["fname"] + " " + list_of_staffs_details.data[k]["lname"];
                                update_records.push({
                                    rl_updater_id: list_of_all_updater_details.data[j]["rl_updater"],
                                    rl_updater_name: list_of_staffs_details.data[k]["fname"] + " " + list_of_staffs_details.data[k]["lname"],
                                    update_time: list_of_all_updater_details.data[j]["rl_ts_update"]
                                
                                });
                            }
                        }
                    }
                }
                list_of_role_listing_details_by_id.data[0].update_records = update_records;
                let date = new Date();
                if (date > new Date(list_of_role_listing_details_by_id.data[0]["rl_close"])) {
                    list_of_role_listing_details_by_id.data[0].rl_status = "Closed";
                } else {
                    list_of_role_listing_details_by_id.data[0].rl_status = "Open";
                }
            })
            .catch((err) => {
                if (err.response?.status === 404) {
                    list_of_role_listing_details_by_id.data[0].update_records = [];
                } else {
                    throw err;
                }
            });

            

        dispatch({
            type: GET_ROLE_LISTING,
            payload: list_of_role_listing_details_by_id.data[0]
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
        const role_listing_update_by_id = await axios.put('/api/role_listing/' + id, payload)
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
        const list_of_all_role_listing_details = await axios.post('/api/role_listing/', payload);
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