import type { SelectProps } from 'antd';
import { Select } from 'antd';
// import { title } from 'process';
import React from 'react';
// import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../../actions/role';
import PropTypes from 'prop-types';


// Format:
const options: SelectProps['options'] = [
    {
        label: "hi",        // text that is shown to user
        value: "test",      // value of the thing selected
        disabled: false,    // can have a bool line to determine t/f also
    }
];

const TagSearchBar = ({ getRoles, role: { roles, loading } }: any) => {

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
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    role: state.role
});

export default connect(mapStateToProps, { getRoles })(TagSearchBar);