import axios from 'axios';
import {GET_SKILLS, SKILLS_ERROR,} from './types';
import {ActionType} from "../types";

export const getSkills = () => async (dispatch: (action: ActionType) => void) => {
    try {
        const list_of_all_role_details = await axios.get('/api/skill/details')
        dispatch({
            type: GET_SKILLS,
            payload: list_of_all_role_details.data
        });
    } catch (err: any) {
        dispatch({
            type: SKILLS_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        });
    }
}





