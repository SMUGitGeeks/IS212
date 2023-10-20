import {Select, SelectProps, Space, Typography} from "antd";
import {getRoles} from '../../actions/roles';
import {
    filterRoleListingsByDepartment,
    filterRoleListingsByLocation,
    filterRoleListingsByRoleId,
    getRoleListings
} from '../../actions/roleListings';
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {Fragment, useEffect} from "react";
import {SearchOutlined} from '@ant-design/icons';

const {Title} = Typography;

const RoleSearchFilter = ({
                              getRoles,
                              getRoleListings,
                              role: {roles, loading},
                              roleListing: {rawRoleListings}
                          }: any,) => {

    useEffect(() => {
        getRoles();
        getRoleListings();
    }, [getRoles, getRoleListings]);
    const dispatch = useDispatch();

    let roleTypes: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];
    let locations: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];
    let departments: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];

    if (!loading) {
        roleTypes = roles.map((role: any) => {
            return {
                label: role.role_name,
                value: role.role_id,
            }
        });
        // get all of the possible unique locations from roleListings
        // roleListings: [
        //       {
        //         rl_id: 1,
        //         role_id: 1,
        //         rl_desc: 'Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.',
        //         rl_source: 1,
        //         rl_open: '2023-09-29T16:00:00.000Z',
        //         rl_close: '2023-11-25T16:00:00.000Z',
        //         rl_creator: 1,
        //         rl_ts_create: '2023-08-01T02:00:00.000Z',
        //         location: 'Thailand',
        //         department: 'Human Resources',
        //         skill_match: 0,
        //         role_name: 'HR Manager',
        //         role_description: 'Manage HR department',
        //         role_status: 'active',
        //         application_count: 1
        //       },
        //       {
        //         rl_id: 2,
        //         role_id: 2,
        //         rl_desc: 'Designs and develops technical solutions, contributing to product innovation and solving complex problems.',
        //         rl_source: 2,
        //         rl_open: '2023-08-25T16:00:00.000Z',
        //         rl_close: '2023-11-09T16:00:00.000Z',
        //         rl_creator: 1,
        //         rl_ts_create: '2023-08-05T01:30:00.000Z',
        //         location: 'Singapore',
        //         department: 'IT',
        //         skill_match: 33,
        //         role_name: 'Engineering Manager',
        //         role_description: 'Manage Engineering department',
        //         role_status: 'active',
        //         application_count: 4
        //       },
        //       {
        //         rl_id: 3,
        //         role_id: 5,
        //         rl_desc: 'Supports and maintains IT systems, providing technical assistance, troubleshooting, and ensuring smooth operations.',
        //         rl_source: 7,
        //         rl_open: '2023-09-14T16:00:00.000Z',
        //         rl_close: '2023-11-29T16:00:00.000Z',
        //         rl_creator: 6,
        //         rl_ts_create: '2023-08-10T07:00:00.000Z',
        //         location: 'Malaysia',
        //         department: 'IT',
        //         skill_match: 100,
        //         role_name: 'IT Technician',
        //         role_description: 'Analyze data',
        //         role_status: 'active',
        //         application_count: 2
        //       }
        //     ]
        // make sure it dont print duplicate
        locations = [];
        departments = [];
        for (let i = 0; i < rawRoleListings.length; i++) {
            if (!locations.some((location: any) => location.value === rawRoleListings[i].location)) {
                locations.push({
                    label: rawRoleListings[i].location,
                    value: rawRoleListings[i].location,
                })
            }
            if (!departments.some((department: any) => department.value === rawRoleListings[i].department)) {
                departments.push({
                    label: rawRoleListings[i].department,
                    value: rawRoleListings[i].department,
                })
            }
        }
    }

    const handleRoleTypeChange = (roleIds: number[]) => {
        dispatch(filterRoleListingsByRoleId({roleIds}) as any);
    }
    const handleDepartmentChange = (departments: string[]) => {
        dispatch(filterRoleListingsByDepartment({departments}) as any);
    }
    const handleLocationChange = (locations: string[]) => {
        dispatch(filterRoleListingsByLocation({locations}) as any);
    }


    return (
        <Fragment>
            <Space direction='vertical' size="small" style={{width: "100%"}}>
                <Title level={4}>Search Role Type</Title>
                <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Please select"
                    defaultValue={[]}
                    onChange={handleRoleTypeChange}
                    options={roleTypes}
                    optionFilterProp={"label"}
                    suffixIcon={<SearchOutlined/>}
                />
            </Space>
            <Space direction='vertical' size="small" style={{width: "100%"}}>
                <Title level={4}>Search Location</Title>
                <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Please select"
                    defaultValue={[]}
                    onChange={handleLocationChange}
                    options={locations}
                    optionFilterProp={"label"}
                    suffixIcon={<SearchOutlined/>}
                />
            </Space>
            <Space direction='vertical' size="small" style={{width: "100%"}}>
                <Title level={4}>Search Department</Title>
                <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Please select"
                    defaultValue={[]}
                    onChange={handleDepartmentChange}
                    options={departments}
                    optionFilterProp={"label"}
                    suffixIcon={<SearchOutlined/>}
                />
            </Space>
        </Fragment>

    );
}

RoleSearchFilter.propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired,
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
    role: state.role,
    roleListing: state.roleListing
});

export default connect(mapStateToProps, {getRoles, getRoleListings})(RoleSearchFilter);