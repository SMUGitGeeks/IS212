import { Select } from 'antd';

interface Option {
    value: string;
    label: string;
}

function SortSelector(props: any) {
    // const { sortOptions, listData, roleListingIdList } = props

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
        
        if (value === 'skillMatch') {
            // const skillsDescending = listData.sort((a, b) => {a})....
            // input code to ort by skills
        }
        else {
            // input code to default sorting
        }
    }

    return (
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


export default SortSelector;