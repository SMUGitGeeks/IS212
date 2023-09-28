import axios from 'axios';
import {
    GET_ROLE_SKILLS_BY_ROLE_ID,
    ROLE_SKILLS_ERROR
} from './types';
import { ActionType, GetRoleSkillsByRoleIdPayloadType } from '../types';

// Get all role skills for a role listing
export const getRoleSkillsByRoleId = (payload: GetRoleSkillsByRoleIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try{
        // payload is the role id
        console.log(payload);
        const res = await axios.get('/api/role/skill/' + payload)
        const res2 = await axios.get('/api/skill/details');
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res2.data.length; j++) {
                if (res.data[i]["skill_id"] === res2.data[j]["skill_id"]) {
                    res.data[i].skill_name = res2.data[j].skill_name;
                    res.data[i].skill_status = res2.data[j].skill_status;
                }
            }
        }
        dispatch({
            type: GET_ROLE_SKILLS_BY_ROLE_ID,
            payload: res.data
        });
    }
    catch (err: any) {
        dispatch({
            type: ROLE_SKILLS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
