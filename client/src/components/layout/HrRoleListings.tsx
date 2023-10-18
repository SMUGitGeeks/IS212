import {getRoleListingsCreatedByHR} from "../../actions/roleListings";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Empty, List, Radio, RadioChangeEvent, Skeleton, Space, Tag, Tooltip} from 'antd';
import Icon, {
    CalendarOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    FormOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import {getStaffListings} from "../../actions/staffListings";
import type {CustomIconComponentProps} from '@ant-design/icons/lib/components/Icon';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

const CreatorSvg = () => (
    <svg width="14" height="14" viewBox="0 3 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.56 11.87C9.81832 11.87 9.0933 11.6501 8.47661 11.238C7.85993 10.826 7.37928 10.2403 7.09545 9.55506C6.81162 8.86984 6.73736 8.11584 6.88205 7.38841C7.02675 6.66098 7.3839 5.99279 7.90835 5.46835C8.4328 4.9439 9.10098 4.58675 9.82841 4.44205C10.5558 4.29736 11.3098 4.37162 11.9951 4.65545C12.6803 4.93928 13.266 5.41992 13.678 6.03661C14.0901 6.65329 14.31 7.37832 14.31 8.12C14.3074 9.11375 13.9114 10.066 13.2087 10.7687C12.506 11.4714 11.5538 11.8674 10.56 11.87ZM10.56 5.87C10.115 5.87 9.67998 6.00196 9.30997 6.24919C8.93996 6.49642 8.65157 6.84783 8.48127 7.25896C8.31097 7.67009 8.26642 8.12249 8.35323 8.55895C8.44005 8.99541 8.65434 9.39632 8.96901 9.71099C9.28368 10.0257 9.68459 10.2399 10.121 10.3268C10.5575 10.4136 11.0099 10.369 11.421 10.1987C11.8322 10.0284 12.1836 9.74004 12.4308 9.37003C12.678 9.00002 12.81 8.565 12.81 8.12C12.81 7.52326 12.5729 6.95096 12.151 6.52901C11.729 6.10705 11.1567 5.87 10.56 5.87Z"
            fill="#000000"/>
        <path
            d="M3.56 18.87C3.36109 18.87 3.17032 18.791 3.02967 18.6503C2.88902 18.5097 2.81 18.3189 2.81 18.12C2.81 13.37 8.24 13.37 10.56 13.37C11.28 13.37 11.92 13.37 12.5 13.44C12.6973 13.4553 12.8805 13.548 13.0098 13.6979C13.139 13.8477 13.2038 14.0426 13.19 14.24C13.1722 14.4381 13.0773 14.6214 12.9259 14.7504C12.7744 14.8794 12.5785 14.9439 12.38 14.93C11.84 14.93 11.24 14.87 10.56 14.87C5.38 14.87 4.31 16.17 4.31 18.12C4.31134 18.2189 4.29286 18.317 4.25565 18.4086C4.21843 18.5002 4.16324 18.5834 4.09333 18.6533C4.02341 18.7232 3.9402 18.7784 3.84859 18.8156C3.75699 18.8529 3.65886 18.8713 3.56 18.87Z"
            fill="#000000"/>
        <path
            d="M12.67 19.63C12.4711 19.6299 12.2805 19.5507 12.14 19.41C12.061 19.3348 12.0002 19.2426 11.9621 19.1404C11.9239 19.0382 11.9096 18.9286 11.92 18.82L12.08 16.9C12.0923 16.7235 12.1667 16.557 12.29 16.43L17.81 10.91C18.1908 10.5572 18.6908 10.3612 19.21 10.3612C19.7291 10.3612 20.2291 10.5572 20.61 10.91C20.7978 11.0993 20.9458 11.3242 21.0454 11.5715C21.145 11.8188 21.1942 12.0835 21.19 12.35C21.1939 12.5958 21.149 12.8398 21.0581 13.0681C20.9671 13.2964 20.8318 13.5044 20.66 13.68L15.14 19.2C15.0176 19.3256 14.8545 19.4035 14.68 19.42L12.74 19.6L12.67 19.63ZM13.55 17.29L13.49 18.05L14.27 17.98L19.6 12.65C19.6629 12.5746 19.6951 12.4782 19.69 12.38C19.6896 12.2408 19.64 12.1062 19.55 12C19.4517 11.927 19.3325 11.8875 19.21 11.8875C19.0875 11.8875 18.9683 11.927 18.87 12L13.55 17.29Z"
            fill="#000000"/>
    </svg>
);

const CreatorIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CreatorSvg} {...props} />
);

const HrRoleListings = ({
                            getRoleListingsCreatedByHR,
                            roleListing: {hrRoleListings, loading},
                            auth: {user}, getStaffListings,
                            staffListing
                        }: any) => {
    useEffect(() => {
        if (user) {
            getRoleListingsCreatedByHR(user);
            getStaffListings();
        }
    }, [getRoleListingsCreatedByHR, getStaffListings]);

    const [listingState, setListingState] = useState("all");
    const navigate = useNavigate();

    const selectChange = (e: RadioChangeEvent) => {
        setListingState(e.target.value);
    }

    const getHRName = (id: number) => {
        let staff = staffListing.staffListings.find((staffListing: any) => staffListing.staff_id === id);
        return staff.fname + " " + staff.lname;
    }

    return (
        <Space direction="vertical" style={{width: '100%'}}>
            <Radio.Group value={listingState} buttonStyle="solid" onChange={selectChange}>
                <Radio.Button value="all">My Created Listings</Radio.Button>
                <Radio.Button value="Closed">Closed</Radio.Button>
            </Radio.Group>
            {
                loading ? (
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                pageSize: 10,
                            }}
                            dataSource={Array.from({length: 8}).map((_, i) => i)}
                            renderItem={(item: any) => (
                                <List.Item
                                    key={item}
                                >
                                    <Skeleton active title/>
                                </List.Item>

                            )}
                        />
                    ) :
                    hrRoleListings !== null ? (
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={ hrRoleListings.length > 10 ? {
                                onChange: (page) => {
                                },
                                pageSize: 10,
                            } : false}
                            dataSource={hrRoleListings}
                            renderItem={(item: any) => (
                                item.rl_status === listingState || listingState === "all" ?
                                    <Link to={`/listingManage/${item.rl_id}`}>
                                    <List.Item
                                        key={item.role_name}
                                        extra={
                                            <Space direction="vertical" size={30}>
                                                <Tooltip placement="top" title='Edit'>
                                                <span onClick={() => navigate("/listingManage/update/" + item.rl_id)}>
                                                    <FormOutlined style={{fontSize: 20}}/>
                                                </span>
                                                </Tooltip>
                                            </Space>
                                        }
                                    >
                                        <List.Item.Meta
                                            title={item.role_name}
                                            description={item.department}
                                        />
                                        <Space direction="horizontal" wrap size={40}>
                                            <Tag
                                                color={item.rl_status === "Open" ? "green" : "red"}>{item.rl_status}</Tag>
                                            <div><EnvironmentOutlined/> {item.location}</div>
                                            <div>
                                                <CalendarOutlined/> {new Date(item.rl_open).toLocaleDateString()} - {new Date(item.rl_close).toLocaleDateString()}
                                            </div>
                                        </Space>
                                        <br /><br />
                                        <Space direction="horizontal" wrap size={66}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <CreatorIcon/>
                                                &nbsp;&nbsp;
                                                <span>Created by: {staffListing.loading ? <LoadingOutlined/> :
                                                    getHRName(item.rl_creator)}</span>
                                            </div>
                                            <div>
                                                <ClockCircleOutlined /> Created on: {new Date(item.rl_ts_create).toLocaleDateString()}
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <CreatorIcon/>
                                                &nbsp;&nbsp;
                                                <span>Last Updated by: {staffListing.loading ? <LoadingOutlined/> :
                                                    getHRName(item.rl_creator)}</span>
                                            </div>
                                            <div>
                                                <ClockCircleOutlined /> Last Updated on: "insert"
                                            </div>
                                        </Space>
                                        <br/><br/>
                                        <div>{item.rl_desc}</div>
                                    </List.Item>
                                    </Link>
                                    : <></>
                            )}
                        />
                    ) : (
                        <div>
                            <Empty description="No role listings found"/>
                        </div>
                    )
            }
        </Space>
    );
}

HrRoleListings.propTypes = {
    getRoleListingsCreatedByHR: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getStaffListings: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing,
    auth: state.auth,
    staffListing: state.staffListing,
});

export default connect(mapStateToProps, {getRoleListingsCreatedByHR, getStaffListings})(HrRoleListings);