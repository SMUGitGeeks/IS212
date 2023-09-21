import { Select } from 'antd';
import { connect } from 'react-redux';
import { getRoles } from '../../actions/role';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

interface Option {
    value: string;
    label: string;
}

const SortSelector = ({ getRoles, role: { roles, loading } }: any) => {
    useEffect(() => {
        getRoles();
    }, [getRoles]);

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
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    role: state.role
});
export default connect(mapStateToProps, { getRoles })(SortSelector);