import axios from 'axios';
import {GET_ROLE_SKILLS_BY_ROLE_ID, ROLE_SKILLS_ERROR} from './types';
import {ActionType, GetRoleSkillsByRoleIdPayloadType} from '../types';


export const getRoleSkillsByRoleId = (payload: GetRoleSkillsByRoleIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        const res = await axios.get('/api/role_listing/details/' + payload)
        const role_id = res.data[0]["role_id"];
        const res2 = await axios.get('/api/role/skill/' + role_id);
        const res3 = await axios.get('/api/skill/details');
        for (let i = 0; i < res2.data.length; i++) {
            for (let j = 0; j < res3.data.length; j++) {
                // Check if skill is active
                if (res2.data[i]["skill_id"] === res3.data[j]["skill_id"]) {
                    if (res3.data[j].skill_status === "active"){
                        res2.data[i].skill_name = res3.data[j].skill_name;
                        res2.data[i].skill_status = res3.data[j].skill_status;
                    }
                }
            }
        }
        dispatch({
            type: GET_ROLE_SKILLS_BY_ROLE_ID,
            payload: res2.data
        });
    } catch (err: any) {
        dispatch({
            type: ROLE_SKILLS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
