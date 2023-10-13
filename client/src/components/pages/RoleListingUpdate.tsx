import { Form, Input, Select, SelectProps, Button, Typography, DatePicker, Space, Card, Tag, Row, Col } from "antd";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {SearchOutlined, PlusOutlined} from '@ant-design/icons';
import { getRoleSkillsByRoleId } from "../../actions/roleSkills";
import { getRoleListing } from "../../actions/roleListings";
import { useParams } from "react-router-dom";
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getSkills } from "../../actions/skills";
import skills from "../../reducers/skills";

const { Option } = Select;
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

// const disabledDate: RangePickerProps['disabledDate'] = (current) => {
//     // Can not select days before today and today
//     return current && current < dayjs().endOf('day');
// };

const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};


const RoleListingUpdate = ({
                            getRoleListing,
                            roleListing: {roleListing, loading},
                            roleSkill: {roleSkills},
                            getRoleSkillsByRoleId,
                            auth: {user},
                        }: any) => {
    const { rl_id } = useParams();
    
    useEffect(() => {
        getRoleListing(rl_id);
        getRoleSkillsByRoleId(rl_id);
    }, [getRoleListing, getRoleSkillsByRoleId]);

    // const dispatch = useDispatch();
    
    const [form] = Form.useForm();

    if (!loading) {
        form.setFieldsValue({ 
            roleName: roleListing.role_name, 
            roleDescription: roleListing.role_description,
            rl_desc: roleListing.rl_desc,
            department: roleListing.department,
            location: roleListing.location,
            applicationPeriod: [dayjs(roleListing.rl_open), dayjs(roleListing.rl_close)],
        });
    }

    // const onRoleChange = () => {
    //     form.setFieldsValue({ 
    //         roleName: roleListing.role_name, 
    //         roleDescription: roleListing.role_description,
    //         roleListingDescription: roleListing.rl_desc,
    //         department: roleListing.department,
    //         location: roleListing.location,
    //     });
    // };
    
    const onFinish = (fieldsValue: any) => {
        const rangeValue = fieldsValue['applicationPeriod'];
        const values = {
            ...fieldsValue,
            rl_open: rangeValue[0].toISOString(),
            rl_close: rangeValue[1].toISOString(),
            role_id: roleListing.role_id,
            rl_source: roleListing.rl_source,
            rl_updater: user,
        };
        delete values['roleName']; 
        delete values['roleDescription']; 
        delete values['applicationPeriod']; 
        console.log('Received values of form: ', values);
    };
    
    return (
        <Container>
            <Row justify='center'>
                <Col span={22}>
                    <h1>Update Role Listing</h1>
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
                        <Form.Item name="roleName" label="Role name" rules={[{ required: false }]} >
                            <Input readOnly bordered={false}/>
                        </Form.Item>
                        <Form.Item name="roleDescription" label="Role Description" rules={[{ required: false,  }]}>
                            <Input readOnly bordered={false}/>
                        </Form.Item>
                        <Form.Item name="rl_desc" label="Role Description" rules={[{ required: false,  }]}>
                            <TextArea
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3}}
                            />
                        </Form.Item>
                        <Form.Item name="department" label="Department" rules={[{ required: true,  }]}>
                            <Select
                                showSearch
                                style={{width: '30%'}}
                                optionFilterProp={"label"}
                                suffixIcon={<SearchOutlined/>}
                            />
                        </Form.Item>
                        <Form.Item name="location" label="Location" rules={[{ required: true,  }]}>
                            <Select
                                showSearch
                                style={{width: '30%'}}
                                optionFilterProp={"label"}
                                suffixIcon={<SearchOutlined/>}
                            />
                        </Form.Item>
                        <Form.Item name="applicationPeriod" label="Application Period" {...rangeConfig}>
                            <RangePicker
                                format="DD-MM-YYYY"
                                // disabledDate={disabledDate}
                            />
                        </Form.Item>
                        <Form.Item label="Skills">
                            {roleSkills.map((skill:any) => (
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

RoleListingUpdate.propTypes = {
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
})(RoleListingUpdate);