import React, {useEffect, useState} from 'react';
import {getRoleListings} from '../../actions/roleListings';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Empty, List, Progress, Skeleton, Space} from 'antd';
import {Link} from 'react-router-dom';
import {getRoleSkillsByRoleId} from "../../actions/roleSkills";
import {CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined} from '@ant-design/icons';

const RoleList = ({
                    getRoleListings,
                    roleListing: {roleListings},
                    auth: {user}
                }: any) => {
    useEffect(() => {
        if (roleListings.length === 0) {
            getRoleListings(user);
        }
    }, [getRoleListings, roleListings]);

    const [dataloaded, setDataLoaded] = useState(false);

    setTimeout(() => {
        setDataLoaded(true);
    }, 3000);

    const date = new Date();

    return dataloaded && roleListings.length !== 0 ?
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
                <Link to={`/roleListing/${item.rl_id}`}>
                    <List.Item
                        key={item.role_name}
                        extra={
                            <>
                                <Space direction='vertical'>
                                    <div style={{fontStyle: "italic"}}>Skill Match</div>
                                    <Progress type="circle" size={60} percent={item.skill_match}
                                        // <Progress type="circle" size={80} percent={90}
                                            format={(percent) =>
                                                `${percent}%`
                                            }/>
                                </Space>
                            </>
                        }
                    >
                        <List.Item.Meta
                            title={item.role_name}
                            description={item.department}
                        />
                        <Space direction="horizontal" wrap size={[40, 10]}>
                            <div>
                                <ClockCircleOutlined/> Posted {Math.round((date.getTime() - new Date(item.rl_open).getTime()) / (1000 * 60 * 60 * 24)) + " days ago"}
                            </div>
                            <div><CalendarOutlined/> Closing Date: {new Date(item.rl_close).toLocaleDateString()}
                            </div>
                            <div><EnvironmentOutlined/> {item.location}</div>
                        </Space>
                        <br/><br/>
                        <div>{item.rl_desc}</div>
                    </List.Item>
                </Link>
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

RoleList.propTypes = {
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    staffSkill: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing,
    staffSkill: state.staffSkill,
    auth: state.auth
});

export default connect(mapStateToProps, {getRoleSkillsByRoleId, getRoleListings})(RoleList);

