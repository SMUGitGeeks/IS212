import {Container} from "react-bootstrap";
import {Col, Divider, Row, Space} from "antd";
import {rowGutterStyle} from "../../App";
import { Link, useParams } from "react-router-dom";
import PageNoExist from "../layout/PageNoExist";
import {LoadingOutlined} from "@ant-design/icons";
import { useEffect } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { getRoleListing } from "../../actions/roleListings";
import { getRoleSkillsByRoleId } from "../../actions/roleSkills";


const ManageRolePage = ({
                        getRoleListing,
                        roleListing: {roleListing, loading, error},
                        roleSkill: {roleSkills},
                        getRoleSkillsByRoleId,
                        }: any) => {
    const { rl_id } = useParams();
    useEffect(() => {
        getRoleListing(rl_id);
        getRoleSkillsByRoleId(rl_id);
    }, [getRoleListing, getRoleSkillsByRoleId]);

    return (
        <Container>
            <Row gutter={rowGutterStyle} justify='center'>
                <Col span={20}>
                { error.action === "getRoleListing" ? (
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
                                        {/* <Space direction="vertical" style={{width: "100%"}}> */}
                                            <Link to={"/role/" + roleListing.rl_id + "/applicants"}>View Applicants</Link>
                                        {/* </Space> */}
                                    </Col>
                                </Row>
                            </Space>
                        </Container>
                    )
                }
                </Col>
            </Row>
        </Container>
    )
}

ManageRolePage.propTypes = {
    getRoleListing: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    roleSkill: PropTypes.object.isRequired,
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
    roleSkill: state.roleSkill,
    roleListing: state.roleListing,
});

export default connect(mapStateToProps, {
    getRoleListing,
    getRoleSkillsByRoleId,
})(ManageRolePage);
