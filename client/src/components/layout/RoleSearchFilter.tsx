import { Space, Typography, Button, Select, Cascader, SelectProps } from "antd";

const {Title} = Typography;

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

// Role Type Format:
const roleTypes: SelectProps['options'] = [
    {
        label: "hi",        // text that is shown to user
        value: "test",      // value of the thing selected
        disabled: false,    // can have a bool line to determine t/f also
    }
];

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

const RoleSearchFilter = () => {

    const filter = () => {
        // code to confirm filter options and filter
    }

    const onChange = (value: any) => {
        console.log(value)
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
            />
            
            <Title level={5}>Location</Title>
            {/* Related Selector */}
            <Cascader
                options={locations}
                placeholder="Please select"
                onChange={onChange}
            />
            <Button onClick={filter}>Filter Results</Button>
        </Space>
    );
}

export default RoleSearchFilter