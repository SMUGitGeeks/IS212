import {Button, Col, Divider, Progress, Row, Space, Tag, Typography, Modal, Input, Skeleton, Descriptions, DescriptionsProps,} from "antd";
import {Container} from "react-bootstrap";
import {AimOutlined, CheckCircleOutlined, ClockCircleOutlined, SolutionOutlined, LoadingOutlined} from "@ant-design/icons";
import {rowGutterStyle} from "../../App";
import React, {useEffect, useState} from "react";
import {getRoleSkillsByRoleId} from "../../actions/roleSkills";
import {getRoleListing} from "../../actions/roleListings";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import { getApplicationByStaffIdAndRLId, getApplicationsByStaffId, postApplication, updateApplication } from "../../actions/applications";
import { getStaffSkillsByStaffId } from "../../actions/staffSkills";
import PageNoExist from "../layout/PageNoExist";
import { useParams} from "react-router-dom";

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

const RolePage = ({
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
        getRoleListing(rl_id, user);
        getRoleSkillsByRoleId(rl_id);
        getApplicationByStaffIdAndRLId(Number(rl_id))
        if (user) {
            getStaffSkillsByStaffId(user);
        }
    }, [getRoleListing]);

    useEffect(() => {
        getApplicationByStaffIdAndRLId(Number(rl_id));
    }, [applications]);

    useEffect(() => {
        checkIfApplied();
    }, [application]);

    const dispatch = useDispatch();

    const [dataloaded, setDataLoaded] = useState(false);

    setTimeout(() => {
        setDataLoaded(true);
    }, 3000);

    // onclick function that uses postapplication action when button is clicked which sends rl_id, staff_id, status from both the role listing and the staff as payload
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false); 
    const [buttonDisabled, setButtonDisabled] = useState(false); 
    const [isWithdrawModalOpen, setisWithdrawModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [textBody, setTextBody] = useState("");
    const [isApplied, setIsApplied] = useState(!(application == null || application.length === 0 ));


    const checkIfApplied = () => {
        if (application == null || application.length === 0) {
            setIsApplied(false);
        } else {
            if (application[0].role_app_status === "withdrawn") {
                setIsApplied(true);
                setButtonDisabled(true)
            } else {
                setIsApplied(true);
                setButtonDisabled(false)

            }
        }
    }
    const showModal = () => {
        setIsApplyModalOpen(true);
    };


    const handleOk = () => {
        if (application == null || application.length === 0) {
            let payload = {
                "rl_id": roleListing.rl_id,
                "staff_id": user,
                "role_app_status": "applied",
                "app_text": textBody,
            }
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

    const missingSkills = roleSkills.filter((roleSkill: any) => {
        for (let i = 0; i < staffSkill.length; i++) {
            if (roleSkill.skill_id === staffSkill[i].skill_id) {
                return false;
            }
        }
        return true;
    });

    const today = new Date();

    const items: DescriptionsProps['items'] = !dataloaded || roleListing === null ? [] :
    [
        {
            key: '2',
            label: 'Listing Status',
            children: new Date(roleListing.rl_close).getTime() > today.getTime() ?
                        <Tag color="green">Open</Tag> :
                        <Tag color="red">Closed</Tag>
        },
        {
            key: '3',
            label: 'Application Period',
            children: <>{new Date(roleListing.rl_open).toLocaleDateString("en-SG")} - {new Date(roleListing.rl_close).toLocaleDateString("en-SG")}</>,
            span: 2,
        },
    ];

    return (
        <Container>
            <Row gutter={rowGutterStyle} justify='center'>
                <Col span={20}>
                {error.action === "getRoleListing" ? 
                    <PageNoExist />
                :  
                    <Container>
                        <Space direction="vertical" style={{display: "flex"}} size="large">
                            <Row gutter={rowGutterStyle} align="middle">
                                <Col xs={24} sm={24} md={15} lg={17} xl={19}>
                                <Skeleton 
                                    loading={!dataloaded}
                                    title={{width: "30%", style: {height: 40, marginBottom: 10}}}
                                    paragraph={{
                                        rows: 1,
                                        width: ["40%"],
                                    }}
                                    active
                                >
                                    {roleListing ? 
                                        <div className="">
                                            <h1>{roleListing.role_name}</h1>
                                            <h3>Department: {roleListing.department}</h3>
                                        </div> : <></>
                                    }
                                </Skeleton>
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
                                        
                                    { !dataloaded ?
                                    <Skeleton.Button active size="large" style={{width: 130}}/>
                                    :
                                    isApplied ? (
                                        roleListing.rl_status == "Closed" ? (
                                            <Button type="primary" size="large" icon={<SolutionOutlined />} disabled = {true}>
                                                Closed
                                            </Button>):
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
                                    <Skeleton 
                                        active
                                        loading={!dataloaded}
                                        title={false}
                                        paragraph={{
                                            rows: 9,
                                            width: ["100%", "100%", "100%", "100%", "0%", "100%", "100%", "100%", "100%"],
                                        }}
                                    >
                                    <Space direction="vertical">
                                        <Descriptions items={items} colon={false} size="small" column={{xs: 1}}/>
                                        {
                                            roleListing && roleListing.rl_desc ?
                                                <>
                                                    <Divider orientation="left" orientationMargin="0"
                                                            style={{fontSize: 23}}>Details</Divider>
                                                    {roleListing.rl_desc}
                                                </> : <></>
                                        }
                                        <p style={{padding: "2%"}}></p>
                                        {
                                            roleListing && roleListing.role_description ?
                                                <>
                                                    <Divider orientation="left" orientationMargin="0" style={{fontSize: 23}}>Role
                                                        Description</Divider>
                                                    {roleListing.role_description}
                                                </> : <></>
                                        }
                                    </Space>
                                    </Skeleton>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={0} style={{paddingTop: "10%"}}><Divider/></Col>
                                <Col xs={24} sm={24} md={24} lg={8} xl={6} xxl={5}>
                                    <Space direction="vertical" style={{width: "100%"}}>
                                        <Space direction="horizontal" align="center">
                                            <AimOutlined style={{fontSize: 25}}/>
                                            {!dataloaded ?
                                                <LoadingOutlined style={{fontSize: 25}} data-testid="loading-icon"/>
                                                :
                                                <p style={{fontSize: 26, margin: "0"}}>{ dataloaded && roleListing !== null? roleListing.skill_match : 0}%</p>
                                            }
                                            <p style={{fontSize: 12, color: "grey", margin: "0"}}>Skills<br/>Matched</p>
                                        </Space>
                                        <Progress percent={dataloaded && roleListing !== null ? roleListing.skill_match : 0} showInfo={false}/>
                                        <Divider orientation="left" orientationMargin="0">All Skills Required</Divider>
                                        {!dataloaded ?
                                            <Skeleton.Input style={{width: "100%"}} active={true} size="small"/> :
                                            <Space size={[0, 8]} wrap>
                                                {roleSkills.map((skill: any) => (
                                                    <Tag>{skill.skill_name}</Tag>
                                                ))}
                                            </Space>
                                        }
                                        
                                        { !dataloaded || missingSkills.length === 0 ? <></> :
                                            <>
                                            <Title level={5}>Missing Skills</Title>
                                            <Space size={[0, 8]} wrap>
                                                { missingSkills.length === 0 ? <></> :
                                                    missingSkills.map((skill: any) => (
                                                    <Tag icon={tagIcon(skill.ss_status)}
                                                        color={color(skill.ss_status)}>{skill.skill_name}</Tag>
                                                ))}
                                            </Space>
                                            </>
                                        }
                                    </Space>
                                </Col>
                            </Row>
                        </Space>
                    </Container>
                }
                </Col>
            </Row>
        </Container>
    )
}

RolePage.propTypes = {
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
    getRoleListing: PropTypes.func.isRequired,
    roleSkill: PropTypes.object.isRequired,
    roleListing: PropTypes.object.isRequired,
    staffSkill: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
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
    getApplicationByStaffIdAndRLId,
    getStaffSkillsByStaffId,
})(RolePage);
