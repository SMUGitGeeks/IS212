import axios from 'axios';
import {GET_SKILLS_MATCH, SKILLS_MATCH_ERROR} from './types';
import {getStaffSkillsByStaffId} from './staffSkills';

// get % match in role skills and staff skills
export const getSkillsMatch = (staffID: any, roleIDs : any) => async (dispatch: (action: any) => void) => {
    try{
        // get staff skills
        const staffId = staffID;
        const staffSKills = await getStaffSkillsByStaffId(staffId);

        // code to get role skills


        // calculate % match
        const response = 0;

        dispatch({
            type: 'GET_SKILLS_MATCH_SUCCESS',
            payload: response,
        });
    }
    catch(err: any){
        dispatch({
            type: SKILLS_MATCH_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
    
   
}