import axios from 'axios';
import {GET_ROLE_SKILLS_BY_ROLE_ID, ROLE_SKILLS_ERROR} from './types';
import {ActionType, GetRoleSkillsByRoleIdPayloadType} from '../types';


export const getRoleSkillsByRoleId = (payload: GetRoleSkillsByRoleIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        const list_of_role_listing_details_by_id = await axios.get('/api/role_listing/details/' + payload)
        const role_id = list_of_role_listing_details_by_id.data[0]["role_id"];
        const list_of_skills_by_role_id = await axios.get('/api/role/skill/' + role_id);
        const list_of_all_role_details = await axios.get('/api/skill/details');

        const output = [];
        for (let i = 0; i < list_of_skills_by_role_id.data.length; i++) {
            for (let j = 0; j < list_of_all_role_details.data.length; j++) {
                // Check if skill is active
                if (list_of_skills_by_role_id.data[i]["skill_id"] === list_of_all_role_details.data[j]["skill_id"]) {
                    if (list_of_all_role_details.data[j].skill_status === "active"){
                        list_of_skills_by_role_id.data[i].skill_name = list_of_all_role_details.data[j].skill_name;
                        list_of_skills_by_role_id.data[i].skill_status = list_of_all_role_details.data[j].skill_status;
                        output.push(list_of_skills_by_role_id.data[i]);
                    }
                }
            }
        }
        dispatch({
            type: GET_ROLE_SKILLS_BY_ROLE_ID,
            payload: output
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_SKILLS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}
