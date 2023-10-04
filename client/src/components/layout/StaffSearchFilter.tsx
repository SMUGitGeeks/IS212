import {Select, SelectProps, Space, Typography} from "antd";
import {filterStaffListingsByStaffId, getStaffListings} from '../../actions/staffListings';
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";

const {Title} = Typography;

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

const StaffSearchFilter = ({getStaffListings, staffListing: {rawStaffListings, loading}}: any) => {

    useEffect(() => {
        getStaffListings();
    }, [getStaffListings]);
    const dispatch = useDispatch();

    const filter = () => {

    }

    const onChange = (value: any) => {
        console.log(value)
    }
    let staffNames: SelectProps['options'] = [
        {
            label: "Loading...",        // text that is shown to user
            value: "",      // value of the thing selected
            disabled: true,    // can have a bool line to determine t/f also
        }
    ];
    if (!loading) {
        // update roleTypes to be the list of roles
        staffNames = rawStaffListings.map((staff: any) => {
            return {
                label: staff.fname + " " + staff.lname,
                value: staff.staff_id,
            }
        });
    }

    // roleTypes is of type array of integer
    const handleChange = (staffIds: number[]) => {
        console.log(staffIds);
        dispatch(filterStaffListingsByStaffId({staffIds}) as any);
    }


    return (
        <Space direction='vertical' size="small" style={{width: "100%"}}>
            <Title level={4}>Filters</Title>
            <Title level={5}>Role Type</Title>
            {/* Tag Search */}
            <Select
                mode="multiple"
                style={{width: '80%'}}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                options={staffNames}
                optionFilterProp={"label"}
            />
        </Space>
    );
}

StaffSearchFilter.propTypes = {
    getStaffListings: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    staffListing: state.staffListing,
});

export default connect(mapStateToProps, {getStaffListings})(StaffSearchFilter);