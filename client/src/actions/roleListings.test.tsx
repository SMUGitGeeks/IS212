import {store} from '../mockStore';
import {calcSkillMatch} from "./roleListings";

// create a test script to test the calcSkillMatch function
describe('calcSkillMatch function tests', () => {

    it('Should return percentage match of 33%', () => {        
        const res = [{"rl_id":1,"role_id":1,"rl_desc":"Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.","rl_source":1,"rl_open":"2023-09-29T16:00:00.000Z","rl_close":"2023-11-25T16:00:00.000Z","rl_creator":1,"rl_ts_create":"2023-08-01T02:00:00.000Z","location":"Thailand","department":"Human Resources"},{"rl_id":2,"role_id":2,"rl_desc":"Designs and develops technical solutions, contributing to product innovation and solving complex problems.","rl_source":2,"rl_open":"2023-08-25T16:00:00.000Z","rl_close":"2023-11-09T16:00:00.000Z","rl_creator":1,"rl_ts_create":"2023-08-05T01:30:00.000Z","location":"Singapore","department":"IT"},{"rl_id":3,"role_id":5,"rl_desc":"Supports and maintains IT systems, providing technical assistance, troubleshooting, and ensuring smooth operations.","rl_source":7,"rl_open":"2023-09-14T16:00:00.000Z","rl_close":"2023-11-29T16:00:00.000Z","rl_creator":6,"rl_ts_create":"2023-08-10T07:00:00.000Z","location":"Malaysia","department":"IT"},{"rl_id":4,"role_id":2,"rl_desc":"Manage data engineering projects","rl_source":3,"rl_open":"2023-08-13T16:00:00.000Z","rl_close":"2023-08-31T16:00:00.000Z","rl_creator":1,"rl_ts_create":"2023-08-14T00:00:00.000Z","location":"Singapore","department":"Data"},{"rl_id":6,"role_id":3,"rl_desc":"Manage expense tracking and budgeting for 2024","rl_source":3,"rl_open":"2023-10-14T16:00:00.000Z","rl_close":"2023-10-24T16:00:00.000Z","rl_creator":1,"rl_ts_create":null,"location":"Singapore","department":"Finance"}];
        const res2 = [{"role_id":1,"role_name":"HR Manager","role_description":"Manage HR department","role_status":"active"},{"role_id":2,"role_name":"Engineering Manager","role_description":"Manage Engineering department","role_status":"active"},{"role_id":3,"role_name":"Finance Staff","role_description":"Work in Finance department","role_status":"inactive"},{"role_id":4,"role_name":"Sales Manager","role_description":"Manage Sales department","role_status":"active"},{"role_id":5,"role_name":"IT Technician","role_description":"Analyze data","role_status":"active"}];
        const res3 = [{"role_id":2,"skill_id":1},{"role_id":5,"skill_id":2},{"role_id":1,"skill_id":3},{"role_id":4,"skill_id":3},{"role_id":5,"skill_id":4},{"role_id":2,"skill_id":5},{"role_id":5,"skill_id":5},{"role_id":1,"skill_id":6},{"role_id":2,"skill_id":6},{"role_id":3,"skill_id":6},{"role_id":5,"skill_id":6},{"role_id":3,"skill_id":7},{"role_id":4,"skill_id":8},{"role_id":3,"skill_id":9},{"role_id":1,"skill_id":10},{"role_id":2,"skill_id":11}];
        // using staff_id = 3 as test
        const res4 = [{"staff_id":3,"skill_id":2,"ss_status":"active"},{"staff_id":3,"skill_id":4,"ss_status":"active"},{"staff_id":3,"skill_id":5,"ss_status":"active"},{"staff_id":3,"skill_id":6,"ss_status":"in-progress"}];  
        const res6 = [{"skill_id":1,"skill_name":"Java Programming","skill_status":"active"},{"skill_id":2,"skill_name":"Data Analysis","skill_status":"active"},{"skill_id":3,"skill_name":"Communication","skill_status":"active"},{"skill_id":4,"skill_name":"Python Programming","skill_status":"active"},{"skill_id":5,"skill_name":"Data Visualization","skill_status":"active"},{"skill_id":6,"skill_name":"Teamwork","skill_status":"inactive"},{"skill_id":7,"skill_name":"Financial Analysis","skill_status":"active"},{"skill_id":8,"skill_name":"Customer Service","skill_status":"inactive"},{"skill_id":9,"skill_name":"Accounting","skill_status":"active"},{"skill_id":10,"skill_name":"HR management","skill_status":"active"},{"skill_id":11,"skill_name":"C++ Programming","skill_status":"active"}];  

        console.log(res.length);
        const result = calcSkillMatch(res, res2, res3, res4, res6);
        expect(result[1].skill_match).toBe(33);
    })
})

    
