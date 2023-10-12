import {Button, Col, Divider, Progress, Row, Space, Tag, Typography, Modal, Input,} from "antd";
import {Container} from "react-bootstrap";
import {AimOutlined, CheckCircleOutlined, ClockCircleOutlined, SolutionOutlined} from "@ant-design/icons";
import {rowGutterStyle} from "../../App";
import React, {useEffect, useState} from "react";
import {getRoleSkillsByRoleId} from "../../actions/roleSkills";
import {getRoleListing} from "../../actions/roleListings";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";
import auth from "../../reducers/auth";
import { getApplicationByStaffIdAndRLId, getApplicationsByStaffId, postApplication } from "../../actions/applications";
import { application } from "express";

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

var count = 0;

export const RoleDescription = ({
                                    getRoleListing,
                                    roleListing: {roleListing, loading},
                                    roleSkill: {roleSkills},
                                    getRoleSkillsByRoleId,
                                    staffSkill: {staffSkill},
                                    auth: {user, isHR},
                                    application: {applications, application,}
                                }: any) => {

    const {rl_id} = useParams();
    useEffect(() => {
        getRoleListing(rl_id);
        getRoleSkillsByRoleId(rl_id);
    }, [getRoleListing]);

    // useEffect(() => {
    //     getApplicationByStaffIdAndRLId(roleListing.rl_id);
    // }, [getApplicationsByStaffId]);

    useEffect(() => {
        checkIfApplied();
    }, [application]);

    const dispatch = useDispatch();

    console.log(application);
    
    if (count < 1) {
        count += 1;


    dispatch(getApplicationsByStaffId(user) as any)
            .then(() => {
                  dispatch(getApplicationByStaffIdAndRLId(Number(rl_id)) as any)
                
              })
            }


    const calculateSkillsMatch = () => {
        let matchedSkills = 0;
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

    // onclick function that uses postapplication action when button is clicked which sends rl_id, staff_id, status from both the role listing and the staff as payload

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textBody, setTextBody] = useState("");
    const [isApplied, setIsApplied] = useState(!(application == null || application.length === 0 || application[0].role_app_status === "withdrawn"));
    // console.log(isApplied)
    const checkIfApplied = () => {
        if (application == null || application.length === 0 || application[0].role_app_status === "withdrawn") {
            setIsApplied(false);
        } else {
            setIsApplied(true);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        console.log("clicked")
        // console.log(application)

        if (application == null || application.length === 0) {
            // console.log("creating new application")
            let payload = {
                "rl_id": roleListing.rl_id,
                "staff_id": user,
                "role_app_status": "applied",
                "app_text": textBody,
            }
            console.log(payload)
            dispatch(postApplication(payload) as any)
            dispatch(getApplicationsByStaffId(user) as any)
            .then(() => {
                  dispatch(getApplicationByStaffIdAndRLId(roleListing.rl_id) as any)
                
              })
            

            setIsModalOpen(false);
            
        } 

        
        // else if (application[0].role_app_status === "withdrawn") { Doing this nowwwwww
            

        
        
        

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleWithdraw = () => {
        setIsApplied(false);
    }

    /* 
Show apply when:
- Staff has not applied for the role
    - getApplicationByStaffIdAndRLId returns empty array / null
- Staff has withdrawn their application
    - getApplicationByStaffIdAndRLId returns an array with a status of "withdrawn"

Show withdraw when:
- Staff has applied for the role
    - getApplicationByStaffIdAndRLId returns an array with a status of "applied"
*/

    const { TextArea } = Input;

    const onCharChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextBody(e.target.value);
    };

    const [matchPercentage, missingSkills] = calculateSkillsMatch();

    return loading ? (
        <h1>Loading...</h1>
    ) : (
        <Container>
            <Space direction="vertical" style={{display: "flex"}} size="large">
                <Row gutter={rowGutterStyle} align="middle">
                    <Col xs={24} sm={24} md={15} lg={17} xl={19}>
                        <div className="">
                            <h1>{roleListing.role_name}</h1>
                            <h3>"Department"</h3>
                            <Space direction="horizontal" wrap>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={7} xl={5}>

                        {isApplied ? (
                            <Button type="primary" size="large" icon={<SolutionOutlined />} onClick={handleWithdraw}>
                            Withdraw
                            </Button>
                        ) : (
                            <Button type="primary" size="large" icon={<SolutionOutlined />} onClick={showModal}>
                            Apply Now
                            </Button>
                        )}


                        <Modal title="Role Application" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Submit">
                            <p>Why are you suitable for this role?</p>
                            <TextArea
                                showCount
                                maxLength={1000}
                                style={{ height: 110, resize: 'none' }}
                                onChange={onCharChange}
                                placeholder="Enter your answer here"
                                value = {textBody}
                            />
                            <br/>
                            <br/>

                        </Modal>
                    </Col>
                </Row>

                <Row gutter={rowGutterStyle} justify="space-between">
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
                    <Col xs={24} sm={24} md={24} lg={8} xl={6} xxl={5}>
                        <Space direction="vertical" style={{width: "100%"}}>
                            {isHR ?
                                <><Link to={"/role/" + roleListing.rl_id + "/applicants"}>View Applicants</Link>
                                </> : <></>
                            }
                            <Space direction="horizontal" align="center">
                                <AimOutlined style={{fontSize: 25}}/>
                                <p style={{fontSize: 26, margin: "0"}}>{matchPercentage}%</p>
                                <p style={{fontSize: 12, color: "grey", margin: "0"}}>Skills<br/>Matched</p>
                            </Space>
                            <Progress percent={matchPercentage} showInfo={false}/>
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
    auth: PropTypes.object.isRequired,
    // getApplicationsByStaffId: PropTypes.func.isRequired,
    // postApplication: PropTypes.func.isRequired,
    // getApplicationByStaffIdAndRLId: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
    roleSkill: state.roleSkill,
    roleListing: state.roleListing,
    staffSkill: state.staffSkill,
    auth: state.auth,
    application: state.application
});

export default connect(mapStateToProps, {
    getRoleSkillsByRoleId,
    getRoleListing,
    // getApplicationsByStaffId,
    // postApplication,
    // getApplicationByStaffIdAndRLId,
})(RoleDescription);
