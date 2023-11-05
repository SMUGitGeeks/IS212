import axios from 'axios';
import {GET_STAFF_SKILLS_BY_STAFF_ID, STAFF_SKILLS_ERROR} from './types';
import {ActionType, GetStaffSkillsByStaffIdPayloadType} from "../types";

export const getStaffSkillsByStaffId = (payload: GetStaffSkillsByStaffIdPayloadType) => async (dispatch: (action: ActionType) => void) => {
    try {
        const list_of_skills_by_staff_id = await axios.get('/api/staff/skills/' + payload)
        const list_of_skills_details = await axios.get('/api/skill/details');
        for (let i = 0; i < list_of_skills_by_staff_id.data.length; i++) {
            for (let j = 0; j < list_of_skills_details.data.length; j++) {
                if (list_of_skills_by_staff_id.data[i]["skill_id"] === list_of_skills_details.data[j]["skill_id"]) {
                    list_of_skills_by_staff_id.data[i].skill_name = list_of_skills_details.data[j].skill_name;
                    list_of_skills_by_staff_id.data[i].skill_status = list_of_skills_details.data[j].skill_status;
                }
            }
        }
        dispatch({
            type: GET_STAFF_SKILLS_BY_STAFF_ID,
            payload: list_of_skills_by_staff_id.data
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_SKILLS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}
