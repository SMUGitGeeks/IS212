import { Radio, Space, Card, RadioChangeEvent, Tag, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { getStaffSkillsByStaffId } from "../../actions/staffSkills";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { CheckCircleOutlined, ClockCircleOutlined, LoadingOutlined } from "@ant-design/icons";

const ProfileSkills = ({getStaffSkillsByStaffId, staffSkills: { staffSkills, loading }, auth: {user}}: any) => {
    useEffect(() => {
        if (user) {
            getStaffSkillsByStaffId(user);
        }
    }, [getStaffSkillsByStaffId, user]);

    const [skillState, setSkillState] = useState("all");

    const selectChange = (e: RadioChangeEvent) => {
        setSkillState(e.target.value);
    }

    const color = (status: String) => {
        if (status === "active") {
            return "green";
        } else if (status === "in-progress") {
            return "gold";
        } else {
            return "default";
        }
    }

    const tagIcon = (status: String) => {
        if (status === "active") {
            return <CheckCircleOutlined />;
        } else if (status === "in-progress") {
            return <ClockCircleOutlined />;
        } else {
            return <></>;
        }
    }

    return (
        <Card>
            <Space size={20} direction="vertical" style={{width: "100%"}}>
                <Radio.Group value={skillState} buttonStyle="solid" onChange={selectChange}>
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="active">Active</Radio.Button>
                    <Radio.Button value="progress">In Progress</Radio.Button>
                    <Radio.Button value="unverified">Unverified</Radio.Button>
                </Radio.Group>
                <div></div>

                {loading ?
                    <div>
                        <LoadingOutlined /> 
                        Loading...
                    </div>
                    :
                    staffSkills.map((skill: any) => (
                        skill.skill_status === skillState || skillState === "all" ?
                        <Tag style={{padding:10}} color={color(skill.skill_status)} icon={tagIcon(skill.skill_status)} key={skill.skill_id}>
                            {skill.skill_name}
                        </Tag>
                        :
                        <div>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    ))
                }

            </Space>
        </Card>
        
    );
};

ProfileSkills.propTypes = {
    getStaffSkillsByStaffId: PropTypes.func.isRequired,
    staffSkills: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    staffSkills: state.staffSkills,
    auth: state.auth
});

export default connect(mapStateToProps, { getStaffSkillsByStaffId })(ProfileSkills);