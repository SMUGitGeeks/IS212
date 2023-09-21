import { Cascader } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import { connect } from 'react-redux';
import { getRoleListings } from '../../actions/roleListings';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

interface Option {
    value: string;
    label: string;
    children?: Option[];
    disabled?: boolean;
}

// Example:
const data: Option[] = [
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

const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
        (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

const RelatedSelector = ({ getRoleListings, role: { roles, loading } }: any) => {
    useEffect(() => {
        getRoleListings();
    }, [getRoleListings]);

    const onChange = (value: any) => {
        console.log(value)
    }

    return loading ? 
        <div>Loading</div> :
    (
        <Cascader
            options={data}
            placeholder="Please select"
            showSearch={{ filter }}
            onChange={onChange}
        />
    );
}

RelatedSelector.propTypes = {
    getRoleListings: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    role: state.role
});
    
export default connect(mapStateToProps, { getRoleListings })(RelatedSelector);