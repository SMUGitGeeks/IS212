import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

const middlewares = [thunk]
const mockStore = configureStore<any>(middlewares);
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
                role_name: 'IT Technician',
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
                rl_source: 1,
                rl_open: '2023-09-29T16:00:00.000Z',
                rl_close: '2023-11-25T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-01T02:00:00.000Z',
                location: 'Thailand',
                department: 'Human Resources',
                rl_status: 'Open',
                skill_match: 100,
                role_name: 'HR Manager',
                role_description: 'Manage HR department',
                role_status: 'active',
                rl_updater_id: 1,
                update_time: '2023-10-13T08:51:43.000Z',
                application_count: 1
            },
            {
                rl_id: 2,
                role_id: 2,
                rl_desc: 'Designs and develops technical solutions, contributing to product innovation and solving complex problems.',
                rl_source: 2,
                rl_open: '2023-08-25T16:00:00.000Z',
                rl_close: '2023-11-09T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-05T01:30:00.000Z',
                location: 'Singapore',
                department: 'IT',
                rl_status: 'Open',
                rl_updater_id: 6,
                update_time: '2023-10-13T06:44:59.000Z',
                skill_match: 33,
                role_name: 'Engineering Manager',
                role_description: 'Manage Engineering department',
                role_status: 'active',
                application_count: 4
            },
            {
                rl_id: 3,
                role_id: 5,
                rl_desc: 'Supports and maintains IT systems, providing technical assistance, troubleshooting, and ensuring smooth operations.',
                rl_source: 7,
                rl_open: '2023-09-14T16:00:00.000Z',
                rl_close: '2023-11-29T16:00:00.000Z',
                rl_creator: 6,
                rl_ts_create: '2023-08-10T07:00:00.000Z',
                location: 'Malaysia',
                department: 'IT',
                rl_status: 'Open',
                skill_match: 0,
                role_name: 'IT Technician',
                role_description: 'Analyze data',
                role_status: 'active',
                application_count: 2
            },
            {
                rl_id: 4,
                role_id: 2,
                rl_desc: 'Manage data engineering projects',
                rl_source: 3,
                rl_open: '2023-08-13T16:00:00.000Z',
                rl_close: '2023-08-31T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-14T00:00:00.000Z',
                location: 'Singapore',
                department: 'Data',
                rl_status: 'Closed',
                skill_match: 33,
                role_name: 'Engineering Manager',
                role_description: 'Manage Engineering department',
                role_status: 'active',
                application_count: 0
            },
            {
                rl_id: 6,
                role_id: 3,
                rl_desc: 'Manage expense tracking and budgeting for 2024',
                rl_source: 3,
                rl_open: '2023-01-14T16:00:00.000Z',
                rl_close: '2023-01-24T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: null,
                location: 'Singapore',
                department: 'Finance',
                rl_status: 'Closed',
                skill_match: 50,
                role_name: 'Finance Staff',
                role_description: 'Work in Finance department',
                role_status: 'inactive',
                application_count: 0
            }
        ],
        rawRoleListings: [
            {
                rl_id: 1,
                role_id: 1,
                rl_desc: 'Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.',
                rl_source: 1,
                rl_open: '2023-09-29T16:00:00.000Z',
                rl_close: '2023-11-25T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-01T02:00:00.000Z',
                location: 'Thailand',
                department: 'Human Resources',
                rl_status: 'Open',
                skill_match: 100,
                role_name: 'HR Manager',
                role_description: 'Manage HR department',
                role_status: 'active',
                rl_updater_id: 1,
                update_time: '2023-10-13T08:51:43.000Z',
                application_count: 1
            },
            {
                rl_id: 2,
                role_id: 2,
                rl_desc: 'Designs and develops technical solutions, contributing to product innovation and solving complex problems.',
                rl_source: 2,
                rl_open: '2023-08-25T16:00:00.000Z',
                rl_close: '2023-11-09T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-05T01:30:00.000Z',
                location: 'Singapore',
                department: 'IT',
                rl_status: 'Open',
                rl_updater_id: 6,
                update_time: '2023-10-13T06:44:59.000Z',
                skill_match: 33,
                role_name: 'Engineering Manager',
                role_description: 'Manage Engineering department',
                role_status: 'active',
                application_count: 4
            },
            {
                rl_id: 3,
                role_id: 5,
                rl_desc: 'Supports and maintains IT systems, providing technical assistance, troubleshooting, and ensuring smooth operations.',
                rl_source: 7,
                rl_open: '2023-09-14T16:00:00.000Z',
                rl_close: '2023-11-29T16:00:00.000Z',
                rl_creator: 6,
                rl_ts_create: '2023-08-10T07:00:00.000Z',
                location: 'Malaysia',
                department: 'IT',
                rl_status: 'Open',
                skill_match: 0,
                role_name: 'IT Technician',
                role_description: 'Analyze data',
                role_status: 'active',
                application_count: 2
            },
            {
                rl_id: 4,
                role_id: 2,
                rl_desc: 'Manage data engineering projects',
                rl_source: 3,
                rl_open: '2023-08-13T16:00:00.000Z',
                rl_close: '2023-08-31T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: '2023-08-14T00:00:00.000Z',
                location: 'Singapore',
                department: 'Data',
                rl_status: 'Closed',
                skill_match: 33,
                role_name: 'Engineering Manager',
                role_description: 'Manage Engineering department',
                role_status: 'active',
                application_count: 0
            },
            {
                rl_id: 6,
                role_id: 3,
                rl_desc: 'Manage expense tracking and budgeting for 2024',
                rl_source: 3,
                rl_open: '2023-01-14T16:00:00.000Z',
                rl_close: '2023-01-24T16:00:00.000Z',
                rl_creator: 1,
                rl_ts_create: null,
                location: 'Singapore',
                department: 'Finance',
                rl_status: 'Closed',
                skill_match: 50,
                role_name: 'Finance Staff',
                role_description: 'Work in Finance department',
                role_status: 'inactive',
                application_count: 0
            }
        ],
        roleListing: {
            rl_id: 1,
            role_id: 1,
            rl_desc: 'Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.',
            rl_source: 1,
            rl_open: '2023-09-29T16:00:00.000Z',
            rl_close: '2023-11-25T16:00:00.000Z',
            rl_creator: 1,
            rl_ts_create: '2023-08-01T02:00:00.000Z',
            location: 'Thailand',
            department: 'Human Resources',
            role_name: 'HR Manager',
            role_description: 'Manage HR department',
            role_status: 'active',
            rl_updater_id: 1,
            update_time: '2023-10-13T08:51:43.000Z',
            rl_updater: 'John Doe'
        },
        loading: false,
        error: {},
        filters: {
            role: [],
            location: [],
            department: []
        }
    },
    auth: {
        user: 1,
        loading: false,
        error: {},
        isHR: true
    },
    staffSkill: {
        staffSkills: [],
        staffSkill: [
            {
                staff_id: 1,
                skill_id: 1,
                ss_status: 'active',
                skill_name: 'Java Programming',
                skill_status: 'active'
            },
            {
                staff_id: 1,
                skill_id: 3,
                ss_status: 'active',
                skill_name: 'Communication',
                skill_status: 'active'
            },
            {
                staff_id: 1,
                skill_id: 7,
                ss_status: 'in-progress',
                skill_name: 'Financial Analysis',
                skill_status: 'active'
            },
            {
                staff_id: 1,
                skill_id: 9,
                ss_status: 'active',
                skill_name: 'Accounting',
                skill_status: 'active'
            },
            {
                staff_id: 1,
                skill_id: 10,
                ss_status: 'active',
                skill_name: 'HR management',
                skill_status: 'active'
            }
        ],
        loading: false,
        error: {}
    },
    application: {
        applications: [],
        application: [],
        loading: false,
        error: {
            msg: 'Not Found',
            status: 404
        }
    },
    roleSkill: {
        roleSkills: [
            {
                role_id: 1,
                skill_id: 3,
                skill_name: 'Communication',
                skill_status: 'active'
            },
            {
                role_id: 1,
                skill_id: 6,
                skill_name: 'Teamwork',
                skill_status: 'inactive'
            },
            {
                role_id: 1,
                skill_id: 10,
                skill_name: 'HR management',
                skill_status: 'active'
            }
        ],
        roleSkill: null,
        loading: false,
        error: {}
    },
    staffListing: {
        staffListings: [
            {
                staff_id: 1,
                fname: 'John',
                lname: 'Doe',
                dept: 'HR',
                email: 'john@example.com',
                phone: '123-456-7890',
                biz_address: '123 Main St',
                sys_role: 'hr',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 1,
                        skill_name: 'Java Programming',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 3,
                        skill_name: 'Communication',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 7,
                        skill_name: 'Financial Analysis',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 9,
                        skill_name: 'Accounting',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 10,
                        skill_name: 'HR management',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 2,
                fname: 'Jane',
                lname: 'Smith',
                dept: 'Engineering',
                email: 'jane@example.com',
                phone: '987-654-3210',
                biz_address: '456 Elm St',
                sys_role: 'manager',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 1,
                        skill_name: 'Java Programming',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 3,
                fname: 'Alice',
                lname: 'Johnson',
                dept: 'Engineering',
                email: 'alice@example.com',
                phone: '555-123-4567',
                biz_address: '456 Elm St',
                sys_role: 'staff',
                is_subscribed: 0,
                skills: [
                    {
                        skill_id: 2,
                        skill_name: 'Data Analysis',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 4,
                        skill_name: 'Python Programming',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 5,
                        skill_name: 'Data Visualization',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 6,
                        skill_name: 'Teamwork',
                        skill_status: 'inactive'
                    }
                ]
            },
            {
                staff_id: 4,
                fname: 'Sarah',
                lname: 'Wilson',
                dept: 'Engineering',
                email: 'sarah.wilson@example.com',
                phone: '555-444-5555',
                biz_address: '456 Elm St',
                sys_role: 'staff',
                is_subscribed: 0,
                skills: [
                    {
                        skill_id: 4,
                        skill_name: 'Python Programming',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 5,
                fname: 'William',
                lname: 'Smith',
                dept: 'IT',
                email: 'william.smith@example.com',
                phone: '555-666-7777',
                biz_address: '444 Pine St',
                sys_role: 'staff',
                is_subscribed: 1,
                skills: []
            },
            {
                staff_id: 6,
                fname: 'Olivia',
                lname: 'Anderson',
                dept: 'HR',
                email: 'olivia.anderson@example.com',
                phone: '555-888-9999',
                biz_address: '222 Main St',
                sys_role: 'hr',
                is_subscribed: 0,
                skills: [
                    {
                        skill_id: 1,
                        skill_name: 'Java Programming',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 6,
                        skill_name: 'Teamwork',
                        skill_status: 'inactive'
                    }
                ]
            },
            {
                staff_id: 7,
                fname: 'Ethan',
                lname: 'Taylor',
                dept: 'IT',
                email: 'ethan.taylor@example.com',
                phone: '555-111-3333',
                biz_address: '444 Pine St',
                sys_role: 'manager',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 7,
                        skill_name: 'Financial Analysis',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 8,
                fname: 'Ava',
                lname: 'Brown',
                dept: 'IT',
                email: 'ava.brown@example.com',
                phone: '555-222-4444',
                biz_address: '444 Pine St',
                sys_role: 'staff',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 6,
                        skill_name: 'Teamwork',
                        skill_status: 'inactive'
                    },
                    {
                        skill_id: 8,
                        skill_name: 'Customer Service',
                        skill_status: 'inactive'
                    }
                ]
            }
        ],
        staffListingsByRLId: [
            {
                rl_id: 2,
                staff_id: 2,
                role_app_status: 'applied',
                app_ts: '2023-09-10T03:45:00.000Z',
                app_text: 'interesting job requirement',
                role_id: 2,
                fname: 'Jane',
                lname: 'Smith',
                dept: 'Engineering',
                email: 'jane@example.com',
                phone: '987-654-3210',
                biz_address: '456 Elm St',
                sys_role: 'manager',
                skill_match: 33
              },
              {
                rl_id: 2,
                staff_id: 3,
                role_app_status: 'withdrawn',
                app_ts: '2023-09-07T06:30:00.000Z',
                app_text: null,
                role_id: 2,
                fname: 'Alice',
                lname: 'Johnson',
                dept: 'Engineering',
                email: 'alice@example.com',
                phone: '555-123-4567',
                biz_address: '456 Elm St',
                sys_role: 'staff',
                skill_match: 33
              },
              {
                rl_id: 2,
                staff_id: 4,
                role_app_status: 'applied',
                app_ts: '2023-09-07T06:30:00.000Z',
                app_text: 'blah blah blah',
                role_id: 2,
                fname: 'Sarah',
                lname: 'Wilson',
                dept: 'Engineering',
                email: 'sarah.wilson@example.com',
                phone: '555-444-5555',
                biz_address: '456 Elm St',
                sys_role: 'staff',
                skill_match: 0
              },
              {
                rl_id: 2,
                staff_id: 8,
                role_app_status: 'applied',
                app_ts: '2023-09-07T06:30:00.000Z',
                app_text: 'this is all text and it should work even though it is long, make sure it is displayed properly',
                role_id: 2,
                fname: 'Ava',
                lname: 'Brown',
                dept: 'IT',
                email: 'ava.brown@example.com',
                phone: '555-222-4444',
                biz_address: '444 Pine St',
                sys_role: 'staff',
                skill_match: 0
              }
        ],
        rawStaffListings: [
            {
                staff_id: 1,
                fname: 'John',
                lname: 'Doe',
                dept: 'HR',
                email: 'john@example.com',
                phone: '123-456-7890',
                biz_address: '123 Main St',
                sys_role: 'hr',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 1,
                        skill_name: 'Java Programming',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 3,
                        skill_name: 'Communication',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 7,
                        skill_name: 'Financial Analysis',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 9,
                        skill_name: 'Accounting',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 10,
                        skill_name: 'HR management',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 2,
                fname: 'Jane',
                lname: 'Smith',
                dept: 'Engineering',
                email: 'jane@example.com',
                phone: '987-654-3210',
                biz_address: '456 Elm St',
                sys_role: 'manager',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 1,
                        skill_name: 'Java Programming',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 3,
                fname: 'Alice',
                lname: 'Johnson',
                dept: 'Engineering',
                email: 'alice@example.com',
                phone: '555-123-4567',
                biz_address: '456 Elm St',
                sys_role: 'staff',
                is_subscribed: 0,
                skills: [
                    {
                        skill_id: 2,
                        skill_name: 'Data Analysis',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 4,
                        skill_name: 'Python Programming',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 5,
                        skill_name: 'Data Visualization',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 6,
                        skill_name: 'Teamwork',
                        skill_status: 'inactive'
                    }
                ]
            },
            {
                staff_id: 4,
                fname: 'Sarah',
                lname: 'Wilson',
                dept: 'Engineering',
                email: 'sarah.wilson@example.com',
                phone: '555-444-5555',
                biz_address: '456 Elm St',
                sys_role: 'staff',
                is_subscribed: 0,
                skills: [
                    {
                        skill_id: 4,
                        skill_name: 'Python Programming',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 5,
                fname: 'William',
                lname: 'Smith',
                dept: 'IT',
                email: 'william.smith@example.com',
                phone: '555-666-7777',
                biz_address: '444 Pine St',
                sys_role: 'staff',
                is_subscribed: 1,
                skills: []
            },
            {
                staff_id: 6,
                fname: 'Olivia',
                lname: 'Anderson',
                dept: 'HR',
                email: 'olivia.anderson@example.com',
                phone: '555-888-9999',
                biz_address: '222 Main St',
                sys_role: 'hr',
                is_subscribed: 0,
                skills: [
                    {
                        skill_id: 1,
                        skill_name: 'Java Programming',
                        skill_status: 'active'
                    },
                    {
                        skill_id: 6,
                        skill_name: 'Teamwork',
                        skill_status: 'inactive'
                    }
                ]
            },
            {
                staff_id: 7,
                fname: 'Ethan',
                lname: 'Taylor',
                dept: 'IT',
                email: 'ethan.taylor@example.com',
                phone: '555-111-3333',
                biz_address: '444 Pine St',
                sys_role: 'manager',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 7,
                        skill_name: 'Financial Analysis',
                        skill_status: 'active'
                    }
                ]
            },
            {
                staff_id: 8,
                fname: 'Ava',
                lname: 'Brown',
                dept: 'IT',
                email: 'ava.brown@example.com',
                phone: '555-222-4444',
                biz_address: '444 Pine St',
                sys_role: 'staff',
                is_subscribed: 1,
                skills: [
                    {
                        skill_id: 6,
                        skill_name: 'Teamwork',
                        skill_status: 'inactive'
                    },
                    {
                        skill_id: 8,
                        skill_name: 'Customer Service',
                        skill_status: 'inactive'
                    }
                ]
            }
        ],
        staffListing: {
            staff_id: 1,
            fname: 'John',
            lname: 'Doe',
            dept: 'HR',
            email: 'john@example.com',
            phone: '123-456-7890',
            biz_address: '123 Main St',
            sys_role: 'hr',
            is_subscribed: 1,
            skills: [
                {
                    skill_id: 1,
                    skill_name: 'Java Programming',
                    skill_status: 'active'
                },
                {
                    skill_id: 3,
                    skill_name: 'Communication',
                    skill_status: 'active'
                },
                {
                    skill_id: 7,
                    skill_name: 'Financial Analysis',
                    skill_status: 'active'
                },
                {
                    skill_id: 9,
                    skill_name: 'Accounting',
                    skill_status: 'active'
                },
                {
                    skill_id: 10,
                    skill_name: 'HR management',
                    skill_status: 'active'
                }
            ]
        },
        loading: false,
        error: {}
    },
    skill: {
        skills: [],
        skill: null,
        loading: true,
        error: {}
    }
});

