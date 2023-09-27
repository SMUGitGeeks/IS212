import { Space, Typography, Button, Select, Cascader, SelectProps } from "antd";
import { getRoles } from '../../actions/roles';
import { sortRoleListingsByName, filterRoleListingsByRoleId } from "../../actions/roleListings";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";

const {Title} = Typography;

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

// Role Type Format:


interface locationOption {
    value: string;
    label: string;
    children?: locationOption[];
    disabled?: boolean;
}

// Location Example:
const locations: locationOption[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
        {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
            {
                value: 'xihu',
                label: 'West Lake',
            },
            {
                value: 'xiasha',
                label: 'Xia Sha',
                disabled: true,
            },
            ],
        },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
        {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
            {
                value: 'zhonghuamen',
                label: 'Zhong Hua men',
            },
            ],
        },
        ],
    },
];

const RoleSearchFilter = ({ getRoles, role: {roles, loading}} : any) =>  {

    useEffect(() => {
        getRoles();
    }, [getRoles]);
    const dispatch = useDispatch();

    const filter = () => {

    }
    const sort = (direction: String) => {
        //sortRoleListingsByName
        dispatch(sortRoleListingsByName({direction}) as any);
        dispatch(sortRoleListingsByName({direction}) as any);
    }

    const onChange = (value: any) => {
        console.log(value)
    }
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
        <Space direction='vertical' size="small">
            <Title level={4}>Filters</Title>
            <Title level={5}>Role Type</Title>
            {/* Tag Search */}
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                options={roleTypes}
                optionFilterProp={"label"}
            />
            
            <Title level={5}>Location</Title>
            {/* Related Selector */}
            <Cascader
                options={locations}
                placeholder="Please select"
                onChange={onChange}
            />
            <Button onClick={filter}>Filter Results</Button>
            <Button onClick={() => sort("asc")}>Sort Ascending</Button>
            <Button onClick={() => sort("desc")}>Sort Descending</Button>
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