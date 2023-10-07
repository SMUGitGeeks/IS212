import {Select, SelectProps, Space, Typography} from "antd";
import {getRoles} from '../../actions/roles';
import {filterRoleListingsByRoleId} from "../../actions/roleListings";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {SearchOutlined} from '@ant-design/icons';

const {Title} = Typography;

const RoleSearchFilter = ({getRoles, role: {roles, loading}}: any) => {

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
        console.log(roleIds);
        dispatch(filterRoleListingsByRoleId({roleIds}) as any);
    }


    return (
        <Space direction='vertical' size="small" style={{width: "100%"}}>
            <Title level={4}>Search Role Type</Title>
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                options={roleTypes}
                optionFilterProp={"label"}
                suffixIcon={<SearchOutlined/>}
            />
        </Space>
    );
}

RoleSearchFilter.propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    role: state.role,
});

export default connect(mapStateToProps, {getRoles})(RoleSearchFilter);