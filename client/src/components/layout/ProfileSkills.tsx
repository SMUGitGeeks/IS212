import { Radio, Space, Card, RadioChangeEvent, Tag, Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getStaffSkillsByStaffId } from "../../actions/staffSkills";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { CheckCircleOutlined, ClockCircleOutlined, LoadingOutlined } from "@ant-design/icons";

const ProfileSkills = ({getStaffSkillsByStaffId, staffSkill: { staffSkill, loading }, auth: {user}}: any) => {
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
                <h2 style={{marginTop:0}}>My Skills</h2>
                <Radio.Group value={skillState} buttonStyle="solid" onChange={selectChange}>
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="active">Active</Radio.Button>
                    <Radio.Button value="progress">In Progress</Radio.Button>
                    <Radio.Button value="unverified">Unverified</Radio.Button>
                </Radio.Group>
                <div></div>

                {loading ?
                    <div style={{textAlign: "center", paddingTop: "10vh", paddingBottom: "10vh"}}>
                        <Spin />
                    </div>
                    :
                    staffSkill.map((skill: any) => (
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
    staffSkill: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    staffSkill: state.staffSkill,
    auth: state.auth
});

export default connect(mapStateToProps, { getStaffSkillsByStaffId })(ProfileSkills);