import type { SelectProps } from 'antd';
import { Select } from 'antd';
// import { title } from 'process';
import React from 'react';
// import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoleListings } from '../../actions/roleListings';
import PropTypes from 'prop-types';


// Format:
const options: SelectProps['options'] = [
    {
        label: "hi",        // text that is shown to user
        value: "test",      // value of the thing selected
        disabled: false,    // can have a bool line to determine t/f also
    }
];

const TagSearchBar = ({ getRoleListings, roleListing: { roleListings, loading } }: any) => {

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    return loading ? 
    <div>loading</div> :
    (
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[]}
            onChange={handleChange}
            options={options}
        />
    );
} 

TagSearchBar.propTypes = {
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing
});

export default connect(mapStateToProps, { getRoleListings })(TagSearchBar);