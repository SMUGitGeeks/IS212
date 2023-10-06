import type {DescriptionsProps} from "antd";
import {Button, Col, Divider, Progress, Row, Space, Tag, Typography,} from "antd";
import {Container} from "react-bootstrap";
import {AimOutlined, CheckCircleOutlined, ClockCircleOutlined, SolutionOutlined} from "@ant-design/icons";
import {rowGutterStyle} from "../../App";
import React, {useEffect} from "react";
import {getRoleSkillsByRoleId} from "../../actions/roleSkills";
import {getRoleListing} from "../../actions/roleListings";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";

const {Title, Text} = Typography;

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
        return <CheckCircleOutlined/>;
    } else if (status === "in-progress") {
        return <ClockCircleOutlined/>;
    } else {
        return <></>;
    }
}

export const RoleDescription = ({
                                    getRoleListing,
                                    roleListing: {roleListing, loading},
                                    roleSkill: {roleSkills},
                                    getRoleSkillsByRoleId,
                                    staffSkill: {staffSkill},
                                }: any) => {

    const {roleListingId} = useParams();
    useEffect(() => {
        getRoleListing(roleListingId);
        getRoleSkillsByRoleId(roleListingId);
    }, [getRoleListing]);

    const calculateSkillsMatch = () => {
        let matchedSkills = 0;
        // let missingSkills = 0;
        let numRoleSkills = roleSkills.length;

        let missingSkillNames = [] as any;
        staffSkill.forEach((staffSkill: any) => {
            roleSkills.forEach((roleSkill: any) => {
                if (
                    staffSkill.skill_id === roleSkill.skill_id &&
                    (staffSkill.skill_status === "in-progress" || staffSkill.skill_status === "unverified")
                ) {
                    missingSkillNames.push([roleSkill.skill_name, roleSkill.skill_status]);
                } else if (
                    staffSkill.skill_id !== roleSkill.skill_id
                ) {
                    missingSkillNames.push([roleSkill.skill_name, "missing"]);
                } else {
                    matchedSkills++;
                }
            });
        });

        let match = (matchedSkills / numRoleSkills) * 100;
        return [match.toFixed(2), missingSkillNames];
    };

    const [matchPercentage, missingSkills] = calculateSkillsMatch();

    // const calculateDateDifference = () => {};

    const onChange = (key: string | string[]) => {
        // console.log(key);
    };
    // ===================================

    // Important Details =================
    const importantDetails: DescriptionsProps["items"] = [
        {
            key: "1",
            label: "UserName",
            children: "Zhou Maomao",
        },
        {
            key: "2",
            label: "Telephone",
            children: "1810000000",
        },
    ];
    // ===================================

    return loading ? (
        <h1>Loading...</h1>
    ) : (
        <Container>
            <Space direction="vertical" style={{display: "flex"}} size="large">
                <Row gutter={rowGutterStyle} align="middle">
                    <Col xs={24} sm={24} md={15} lg={17} xl={19}>
                        <div className="">
                            <h1>{roleListing.role_name}</h1>
                            <h3>Department: {roleListing.department}</h3>
                            <h3>Location: {roleListing.Location}</h3>
                            <Space direction="horizontal" wrap>

                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={7} xl={5}>
                        <Space direction="vertical" align="center" size="large">
                            <Button type="primary" size="large" icon={<SolutionOutlined/>}>Apply Now</Button>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={rowGutterStyle} justify="space-between">
                    {/* Description coloumn */}
                    <Col xs={24} sm={24} md={24} lg={15} xl={17}>
                        <Space direction="vertical">
                            {
                                roleListing.rl_desc ?
                                    <>
                                        <Divider orientation="left" orientationMargin="0"
                                                 style={{fontSize: 23}}>Details</Divider>
                                        {roleListing.rl_desc}
                                    </> : <></>
                            }
                            <p style={{padding: "2%"}}></p>
                            {
                                roleListing.role_description ?
                                    <>
                                        <Divider orientation="left" orientationMargin="0" style={{fontSize: 23}}>Role
                                            Description</Divider>
                                        {roleListing.role_description}
                                    </> : <></>
                            }
                        </Space>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={0} style={{paddingTop: "10%"}}><Divider/></Col>

                    {/* Skills Column */}
                    <Col xs={24} sm={24} md={24} lg={8} xl={6} xxl={5}>
                        <Space direction="vertical" style={{width: "100%"}}>
                            <Space direction="horizontal" align="center">
                                <AimOutlined style={{fontSize: 25}}/>
                                <p style={{fontSize: 26, margin: "0"}}>{matchPercentage}%</p>
                                <p style={{fontSize: 12, color: "grey", margin: "0"}}>Skills<br/>Matched</p>
                            </Space>
                            <Progress percent={matchPercentage} showInfo={false}/>

                            {/* Display Role's skills */}
                            <Divider orientation="left" orientationMargin="0">All Skills Required</Divider>
                            <Space size={[0, 8]} wrap>
                                {roleSkills.map((skill: any) => (
                                    <Tag>{skill.skill_name}</Tag>
                                ))}
                            </Space>

                            <Title level={5}>Missing Skills</Title>
                            <Space size={[0, 8]} wrap>
                                {missingSkills.map((skill: any) => (
                                    <Tag icon={tagIcon(skill.skill_status)}
                                         color={color(skill.skill_status)}>{skill[0]}</Tag>
                                ))}
                            </Space>

                            {/* Separated into skills match vs missing */}
                            {/* <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} /> */}
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Container>
    );
};
RoleDescription.propTypes = {
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
    getRoleListing: PropTypes.func.isRequired,
    roleSkill: PropTypes.object.isRequired,
    roleListing: PropTypes.object.isRequired,
    staffSkill: PropTypes.object.isRequired,

    // roleListingId: PropTypes.number.isRequired
};

const mapStateToProps = (state: any) => ({
    roleSkill: state.roleSkill,
    roleListing: state.roleListing,
    staffSkill: state.staffSkill,
});

export default connect(mapStateToProps, {
    getRoleSkillsByRoleId,
    getRoleListing,
})(RoleDescription);
