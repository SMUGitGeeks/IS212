import axios from 'axios';
import {
    GET_STAFF_SKILLS,
    STAFF_SKILLS_ERROR
} from './types';

// Get all skills
export const getStaffSkills = () => async (dispatch: any) => {
    try {
        const res = await axios.get('/api/staff_skill/details')
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
            type: GET_STAFF_SKILLS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: STAFF_SKILLS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
