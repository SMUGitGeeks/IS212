import { getRoleListingsCreatedByHR } from "../../actions/roleListings";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import { Empty, List, Radio, RadioChangeEvent, Skeleton, Space, Tag, Tooltip } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, FormOutlined, ClockCircleOutlined } from '@ant-design/icons';


const HrRoleListings = ({ getRoleListingsCreatedByHR, roleListing: { hrRoleListings, loading }, auth: { user } }: any) => {
    useEffect(() => {
        if (user) {
            getRoleListingsCreatedByHR(user);
        }
    }, [getRoleListingsCreatedByHR, user]);

    const [listingState, setListingState] = useState("all");

    const selectChange = (e: RadioChangeEvent) => {
        setListingState(e.target.value);
        console.log(e.target.value)
    }

    return (
        // if HrRoleListings is not null, then print it out
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
            <Space direction="vertical" style={{width: '100%'}}>
            <Radio.Group value={listingState} buttonStyle="solid" onChange={selectChange}>
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="Closed">Closed</Radio.Button>
                <Radio.Button value={user}>My Created Listings</Radio.Button>
            </Radio.Group>
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
            }}
            dataSource={hrRoleListings}
            // footer={
            // <div>
            //     <b>ant design</b> footer part
            // </div>
            // }
            renderItem={(item: any) => (
                item.rl_status === listingState || item.rl_creator === listingState || listingState === "all" ?
                <List.Item
                    key={item.role_name}
                    extra={
                        <Space direction="vertical" size={30}>
                            <Tooltip placement="top" title='Edit'>
                                <FormOutlined style={{fontSize: 20}}/>
                            </Tooltip>
                        </Space>
                        
                    }
                >
                    <List.Item.Meta
                    title={item.role_name}
                    description={item.department}
                    />
                    <Space direction="horizontal" wrap size={40}>
                        <div><EnvironmentOutlined /> {item.location}</div>
                        <div><CalendarOutlined /> {new Date(item.rl_open).toLocaleDateString()} - {new Date(item.rl_close).toLocaleDateString()}</div>
                        <div><ClockCircleOutlined /> {new Date(item.rl_ts_create).toLocaleDateString()}</div>
                        <Tag color={item.rl_status === "Open" ? "green" : "red"} >{item.rl_status}</Tag>
                    </Space>
                    <br /><br />
                    <div>{item.rl_desc}</div>
                </List.Item> 
                : <></>
            )}
        />
        </Space>
        ) : (
            <div>
                <Empty description="No role listings found" />
            </div>
        )
    );

}

HrRoleListings.propTypes = {
    getRoleListingsCreatedByHR: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing,
    auth: state.auth,
});

export default connect(mapStateToProps, { getRoleListingsCreatedByHR })(HrRoleListings);