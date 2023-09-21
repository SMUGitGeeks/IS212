import { Cascader } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';

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

function RelatedSelector(props: any) {
    // const { listData, onFilter  } = props;

    const onChange = (value: any) => {
        console.log(value)
        // value contains list of all clicked value (eg ['Singapore', 'Orchard'])
        // let newList = [];
        // for (let i = 0; i < listData.length; i++) {
        //     // insert code logic to compare location to role
        // }
        // onFilter(newList);
    }

    return (
        <Cascader
            options={data}
            placeholder="Please select"
            showSearch={{ filter }}
            onChange={onChange}
        />
    );
}


export default RelatedSelector;