import {Container} from "react-bootstrap";
import {Button, Col, Descriptions, DescriptionsProps, Divider, Row, Skeleton, Space, Table, Tag, Typography} from "antd";
import {rowGutterStyle} from "../../App";
import { Link, useParams } from "react-router-dom";
import PageNoExist from "../layout/PageNoExist";
import {LoadingOutlined, EditOutlined, RightOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { getRoleListing } from "../../actions/roleListings";
import { getRoleSkillsByRoleId } from "../../actions/roleSkills";
import { ColumnsType } from "antd/es/table";

const { Text } = Typography;

const ManageRolePage = ({
                        getRoleListing,
                        roleListing: {roleListing, loading, error},
                        roleSkill: {roleSkills},
                        getRoleSkillsByRoleId,
                        auth: {user}
                        }: any) => {
    const { rl_id } = useParams();
    useEffect(() => {
        getRoleListing(rl_id, user);
        getRoleSkillsByRoleId(rl_id);
    }, [getRoleListing, getRoleSkillsByRoleId]);

    const [dataloaded, setDataLoaded] = useState(false);

    setTimeout(() => {
        setDataLoaded(true);
    }, 3000);

    const today = new Date();

    const items: DescriptionsProps['items'] = !dataloaded || roleListing === null? [] :
    [
        {
            key: '1',
            label: 'Role status',
            children: 
            roleListing.role_status === "active" ?
                        <Tag color="green">Active</Tag> :
                        <Tag color="red">Inactive</Tag>
        },
        {
            key: '2',
            label: 'Listing Status',
            children: new Date(roleListing.rl_close).getTime() > today.getTime() ?
                        <Tag color="green">Open</Tag> :
                        <Tag color="red">Closed</Tag>
            ,
            // span: 2,

        },
        {
            key: '5',
            label: 'Manager',
            children: <div data-testid = "manager">{roleListing.source_name}</div>,
            // span: 3,
            
        },
        {
            key: '3',
            label: 'Application Period',
            children: <>{new Date(roleListing.rl_open).toLocaleDateString("en-SG")} - {new Date(roleListing.rl_close).toLocaleDateString("en-SG")}</>,
            span: 2,
        },
        {
            key: '4',
            label: 'No. of Applicants',
            children: <>{roleListing.application_count}</>,
        },
        {
            key: '6',
            label: 'Listing Creator',
            children: <>{roleListing.creator_name}</>,
        },
        {
            key: '7',
            label: 'Date Created',
            children: <>{new Date(roleListing.rl_ts_create).toLocaleDateString("en-SG", { hour: '2-digit', minute: '2-digit', hour12: false })}</>,
            span: 2,
        },
        
    ];

    if (dataloaded && roleListing!== null && roleListing.update_records.length > 0) {
        items.push({
            key: '8',
            label: 'Last Updater',
            children: <>{roleListing.update_records[roleListing.update_records.length-1].rl_updater_name}</>,
        });
        items.push(
            {
                key: '9',
                label: 'Date Created',
                children: <>{new Date(roleListing.update_records[roleListing.update_records.length-1].update_time).toLocaleDateString("en-SG", { hour: '2-digit', minute: '2-digit', hour12: false })}</>,
                span: 2,
            }
        );
    }

    const columns: ColumnsType<any> = !dataloaded ? [] :
    [
        {
            title: 'ID',
            dataIndex: 'rl_updater_id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'rl_updater_name',
            key: 'name'
        },
        {
            title: 'Date Edited',
            dataIndex: 'update_time',
            key: 'date_edited',
            render: (text) => <>{new Date(text).toLocaleDateString("en-SG", { hour: '2-digit', minute: '2-digit', hour12: false })}</>,
        },
    ];

    return (
        <Container>
            <Row gutter={rowGutterStyle} justify='center'>
                <Col span={20}>
                { !dataloaded && roleListing === null ? (
                        <PageNoExist />
                    ) : !dataloaded ? (
                        <h1><LoadingOutlined /> Loading...</h1>
                    ) :  (
                        <Container style={{marginTop: 15, marginBottom: 30}}>
                            <Space direction="vertical" style={{display: "flex"}} size="large">
                                <Row gutter={rowGutterStyle} align="middle" justify="space-between">
                                    <Col xs={24} sm={24} md={15} lg={17} xl={19}>
                                        <div className="">
                                            <h1>{roleListing.role_name}</h1>
                                            <h3>Department: {roleListing.department}</h3>
                                            <Space direction="horizontal" wrap>
                                            </Space>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={9} lg={7} xl={3}>
                                        <Link to={"/listingManage/update/" + rl_id}>
                                            <Button type="primary" size="large" block><EditOutlined data-testid="edit-button"/>Edit</Button>
                                        </Link>
                                    </Col>
                                </Row>

                                <Row gutter={rowGutterStyle} justify="space-between">
                                    <Col xs={24} sm={24} md={24} lg={15} xl={17}>
                                        <Descriptions items={items} colon={false} column={{sm: 1, md: 1, lg: 1}}/>
                                        {
                                            roleListing.rl_desc ?
                                                <div data-testid= "details">
                                                    <Divider orientation="left" orientationMargin="0"
                                                            style={{fontSize: 23}}>Details</Divider>
                                                    {roleListing.rl_desc}
                                                </div> : <></>
                                        }
                                        <p style={{padding: "2%"}}></p>
                                        {
                                            roleListing.role_description ?
                                                <div data-testid= "roleDesc">
                                                    <Divider orientation="left" orientationMargin="0" style={{fontSize: 23}}>Role
                                                        Description</Divider>
                                                    {roleListing.role_description}
                                                </div> : <></>
                                        }
                                        <p style={{padding: "2%"}}></p>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={0} style={{paddingTop: "10%"}}><Divider/></Col>
                                    <Col xs={24} sm={24} md={24} lg={8} xl={6} xxl={5}>
                                        {/* <Space direction="vertical" style={{width: "100%"}}> */}
                                        {/* </Space> */}
                                        <Space direction="vertical" style={{width: "100%"}}>
                                            <Link to={"/listingManage/" + roleListing.rl_id + "/applicants"}>
                                                <Button type="default" size="large" block>View Applicants <RightOutlined /></Button>
                                            </Link>
                                            
                                            <Divider orientation="left" orientationMargin="0">All Skills Required</Divider>
                                            {!dataloaded ?
                                                <Skeleton.Input style={{width: "100%"}} active={true} size="small"/> :
                                                <Space size={[0, 8]} wrap>
                                                    {roleSkills.map((skill: any) => (
                                                        <Tag>{skill.skill_name}</Tag>
                                                    ))}
                                                </Space>
                                            }
                                        </Space>
                                    </Col>
                                </Row>
                                { roleListing.update_records.length === 0 ? <></> :
                                    <Row gutter={rowGutterStyle}>
                                        <Col xs={24}>
                                            <Space direction="vertical" style={{width: "100%"}}>
                                                <Divider orientation="left" orientationMargin="0" style={{fontSize: 23}}>
                                                    Update Records
                                                </Divider>
                                                <Table columns={columns} data-testid="update-records"
                                                    dataSource={roleListing.update_records} 
                                                    pagination={ 
                                                        roleListing.update_records.length <= 5 ? false : 
                                                        { 
                                                            total: roleListing.update_records.length, 
                                                            defaultCurrent: 1, 
                                                            pageSize: 5, 
                                                            responsive: true, 
                                                            position: ['bottomCenter']
                                                        }
                                                    }
                                                />
                                            </Space>
                                        </Col>
                                    </Row>
                                }
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
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    roleSkill: state.roleSkill,
    roleListing: state.roleListing,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getRoleListing,
    getRoleSkillsByRoleId,
})(ManageRolePage);
