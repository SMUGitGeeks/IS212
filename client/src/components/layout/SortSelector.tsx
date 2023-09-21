import { Select } from 'antd';
import { connect } from 'react-redux';
import { getRoleListings } from '../../actions/roleListings';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

interface Option {
    value: string;
    label: string;
}

const SortSelector = ({ getRoleListings, roleListing: { roleListings, loading } }: any) => {
    useEffect(() => {
        getRoleListings();
    }, [getRoleListings]);

    // Test:
    const sortOptions: Option[] = [
        {
            value: 'default',
            label: 'Default'
        },
        {
            value: 'skillMatch',
            label: 'Highest Skill Match'
        },
    ]

    const onSelect = (value: string) => {
        console.log(value)
    }

    return loading ? 
        <div>loading</div> : (
        <Select
            style={{ width: 200 }}
            // placeholder="Search to Select"
            defaultValue={'default'}
            optionFilterProp="children"
            filterOption={true}
            options={sortOptions}
            onSelect={onSelect}
        />
    );
}

SortSelector.propTypes = {
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing
});
export default connect(mapStateToProps, { getRoleListings })(SortSelector);