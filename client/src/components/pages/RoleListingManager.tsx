import React, {useEffect, useState} from "react";
import {Col, Row, Select, SelectProps, Empty, List, Radio, RadioChangeEvent, Skeleton, Space, Tag, Tooltip} from "antd";
import {Container} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {getRoles} from '../../actions/roles';
import { rowGutterStyle } from "../../App";
import { filterRoleListingsByRoleId, getRoleListings } from "../../actions/roleListings";
import {
    CalendarOutlined,
    EnvironmentOutlined,
    FormOutlined,
    LoadingOutlined,
    BankOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {getStaffListings} from "../../actions/staffListings";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

const RoleListingManager = ({
                                getRoles, 
                                role: {roles, loading},
                                getRoleListings,
                                roleListing: {roleListings},
                                auth: {user}, 
                                getStaffListings,
                                staffListing
                            }: any) => {

    // Role Listing component =====================================
    useEffect(() => {
        if (user) {
            getRoleListings(user);
            getStaffListings();
        }
        if (roles.length === 0) {
            getRoles();
        }
    }, [getRoleListings, getStaffListings, getRoles]);

    const [dataloaded, setDataLoaded] = useState(false);

    setTimeout(() => {
        setDataLoaded(true);
    }, roleListings.length !== 0 ? 500: 3000);

    const [listingState, setListingState] = useState("all");
    const navigate = useNavigate();

    const selectChange = (e: RadioChangeEvent) => {
        setListingState(e.target.value);
    }

    const getHRName = (id: number) => {
        let staff = staffListing.staffListings.find((staffListing: any) => staffListing.staff_id === id);
        return staff.fname + " " + staff.lname;
    }

    const today = new Date();

    const filteredListings = roleListings ? roleListings.filter((item: any) => {
        return (
            item.rl_status === listingState ||
            listingState === "all" ||
            (listingState === "scheduled" && new Date(item.rl_open) > today) ||
            (listingState === "inactive" && item.role_status === "inactive")
        );
    }) : true;

    // Filter component ===========================================
    
    const dispatch = useDispatch();

    let roleTypes: SelectProps['options'] = [
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
    }
    
    const handleChange = (roleIds: number[]) => {
        dispatch(filterRoleListingsByRoleId({roleIds}) as any);
    }

    return (
        <Container>
            <Space direction="vertical" size={40} style={{width: "100%"}}>
                <div></div>
                <Row gutter={rowGutterStyle} justify='center'>
                    <Col span={22}>
                        <Select
                            mode="multiple"
                            showSearch
                            style={{width: '100%'}}
                            placeholder="Search Roles"
                            defaultValue={[]}
                            onChange={handleChange}
                            options={roleTypes}
                            optionFilterProp={"label"}
                            suffixIcon={<SearchOutlined/>}
                            size="large"
                            allowClear
                        />
                    </Col>
                </Row>
                <Row gutter={rowGutterStyle} justify='center'>
                    <Col span={22}>
                        <Space direction="vertical" style={{width: '100%'}}>
                            <Radio.Group value={listingState} buttonStyle="solid" onChange={selectChange} style={{userSelect: 'none'}}>
                                <Radio.Button value="all">All</Radio.Button>
                                <Radio.Button value="scheduled">Scheduled</Radio.Button>
                                <Radio.Button value="Open">Open</Radio.Button>
                                <Radio.Button value="Closed">Closed</Radio.Button>
                                <Radio.Button value="inactive">Inactive</Radio.Button>
                            </Radio.Group>
                            {
                                dataloaded && roleListings.length !== 0 ? (
                                    <List
                                        itemLayout="vertical"
                                        size="large"
                                        pagination={ roleListings.length > 10 ? {
                                            onChange: (page) => {
                                            },
                                            pageSize: 10,
                                        } : false}
                                        dataSource={filteredListings}
                                        renderItem={(item: any) => (
                                                <List.Item
                                                    key={item.role_name}
                                                    extra={ item.role_status === "active" ?
                                                        <Space direction="vertical" size={30}>
                                                            <Tooltip placement="top" title='Edit'>
                                                            <span onClick={() => navigate("/listingManage/update/" + item.rl_id)} data-testid="edit-icon-click">
                                                                <FormOutlined style={{fontSize: 20, cursor: "pointer"}}/>
                                                            </span>
                                                            </Tooltip>
                                                        </Space>  :
                                                        <></>
                                                    }
                                                    style={{cursor: "pointer"}}
                                                >
                                                    <Link to={`/listingManage/${item.rl_id}`} style={{textDecoration: "none", color: "black"}} data-testid="one-listing">
                                                    <List.Item.Meta
                                                        title={
                                                            <Space size={10}>
                                                            {item.role_name}
                                                                <Space size={3} wrap>
                                                                    <Tag color={item.rl_status === "Open" ? "green" : "red"} data-testid="status">{item.rl_status}</Tag>
                                                                    { item.role_status !== "active" ?
                                                                        <Tag data-testid="status">Inactive</Tag> :
                                                                        <></>
                                                                    }
                                                                </Space>
                                                            </Space>
                                                        }
                                                        description={
                                                            <Space direction="horizontal" wrap size={40}>
                                                                <div><BankOutlined /> {item.department}</div>

                                                                <div><EnvironmentOutlined/> {item.location}</div>
                                                                <div>
                                                                    <CalendarOutlined/> {new Date(item.rl_open).toLocaleDateString("en-SG")} - {new Date(item.rl_close).toLocaleDateString("en-SG")}
                                                                </div>
                                                            </Space>
                                                        }
                                                    />
                                                    
                                                    <Space direction="horizontal" wrap size={66} style={{fontStyle: "italic"}}>
                                                        <span>
                                                            <strong>Creator: </strong>
                                                            {staffListing.loading ? <LoadingOutlined/> :
                                                                <span> {getHRName(item.rl_creator)} | {new Date(item.rl_ts_create).toLocaleDateString('en-sg')} </span>}
                                                        </span>
                                                        {item.rl_updater_id === undefined ? <></> :
                                                            <span>
                                                                <strong>Last Updator: </strong>
                                                                {staffListing.loading ? <LoadingOutlined/> :
                                                                <span> {getHRName(item.rl_updater_id)} | {new Date(item.update_time).toLocaleDateString('en-sg')} </span>}
                                                            </span>
                                                        }
                                                    </Space>
                                                    <br/><br/>
                                                    <div>{item.rl_desc}</div>
                                                    </Link>
                                                </List.Item>
                                        )}
                                        
                                    />
                                ) : dataloaded && roleListings.length === 0 ? (
                                    <div>
                                        <Empty description="No role listings found"/>
                                    </div>
                                ) : (
                                    <List
                                        id="list"
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
                                )
                            }
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

RoleListingManager.propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired,
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getStaffListings: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
    role: state.role,
    roleListing: state.roleListing,
    auth: state.auth,
    staffListing: state.staffListing,
});

export default connect(mapStateToProps, {getRoles, getRoleListings, getStaffListings})(RoleListingManager);