import { Space, Typography, Button, Select, Cascader, SelectProps } from "antd";
import { getRoles } from '../../actions/roles';
import { sortRoleListingsByName, filterRoleListingsByRoleId } from "../../actions/roleListings";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";
import { SearchOutlined } from '@ant-design/icons';

const {Title} = Typography;

const RoleSearchFilter = ({ getRoles, role: {roles, loading}} : any) =>  {

    useEffect(() => {
        getRoles();
    }, [getRoles]);
    const dispatch = useDispatch();

    let roleTypes : SelectProps['options'] = [
        {
            label: "Loading...",        // text that is shown to user
            value: "",      // value of the thing selected
            disabled: true,    // can have a bool line to determine t/f also
        }
    ];
    if (!loading) {
        // update roleTypes to be the list of roles
        roleTypes = roles.map((role: any) => {
            return {
                label: role.role_name,
                value: role.role_id,
            }
        });
    }

    // roleTypes is of type array of integer
    const handleChange = (roleIds: number[]) => {
        console.log(roleIds);
        dispatch(filterRoleListingsByRoleId({roleIds}) as any);
    }


    return (
        <Space direction='vertical' size="small" style={{width: "100%"}}>
            <Title level={4}>Search Role Type</Title>
            {/* Tag Search */}
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                options={roleTypes}
                optionFilterProp={"label"}
                suffixIcon={<SearchOutlined />}
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

export default connect(mapStateToProps, { getRoles })(RoleSearchFilter);