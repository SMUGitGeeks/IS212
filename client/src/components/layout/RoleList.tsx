import React, {useEffect} from 'react';
import {getRoleListings} from '../../actions/roleListings';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {List, Skeleton, Space, Progress, Typography} from 'antd';
import {Link} from 'react-router-dom';
import { getRoleSkillsByRoleId } from "../../actions/roleSkills";

const { Text } = Typography;

const RoleList = ({
                    getRoleListings,
                    roleListing: {roleListings, loading},
                    staffSkill: {staffSkill},
                    auth: {user, isHR}
                }: any) => {
    useEffect(() => {
        getRoleListings(user);

    }, [getRoleListings, user]);


    const date = new Date();

    return loading ?
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
        :
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={roleListings}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={(item: any) => (
                <Link to={`/roleListing/${item.rl_id}`}>
                    <List.Item
                        key={item.role_name}
                        // actions={[
                        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        // ]}
                        extra={
                            <>
                                <Space direction='vertical'>
                                    <Progress type="circle" size={60} percent={item.skill_match} 
                                    // <Progress type="circle" size={80} percent={90} 
                                    format={(percent) => 
                                    `${percent}%`
                                    } />
                                </Space>
                            </>
                        }
                    >
                        <List.Item.Meta
                            title={item.role_name}
                            // description={item.description}
                            description={date.getDate() - new Date(item.rl_open).getDate() + " days ago"}
                        />
                        {item.skill_match}
                        <br/>
                        {(isHR) &&
                            item.application_count + " applications submitted"}

                    </List.Item>
                </Link>

            )}
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

function useCallback(arg0: (skillsPerRole: any) => number) {
    throw new Error('Function not implemented.');
}
function useState<T>(arg0: {}): [any, any] {
    throw new Error('Function not implemented.');
}

