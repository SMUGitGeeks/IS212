import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { title } from 'process';
import React from 'react';


// Format:
const options: SelectProps['options'] = [
    {
        label: "hi",        // text that is shown to user
        value: "test",      // value of the thing selected
        disabled: false,    // can have a bool line to determine t/f also
    }
];

function TagSearchBar(props: any) {
    // const { options, listData, onFilter } = props;

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
        // let newList = [];
        // for (let i = 0; i < listData.length; i++) {
            // insert code logic to filter by options
        //     newList.push(listData[i])
        // }
        // onFilter(newList);          // change displaying list to filtered list
    };

    return (
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

export default TagSearchBar;