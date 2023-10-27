import {store} from '../mockStore';
import {calcSkillMatch} from "./roleListings";

// create a test script to test the calcSkillMatch function
describe('calcSkillMatch function tests', () => {

    it('Should return percentage match of 100%', () => {        
        let rl_details = [{"rl_id":3,"role_id":5,"rl_desc":"Supports and maintains IT systems, providing technical assistance, troubleshooting, and ensuring smooth operations.","rl_source":7,"rl_open":"2023-09-14T16:00:00.000Z","rl_close":"2023-11-29T16:00:00.000Z","rl_creator":6,"rl_ts_create":"2023-08-10T07:00:00.000Z","location":"Malaysia","department":"IT"}];
        let role_skills = [{"role_id":2,"skill_id":1},{"role_id":5,"skill_id":2},{"role_id":1,"skill_id":3},{"role_id":4,"skill_id":3},{"role_id":5,"skill_id":4},{"role_id":2,"skill_id":5},{"role_id":5,"skill_id":5},{"role_id":1,"skill_id":6},{"role_id":2,"skill_id":6},{"role_id":3,"skill_id":6},{"role_id":5,"skill_id":6},{"role_id":3,"skill_id":7},{"role_id":4,"skill_id":8},{"role_id":3,"skill_id":9},{"role_id":1,"skill_id":10},{"role_id":2,"skill_id":11}];
        // using staff_id = 3 as test
        let staff_skills = [{"staff_id":3,"skill_id":2,"ss_status":"active"},{"staff_id":3,"skill_id":4,"ss_status":"active"},{"staff_id":3,"skill_id":5,"ss_status":"active"},{"staff_id":3,"skill_id":6,"ss_status":"in-progress"}];  
        let skill_details = [{"skill_id":1,"skill_name":"Java Programming","skill_status":"active"},{"skill_id":2,"skill_name":"Data Analysis","skill_status":"active"},{"skill_id":3,"skill_name":"Communication","skill_status":"active"},{"skill_id":4,"skill_name":"Python Programming","skill_status":"active"},{"skill_id":5,"skill_name":"Data Visualization","skill_status":"active"},{"skill_id":6,"skill_name":"Teamwork","skill_status":"inactive"},{"skill_id":7,"skill_name":"Financial Analysis","skill_status":"active"},{"skill_id":8,"skill_name":"Customer Service","skill_status":"inactive"},{"skill_id":9,"skill_name":"Accounting","skill_status":"active"},{"skill_id":10,"skill_name":"HR management","skill_status":"active"},{"skill_id":11,"skill_name":"C++ Programming","skill_status":"active"}];  
        let result = calcSkillMatch(rl_details, role_skills, staff_skills, skill_details);
        expect(result).toBe(100);
    })
})

    
