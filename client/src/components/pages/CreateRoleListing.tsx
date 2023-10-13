import React, { useEffect } from 'react';
import { getRoleListings, postRoleListing } from '../../actions/roleListings';
import { Container } from 'react-bootstrap';
import { Row, Col, Form, Input, Button, Select, DatePicker, Tag, Typography, SelectProps, Modal, Flex } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {SearchOutlined} from "@ant-design/icons";
import { getRoles } from '../../actions/roles';
import { getRoleSkillsByRoleId } from '../../actions/roleSkills';
import { LoadingOutlined } from '@ant-design/icons';
import { getStaffListings } from '../../actions/staffListings';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
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


const CreateRoleListing = ({
                            getRoles,
                            role,
                            roleSkill,
                            auth: {user},
                            getStaffListings,
                            staffListing,
                            getRoleListings,
                            roleListing,
                        }: any) => {
    useEffect(() => {
        getRoles();
        getStaffListings();
        getRoleListings(user);
    }, [getRoles, getStaffListings,getRoleListings]);

    // const dispatch = useDispatch();
    let roleTypes: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];
    if (!role.loading) {
        roleTypes = role.roles.map((role: any) => {
            return {
                label: 
                <Flex justify='space-between'>
                    <Text>{role.role_name}</Text>
                    <Text type='secondary'>ID: {role.role_id}</Text>
                </Flex>
                ,
                value: role.role_id,
            }
        });
    }

    let staffList: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];

    if (!staffListing.loading) {
        staffList = staffListing.staffListings.map((staff: any) => {
            return {
                label: staff.fname + " " + staff.lname,
                value: staff.staff_id,
            }
        });
    }

    const newRLID = roleListing.roleListings.length + 1;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [form] = Form.useForm();

    const onRoleChange = () => {
        const roleId = form.getFieldValue('roleName');
        for (let i = 0; i < role.roles.length; i++) {
            if (role.roles[i].role_id === roleId) {
                console.log(role.roles[i].role_description)
                form.setFieldsValue({ roleDescription: role.roles[i].role_description });
                dispatch(getRoleSkillsByRoleId(roleId) as any);
                return
            }
        }
    };
    
    const onFinish = (fieldsValue: any) => {
        Modal.success({
            title: 'Saving Changes',
            content: 'Role Listing has been successfully updated.'
            ,
            okText: 'View Listing'
            ,
            onOk() {
                navigate("/listingManage/" + newRLID)
            },
        });
        const rangeValue = fieldsValue['applicationPeriod'];
        const payload = {
            rl_id: newRLID, 
            role_id: fieldsValue['roleName'], 
            rl_desc: fieldsValue['rl_desc'], 
            rl_source: fieldsValue['rl_source'], 
            rl_open: rangeValue[0].toISOString(), 
            rl_close: rangeValue[1].toISOString(), 
            rl_creator: user, 
            location: fieldsValue['location'], 
            department: fieldsValue['department'],
        }
        // dispatch(postRoleListing(payload) as any);
        console.log('Received values of form: ', payload);
    };

    return (
        <Container>
            <Row justify='center'>
                <Col span={22}>
                    <h1>Create New Role Listing</h1>
                </Col>
                <Col span={22}>
                <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                // style={{ maxWidth: 600 }}
                scrollToFirstError
                size="large"
                colon={false}
                >
                    <Form.Item name="roleName" label="Role name" rules={[{ required: true, message: "Please select a valid role" }]} >
                        <Select 
                            showSearch
                            optionFilterProp='label'
                            onChange={onRoleChange}
                            options={roleTypes}
                            suffixIcon={<SearchOutlined/>}
                        />
                    </Form.Item>
                    <Form.Item name="roleDescription" label="Role Description" rules={[{ required: false,  }]}>
                        <Input readOnly bordered={false}/>
                    </Form.Item>
                    <Form.Item name="rl_desc" label="Role Listing Description" rules={[{ required: false,  }]}>
                        <TextArea
                            placeholder="Add descriptions"
                            autoSize={{ minRows: 3}}
                        />
                    </Form.Item>
                    <Form.Item name="rl_source" label="Manager" rules={[{ required: true,  message: "Please input a manager"}]}>
                        <Select
                            showSearch
                            // style={{width: '30%'}}
                            optionFilterProp={"label"}
                            options={staffList}
                            suffixIcon={<SearchOutlined/>}
                        />
                    </Form.Item>
                    <Form.Item name="department" label="Department" rules={[{ required: true,  message: "Please input a department"}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please input a location" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="applicationPeriod" label="Application Period" {...rangeConfig}>
                        <RangePicker
                            format="DD-MM-YYYY"
                            // disabledDate={disabledDate}
                        />
                    </Form.Item>
                    <Form.Item label="Skills">
                        { form.getFieldValue('roleName') === undefined ? <Text type='secondary'>Please select a role to display required skills.</Text> :
                            roleSkill.loading ? <LoadingOutlined /> :
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
};

CreateRoleListing.propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired,
    roleSkill: PropTypes.array.isRequired,
    getStaffListings: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
    roleSkill: state.roleSkill,
    role: state.role,
    auth: state.auth,
    staffListing: state.staffListing,
    roleListing: state.roleListing,
});

export default connect(mapStateToProps, {
    getRoles,
    getStaffListings,
    getRoleListings,
})(CreateRoleListing);