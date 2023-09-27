import type { CollapseProps } from 'antd';
import { Collapse, Tag } from 'antd';
import { max } from 'moment';

const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
`;

// const items: CollapseProps['items'] = [
//     {
//         key: '1',
//         label: 'Matching',
//         children: <p>{text}</p>,
//     },
//     {
//         key: '2',
//         label: 'Missing',
//         children: <p>{text}</p>,
//     },
// ];

function SkillsCollapsable(props: any) {
    const onChange = (key: string | string[]) => {
        // console.log(key);
    };

    const { matchedSkills, missingSkills } = props

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Skills Matched',
            children: (matchedSkills.map((skill: any) => (
                <Tag>{skill}</Tag>
            ))),
        },
        {
            key: '2',
            label: 'Skills Missing',
            children: (missingSkills.map((skill: any) => (
                <Tag>{skill}</Tag>
            ))),
        },
    ];

    return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default SkillsCollapsable;