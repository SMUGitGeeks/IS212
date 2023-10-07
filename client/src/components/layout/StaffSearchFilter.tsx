import {Button, Divider, Select, SelectProps, Space, Typography} from "antd";
import {
    filterStaffListingsBySkillId,
    filterStaffListingsByStaffId,
    filterStaffListingsByDepartment,
    getStaffListings,
} from '../../actions/staffListings';
import {getSkills} from '../../actions/skills';
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";

const {Title} = Typography;


const StaffSearchFilter = ({getStaffListings, getSkills, skill, staffListing: {rawStaffListings, loading}}: any) => {

    useEffect(() => {
        getStaffListings();
        getSkills();
    }, [getStaffListings, getSkills]);
    const dispatch = useDispatch();

    let staffNames: SelectProps['options'] = [
        {
            label: "Loading...",        // text that is shown to user
            value: "",      // value of the thing selected
            disabled: true,    // can have a bool line to determine t/f also
        }
    ];
    let skillNames: SelectProps['options'] = [
        // as more options selected, 
        {
            label: "Loading...",        // text that is shown to user
            value: "",      // value of the thing selected
            disabled: true,    // can have a bool line to determine t/f also
        }
    ];
    let departments: SelectProps['options'] = [
        // as more options selected,
        {
            label: "Loading...",        // text that is shown to user
            value: "",      // value of the thing selected
            disabled: true,    // can have a bool line to determine t/f also
            }
    ];

    if (!loading) {
        staffNames = rawStaffListings.map((staff: any) => {
            return {
                label: staff.fname + " " + staff.lname,
                value: staff.staff_id,
            }
        });
    }
    if (!skill.loading) {
        skillNames = skill.skills.map((skill: any) => {
            return {
                label: skill.skill_name,
                value: skill.skill_id,
            }
        });
    }
    if (!loading) {
        const uniqueDepartmentsSet = new Set(); // Create a Set to store unique values
        departments = rawStaffListings
        .map((staff: any) => staff.dept) // Extract department values
        .filter((dept: any) => {
            if (!uniqueDepartmentsSet.has(dept)) {
              uniqueDepartmentsSet.add(dept); // Add unique department values to the Set
              return true; // Include the department in the result
            }
            return false; // Exclude duplicate departments
        })
        .map((dept: any) => ({
            label: dept,
            value: dept,
            }));
        }

    // roleTypes is of type array of integer
    const handleStaffChange = (staffId: number[]) => {
        dispatch(filterStaffListingsByStaffId({staffId}) as any);
    }

    const handleSkillChange = (skillIds: number[]) => {
        dispatch(filterStaffListingsBySkillId({skillIds}) as any);
    }
    const handleDeptChange = (dept: string[]) => {
        dispatch(filterStaffListingsByDepartment({dept}) as any);
    }
    const clearFilters = () => {
    }


    return (
        <Space direction='vertical' size="small" style={{width: "100%"}}>
            <Title level={4}>Search Staff</Title>
            {/* Tag Search */}
            <Select
                showSearch
                size="large"
                style={{width: '80%'}}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleStaffChange}
                options={staffNames}
                optionFilterProp={"label"}
                suffixIcon={<SearchOutlined />}
                allowClear
            />

            <Divider />
            <Title level={4} style={{marginTop: 0}}>Filters</Title>
            <Title level={5}>Skills</Title>
            <Select
                mode="multiple"
                style={{width: '80%'}}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleSkillChange}
                options={skillNames}
                optionFilterProp={"label"}
                allowClear
            />
            <Title level={5}>Department</Title>
            <Select
                // mode="multiple"
                style={{width: '80%'}}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleDeptChange}
                options={departments}
                optionFilterProp={"label"}
                allowClear
            />
            <Button type="default" onClick={clearFilters}>Reset Filters</Button>
        </Space>
    );
}

StaffSearchFilter.propTypes = {
    getStaffListings: PropTypes.func.isRequired,
    getSkills: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
    skill: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
    staffListing: state.staffListing,
    skill: state.skill
});

export default connect(mapStateToProps, {getStaffListings, getSkills})(StaffSearchFilter);