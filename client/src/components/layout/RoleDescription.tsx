import {Button, Col, Divider, Progress, Row, Space, Tag, Typography, Modal, Input,} from "antd";
import {Container} from "react-bootstrap";
import {AimOutlined, CheckCircleOutlined, ClockCircleOutlined, SolutionOutlined, LoadingOutlined} from "@ant-design/icons";
import {rowGutterStyle} from "../../App";
import React, {useEffect, useState} from "react";
import {getRoleSkillsByRoleId} from "../../actions/roleSkills";
import {getRoleListing} from "../../actions/roleListings";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import { getApplicationByStaffIdAndRLId, getApplicationsByStaffId, postApplication, updateApplication } from "../../actions/applications";
import { getStaffSkillsByStaffId } from "../../actions/staffSkills";
import PageNoExist from "./PageNoExist";

const {Title} = Typography;

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
                                    roleListing: {roleListing, loading, error},
                                    roleSkill: {roleSkills},
                                    getRoleSkillsByRoleId,
                                    getStaffSkillsByStaffId,
                                    staffSkill: {staffSkill},
                                    auth: {user, isHR},
                                    getApplicationByStaffIdAndRLId,
                                    application: {applications, application,}
                                }: any) => {

    const {rl_id} = useParams();
    useEffect(() => {
        getRoleListing(rl_id);
        getRoleSkillsByRoleId(rl_id);
        getApplicationByStaffIdAndRLId(Number(rl_id))
    }, [getRoleListing]);

    useEffect(() => {
        // console.log(rl_id)
        getApplicationByStaffIdAndRLId(Number(rl_id));
    }, [applications]);

    useEffect(() => {
        checkIfApplied();
    }, [application]);

    const dispatch = useDispatch();

    // onclick function that uses postapplication action when button is clicked which sends rl_id, staff_id, status from both the role listing and the staff as payload
    // let isWithdrawn = false;
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false); 
    const [buttonDisabled, setButtonDisabled] = useState(false); 
    const [isWithdrawModalOpen, setisWithdrawModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [textBody, setTextBody] = useState("");
    const [isApplied, setIsApplied] = useState(!(application == null || application.length === 0 ));


    const checkIfApplied = () => {
        // console.log("isApplied: " + isApplied)
        if (application == null || application.length === 0) {
            setIsApplied(false);
        } else {
            // console.log("status is withdrawn: ")
            // console.log(application[0].role_app_status === "withdrawn")
            if (application[0].role_app_status === "withdrawn") {
                // isWithdrawn = true
                // console.log("button disabled: " + buttonDisabled)
                setIsApplied(true);
                setButtonDisabled(true)
                // console.log("button disabled (after): " + buttonDisabled)
            } else {
                setIsApplied(true);
                setButtonDisabled(false)

            }
        }
    }

    // console.log("outside check"+buttonDisabled)

    const showModal = () => {
        setIsApplyModalOpen(true);
    };


    const handleOk = () => {
        // console.log("clicked")
        // console.log(application)

        if (application == null || application.length === 0) {
            let payload = {
                "rl_id": roleListing.rl_id,
                "staff_id": user,
                "role_app_status": "applied",
                "app_text": textBody,
            }
            // console.log(payload)
            dispatch(postApplication(payload) as any)
            dispatch(getApplicationsByStaffId(user) as any)
            
            setConfirmLoading(true);
            setTimeout(() => {
                setIsApplyModalOpen(false);
            setConfirmLoading(false);
            }, 2000);
        }         
    };


    const handleCancel = () => {
        setIsApplyModalOpen(false);
    };

    const handleWithdrawOk = () => {

        if (application[0].role_app_status === "applied") {
            let payload = {
                "rl_id": roleListing.rl_id,
                "staff_id": user,
                "role_app_status": "withdrawn",
                // "app_text": textBody,
            }
            dispatch(updateApplication(payload) as any)
            dispatch(getApplicationsByStaffId(user) as any)
            

            setConfirmLoading(true);
            setTimeout(() => {
                setisWithdrawModalOpen(false);
            setConfirmLoading(false);
            }, 2000);

            setButtonDisabled(true);
            
        }
    };


    const handleWithdrawCancel = () => {
        setisWithdrawModalOpen(false);
    };

    const handleWithdraw = () => {
        setisWithdrawModalOpen(true);

        
        // setIsApplied(false);
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
    useEffect(() => {
        getApplicationsByStaffId(user);
    }, [handleOk, handleWithdrawOk]);
    
    const { TextArea } = Input;

    const onCharChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextBody(e.target.value);
    };

    const skillsInfo = () => {
        if (roleSkills.length === 0 || staffSkill.length === 0) {
            return {
                missingSkills: [],
                skill_match: 0
            }
        }
        let missingSkills: string[] = [];
        let numNotMatched = 0;
        const staffSkillIds = staffSkill.map((skill: any) => skill["skill_id"])

        for (let i = 0; i < roleSkills.length; i++) {
            if (staffSkillIds.includes(roleSkills[i]['skill_id']) && roleSkills[i]['skill_status'] === 'active') {
                missingSkills.push(roleSkills[i].skill_name);
            } else {
                numNotMatched++;
            }
        };

        return {
            missingSkills: missingSkills,
            skill_match: Math.round((roleSkills.length - numNotMatched) / roleSkills.length * 100)
        }
    }


    return error.action === "getRoleListing" ? (
        <PageNoExist />
    ) : !roleListing ? (
        <h1><LoadingOutlined /> Loading...</h1>
    ) :  (
        <Container>
            <Space direction="vertical" style={{display: "flex"}} size="large">
                <Row gutter={rowGutterStyle} align="middle">
                    <Col xs={24} sm={24} md={15} lg={17} xl={19}>
                        <div className="">
                            <h1>{roleListing.role_name}</h1>
                            <h3>Department: {roleListing.department}</h3>
                            <Space direction="horizontal" wrap>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={7} xl={5}>

                        {/* {isApplied ? (
                            <Button type="primary" size="large" icon={<SolutionOutlined />} onClick={handleWithdraw} disabled={buttonDisabled}>
                            Withdraw
                            </Button>
                        ) : (
                            <Button type="primary" size="large" icon={<SolutionOutlined />} onClick={showModal}>
                            Apply Now
                            </Button>
                        )} */}
                        

                        {isApplied ? (
                            buttonDisabled ? (
                                <Button type="primary" size="large" icon={<SolutionOutlined />} disabled = {true}>
                                Withdrawn
                                </Button>
                                ) : (
                                <Button type="primary" size="large" icon={<SolutionOutlined />} onClick={handleWithdraw}>
                                Withdraw
                                </Button>
                                )
                            ) : (
                            <Button type="primary" size="large" icon={<SolutionOutlined />} onClick={showModal}>
                                Apply Now
                            </Button>
                            )
                        }


                        <Modal title="Role Application" open={isApplyModalOpen} confirmLoading={confirmLoading} onOk={handleOk} onCancel={handleCancel} okText="Submit">
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

                        <Modal title="Warning" open={isWithdrawModalOpen} confirmLoading={confirmLoading} onOk={handleWithdrawOk} onCancel={handleWithdrawCancel} okText="Confirm">
                            <p>Are you sure you want to withdraw this application?</p>
                            <p>Note: You will not be allowed to re-apply for this role.</p>

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
                            <Space direction="horizontal" align="center">
                                <AimOutlined style={{fontSize: 25}}/>
                                <p style={{fontSize: 26, margin: "0"}}>{skillsInfo().skill_match}%</p>
                                <p style={{fontSize: 12, color: "grey", margin: "0"}}>Skills<br/>Matched</p>
                            </Space>
                            <Progress percent={skillsInfo().skill_match} showInfo={false}/>
                            <Divider orientation="left" orientationMargin="0">All Skills Required</Divider>
                            <Space size={[0, 8]} wrap>
                                {roleSkills.map((skill: any) => (
                                    <Tag>{skill.skill_name}</Tag>
                                ))}
                            </Space>
                            
                            { skillsInfo().missingSkills.length === 0 ? <></> :
                                <>
                                <Title level={5}>Missing Skills</Title>
                                <Space size={[0, 8]} wrap>
                                    {skillsInfo().missingSkills.map((skill: any) => (
                                        <Tag icon={tagIcon(skill.skill_status)}
                                            color={color(skill.skill_status)}>{skill}</Tag>
                                    ))}
                                </Space>
                                </>
                            }
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
    getApplicationByStaffIdAndRLId: PropTypes.func.isRequired,
    getStaffSkillsByStaffId: PropTypes.func.isRequired,
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
    getApplicationByStaffIdAndRLId,
    getStaffSkillsByStaffId,
})(RoleDescription);
