import React, {Fragment, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Col, Row, Select, SelectProps, Space, Typography, Button, Empty, List, Progress, Skeleton,} from 'antd';
import {rowGutterStyle} from '../../App';
import {getRoles} from '../../actions/roles';
import {
    sortRoleListingsByDate, 
    sortRoleListingsByName, 
    sortRoleListingsBySkillMatch,
    filterRoleListingsByDepartment,
    filterRoleListingsByLocation,
    filterRoleListingsByRoleId,
    getRoleListings
} from '../../actions/roleListings';
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {SearchOutlined, CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {getRoleSkillsByRoleId} from "../../actions/roleSkills";

interface filterOption {
    value: string;
    label: string;
}

const sortOptions: filterOption[] = [
    {
        value: 'asc',
        label: 'A-Z'
    },
    {
        value: 'desc',
        label: 'Z-A'
    },
    {
        value: 'recent',
        label: 'Most Recent'
    },
    {
        value: 'skillmatch',
        label: 'Skill Match'
    }
]

const {Title} = Typography;

const RoleListing = ({
                        getRoles,
                        getRoleListings,
                        role: {roles, loading},
                        roleListing: {rawRoleListings, filters},
                        roleListing: {roleListings},
                        auth: {user},
                    }: any) => {

    const dispatch = useDispatch();

    // RoleList component ====================================================
    useEffect(() => {
        if (roleListings.length === 0 || (filters.role.length === 0 && filters.department.length === 0 && filters.location.length === 0)) {
            getRoleListings(user);
        }
        if (roles.length === 0) {
            getRoles();
        }
    }, [getRoleListings,getRoles]);

    const [dataloaded, setDataLoaded] = useState(false);

    setTimeout(() => {
        setDataLoaded(true);
    }, 3000);

    const date = new Date();
    
    // Filter component ======================================================

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

    const [roleType, setRoleType] = useState(filters.role);
    const [location, setLocation] = useState(filters.location);
    const [department, setDepartment] = useState(filters.department);

    const handleRoleTypeChange = (roleIds: number[]) => {
        dispatch(filterRoleListingsByRoleId({roleIds}) as any);
        setRoleType(roleIds);
    }
    const handleDepartmentChange = (departments: string[]) => {
        dispatch(filterRoleListingsByDepartment({departments}) as any);
        setDepartment(departments);
    }
    const handleLocationChange = (locations: string[]) => {
        dispatch(filterRoleListingsByLocation({locations}) as any);
        setLocation(locations);
        
    }

    const onClick = () => {
        handleRoleTypeChange([]);
        handleDepartmentChange([]);
        handleLocationChange([]);
        console.log(document.getElementById("roleTypeSelect"))
    }

    // Sorting component ======================================================
    const onChange = (value: string) => {
        let direction = value;
        if (direction === 'recent') {
            dispatch(sortRoleListingsByDate({direction}) as any);
        } else if (direction === 'skillmatch') {
            dispatch(sortRoleListingsBySkillMatch({direction}) as any);
        } else {
            dispatch(sortRoleListingsByName({direction}) as any);
        }
    }

    return (
        <Container>
            <Space direction="vertical" size={16} style={{display: 'flex'}}>
                <div style={{marginTop: 20}}></div>
                <Row justify={'end'} gutter={rowGutterStyle}>
                    <Col>
                        <Select
                            style={{width: 200}}
                            placeholder="Sort by"
                            optionFilterProp="children"
                            filterOption={true}
                            options={sortOptions}
                            onChange={onChange}
                        />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row gutter={rowGutterStyle} justify={'center'}>
                    <Col xs={22} sm={22} md={22} lg={6} xl={5}>
                        <Fragment>
                            <Space direction='vertical' size="small" style={{width: "100%"}}>
                                <Title level={4}>Search Role Type</Title>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Please select"
                                    onChange={handleRoleTypeChange}
                                    options={roleTypes}
                                    optionFilterProp={"label"}
                                    suffixIcon={<SearchOutlined/>}
                                    allowClear
                                    value={roleType}
                                />
                            </Space>
                            <Space direction='vertical' size="small" style={{width: "100%"}}>
                                <Title level={4}>Search Location</Title>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Please select"
                                    onChange={handleLocationChange}
                                    options={locations}
                                    optionFilterProp={"label"}
                                    suffixIcon={<SearchOutlined/>}
                                    allowClear
                                    value={location}
                                />
                            </Space>
                            <Space direction='vertical' size="small" style={{width: "100%"}}>
                                <Title level={4}>Search Department</Title>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Please select"
                                    onChange={handleDepartmentChange}
                                    options={departments}
                                    optionFilterProp={"label"}
                                    suffixIcon={<SearchOutlined/>}
                                    allowClear
                                    value={department}
                                />
                            </Space>
                            <br/>
                            <br/>
                            <br/>
                            <Button type="dashed" block onClick={onClick}>
                                Clear All Filters
                            </Button>
                        </Fragment>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={0} xl={0} style={{padding: '20px'}}></Col>
                    <Col xs={22} sm={22} md={22} lg={15} xl={17}>
                        {
                            dataloaded && roleListings.length !== 0 ?
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={roleListings.length < 10 ? false : {
                                    onChange: (page) => {
                                    },
                                    pageSize: 10,
                                }}
                                dataSource={roleListings}
                                renderItem={(item: any) => (
                                    item.role_status === "active" && item.rl_status == "Open" && new Date(item.rl_open).getTime() <= date.getTime() ? 
                                    <Link to={`/roleListing/${item.rl_id}`}>
                                        <List.Item
                                            key={item.role_name}
                                            extra={
                                                <>
                                                    <Space direction='vertical'>
                                                        <div style={{fontStyle: "italic"}}>Skill Match</div>
                                                        <Progress type="circle" size={60} percent={item.skill_match}
                                                                format={(percent) =>
                                                                    `${percent}%`
                                                                }/>
                                                    </Space>
                                                </>
                                            }
                                            data-testid="role-listing"
                                        >
                                            <List.Item.Meta
                                                title={item.role_name}
                                                description={item.department}
                                            />
                                            <Space direction="horizontal" wrap size={[40, 10]}>
                                                <div>
                                                    <ClockCircleOutlined/> Posted {Math.round((date.getTime() - new Date(item.rl_open).getTime()) / (1000 * 60 * 60 * 24)) + " days ago"}
                                                </div>
                                                <div><CalendarOutlined/> Closing Date: {new Date(item.rl_close).toLocaleDateString("en-SG")}
                                                </div>
                                                <div><EnvironmentOutlined/> {item.location}</div>
                                            </Space>
                                            <br/><br/>
                                            <div>{item.rl_desc}</div>
                                        </List.Item>
                                    </Link> : <></>
                                )}
                            /> 
                            : dataloaded && roleListings.length === 0 ?
                            <div style={{height: '50vh', display: "flex", alignItems: "center"}}>
                                <Empty description='No Role Listings Available' style={{width: "100%"}}/>
                            </div> :
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={false}
                                dataSource={Array.from({length: 8}).map((_, i) => i)}
                                renderItem={(item: any) => (
                                    <List.Item
                                        key={item}
                                    >
                                        <Skeleton active title/>
                                    </List.Item>
                    
                                )}
                                data-testid="skeleton-list"
                            />
                        }
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

RoleListing.propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired,
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    staffSkill: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
    role: state.role,
    roleListing: state.roleListing,
    staffSkill: state.staffSkill,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getRoles, 
    getRoleListings, 
    getRoleSkillsByRoleId})(RoleListing);