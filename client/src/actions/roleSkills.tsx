import axios from 'axios';
import {
    GET_ROLE_SKILLS_BY_ROLE_ID,
    ROLE_SKILLS_ERROR
} from './types';
import { ActionType, GetRoleSkillsByRoleIdPayloadType } from '../types';

// Get all role skills for a role listing
export const getRoleSkillsByRoleId = (payload: GetRoleSkillsByRoleIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try{
        // payload is the role listing id
        console.log(payload);
        const res = await axios.get('/api/role_listing/details/' + payload)

        // get role_id from role_listing
        const role_id = res.data[0]["role_id"];
        console.log(role_id);

        const res2 = await axios.get('/api/role/skill/' + role_id);
        const res3 = await axios.get('/api/skill/details');
        
        for (let i = 0; i < res2.data.length; i++) {
            for (let j = 0; j < res3.data.length; j++) {
                // haven't check if skill is active
                if (res2.data[i]["skill_id"] === res3.data[j]["skill_id"]) {
                    res2.data[i].skill_name = res3.data[j].skill_name;
                    res2.data[i].skill_status = res3.data[j].skill_status;
                }
            }
        }
        dispatch({
            type: GET_ROLE_SKILLS_BY_ROLE_ID,
            payload: res2.data
        });
    }
    catch (err: any) {
        dispatch({
            type: ROLE_SKILLS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
