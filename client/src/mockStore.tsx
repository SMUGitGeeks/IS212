import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
export const store = mockStore({
    role: {
        roles: [
            {
                role_id: 1,
                role_name: 'HR Manager',
                role_description: 'Manage HR department',
                role_status: 'active'
            },
            {
                role_id: 2,
                role_name: 'Engineering Manager',
                role_description: 'Manage Engineering department',
                role_status: 'active'
            },
            {
                role_id: 3,
                role_name: 'Finance Staff',
                role_description: 'Work in Finance department',
                role_status: 'inactive'
            },
            {
                role_id: 4,
                role_name: 'Sales Manager',
                role_description: 'Manage Sales department',
                role_status: 'active'
            },
            {
                role_id: 5,
                role_name: 'IT',
                role_description: 'Analyze data',
                role_status: 'active'
            }
        ],
        role: null,
        loading: false,
        error: {}
    },
    roleListing: {
        roleListings: [
            {
                rl_id: 1,
                role_id: 1,
                rl_desc: 'Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.',
                rl_open: '2023-08-31T16:00:00.000Z',
                rl_close: '2023-09-14T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-01T02:00:00.000Z',
                role_name: 'HR Manager',
                role_description: 'Manage HR department',
                role_status: 'active'
            },
            {
                rl_id: 2,
                role_id: 2,
                rl_desc: 'Designs and develops technical solutions, contributing to product innovation and solving complex problems.',
                rl_open: '2023-09-09T16:00:00.000Z',
                rl_close: '2023-09-24T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-05T01:30:00.000Z',
                role_name: 'Engineering Manager',
                role_description: 'Manage Engineering department',
                role_status: 'active'
            },
            {
                rl_id: 3,
                role_id: 5,
                rl_desc: 'Supports and maintains IT systems, providing technical assistance, troubleshooting, and ensuring smooth operations.',
                rl_open: '2023-09-14T16:00:00.000Z',
                rl_close: '2023-09-29T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-10T07:00:00.000Z',
                role_name: 'IT',
                role_description: 'Analyze data',
                role_status: 'active'
            }
        ],
        rawRoleListings: [
            {
                rl_id: 1,
                role_id: 1,
                rl_desc: 'Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.',
                rl_open: '2023-08-31T16:00:00.000Z',
                rl_close: '2023-09-14T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-01T02:00:00.000Z',
                role_name: 'HR Manager',
                role_description: 'Manage HR department',
                role_status: 'active'
            },
            {
                rl_id: 2,
                role_id: 2,
                rl_desc: 'Designs and develops technical solutions, contributing to product innovation and solving complex problems.',
                rl_open: '2023-09-09T16:00:00.000Z',
                rl_close: '2023-09-24T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-05T01:30:00.000Z',
                role_name: 'Engineering Manager',
                role_description: 'Manage Engineering department',
                role_status: 'active'
            },
            {
                rl_id: 3,
                role_id: 5,
                rl_desc: 'Supports and maintains IT systems, providing technical assistance, troubleshooting, and ensuring smooth operations.',
                rl_open: '2023-09-14T16:00:00.000Z',
                rl_close: '2023-09-29T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-10T07:00:00.000Z',
                role_name: 'IT',
                role_description: 'Analyze data',
                role_status: 'active'
            }
        ],
        roleListing: {
            rl_id: 1,
            role_id: 1,
            rl_desc: 'Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.',
            rl_open: '2023-08-31T16:00:00.000Z',
            rl_close: '2023-09-14T16:00:00.000Z',
            rl_creator: 1,
            rl_ts_create: '2023-08-01T02:00:00.000Z',
            role_name: 'HR Manager',
            role_description: 'Manage HR department',
            role_status: 'active'
        },
        loading: false,
        error: {}
    },
    auth: {
        user: 3,
        loading: false,
        error: {}
    },
    staffSkills: {
        staffSkills: [],
        staffSkill: null,
        loading: true,
        error: {}
    },
    applications: {
        applications: [
            {
                rl_id: 1,
                staff_id: 3,
                role_app_status: 'applied',
                app_ts: '2023-09-02T06:15:00.000Z',
                role_name: 'HR Manager'
            },
            {
                rl_id: 2,
                staff_id: 3,
                role_app_status: 'withdrawn',
                app_ts: '2023-09-05T02:30:00.000Z',
                role_name: 'Engineering Manager'
            }
        ],
        application: null,
        loading: false,
        error: {}
    },
    roleSkill: {
        roleSkills: [
            {
                role_id: 1,
                skill_id: 3,
                skill_name: 'Communication',
                skill_status: 'inactive'
            },
            {
                role_id: 1,
                skill_id: 6,
                skill_name: 'Teamwork',
                skill_status: 'inactive'
            }
        ],
        roleSkill: null,
        loading: false,
        error: {}
    }
});

