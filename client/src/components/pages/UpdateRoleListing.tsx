import { Form, Input, Select, Button, DatePicker, Tag, Row, Col, Modal } from "antd";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {SearchOutlined, LoadingOutlined} from '@ant-design/icons';
import { getRoleSkillsByRoleId } from "../../actions/roleSkills";
import { getRoleListing, updateRoleListing } from "../../actions/roleListings";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const UpdateRoleListing = ({
                            getRoleListing,
                            roleListing: {roleListing, loading, updateSuccess},
                            roleSkill,
                            getRoleSkillsByRoleId,
                            auth: {user},
                        }: any) => {
    const { rl_id } = useParams();
    
    useEffect(() => {
        getRoleListing(rl_id);
        getRoleSkillsByRoleId(rl_id);
    }, [getRoleListing, getRoleSkillsByRoleId]);

    const dispatch = useDispatch();
    
    const [form] = Form.useForm();

    if (roleListing !== null) {
        form.setFieldsValue({ 
            roleName: roleListing.role_name, 
            roleDescription: roleListing.role_description,
            rl_desc: roleListing.rl_desc,
            department: roleListing.department,
            location: roleListing.location,
            applicationPeriod: [dayjs(roleListing.rl_open), dayjs(roleListing.rl_close)],
        });
    }

    const navigate = useNavigate()
    
    const onFinish = (fieldsValue: any) => {
        Modal.success({
            title: 'Saving Changes',
            content: 'Role Listing has been successfully updated.'
            ,
            okText: 'Return to Listing'
            ,
            onOk() {
                navigate("/listingManage/" + roleListing.rl_id)
            },
        });

        const rangeValue = fieldsValue['applicationPeriod'];
        if (rl_id) {
            const payload = {
                "rl_close": rangeValue[1].toISOString(),
                "rl_desc": fieldsValue.rl_desc,
                "rl_open": rangeValue[0].toISOString(),
                "role_id": roleListing.role_id,
                "rl_source": roleListing.rl_source,
                "rl_updater": user,
                "department": fieldsValue.department,
                "location": fieldsValue.location,
            }
            dispatch(updateRoleListing(parseInt(rl_id), payload) as any)
        }
    };
    
    return (
        <Container>
            <Row justify='center'>
                <Col span={22}>
                    <h1>Update Role Listing</h1>
                </Col>
                { loading ? 
                    <Col>
                        <LoadingOutlined /> Loading Data
                    </Col> : <></>
                }
                <Col span={22}>
                    <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    scrollToFirstError
                    size="large"
                    colon={false}
                    >
                        <Form.Item name="roleName" label="Role name" rules={[{ required: false}]} >
                            <Input readOnly bordered={false}/>
                        </Form.Item>
                        <Form.Item name="roleDescription" label="Role Description" rules={[{ required: false,  }]}>
                            <Input readOnly bordered={false}/>
                        </Form.Item>
                        <Form.Item name="rl_desc" label="Role Listing Description" rules={[{ required: false,  }]}>
                            <TextArea
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3}}
                            />
                        </Form.Item>
                        <Form.Item name="department" label="Department" rules={[{ required: true,  message: "Please input a department"}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please input a location (country)" }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="applicationPeriod" label="Application Period" {...rangeConfig}>
                            <RangePicker
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
                        <Form.Item label="Skills">
                            { roleSkill.loading ? <LoadingOutlined /> :
                            roleSkill.roleSkills.map((skill:any) => (
                                <Tag style={{fontSize: '11pt', padding: 10}} color="blue">{skill.skill_name}</Tag>
                            ))}
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

            
        </Container>
    );
}

UpdateRoleListing.propTypes = {
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
    getRoleListing: PropTypes.func.isRequired,
    roleSkill: PropTypes.object.isRequired,
    roleListing: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
    roleSkill: state.roleSkill,
    roleListing: state.roleListing,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getRoleSkillsByRoleId,
    getRoleListing,
})(UpdateRoleListing);