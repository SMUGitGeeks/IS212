import {Col, Row, Select, SelectProps, Space} from "antd";
import {Container} from "react-bootstrap";
import HrRoleListings from "../layout/HrRoleListings";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {getRoles} from '../../actions/roles';
import {SearchOutlined} from '@ant-design/icons';
import { useEffect } from "react";
import { rowGutterStyle } from "../../App";
import { filterRoleListingsByRoleId } from "../../actions/roleListings";

const RoleListingManager = ({getRoles, role: {roles, loading}}: any) => {

    useEffect(() => {
        getRoles();
    }, [getRoles]);
    
    const dispatch = useDispatch();

    let roleTypes: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];
    if (!loading) {
        roleTypes = roles.map((role: any) => {
            return {
                label: role.role_name,
                value: role.role_id,
            }
        });
    }
    
    const handleChange = (roleIds: number[]) => {
        dispatch(filterRoleListingsByRoleId({roleIds}) as any);
    }

    return (
        <Container>
            <Space direction="vertical" size={40} style={{width: "100%"}}>
                <div></div>
                <Row gutter={rowGutterStyle} justify='center'>
                    <Col span={22}>
                        <Select
                            mode="multiple"
                            showSearch
                            style={{width: '100%'}}
                            placeholder="Search Roles"
                            defaultValue={[]}
                            onChange={handleChange}
                            options={roleTypes}
                            optionFilterProp={"label"}
                            suffixIcon={<SearchOutlined/>}
                            size="large"
                            allowClear
                        />
                    </Col>
                </Row>
                <Row gutter={rowGutterStyle} justify='center'>
                    <Col span={22}>
                        <HrRoleListings/>
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

RoleListingManager.propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    role: state.role,
});

export default connect(mapStateToProps, {getRoles})(RoleListingManager);