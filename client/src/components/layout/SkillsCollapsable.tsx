import type {CollapseProps} from 'antd';
import {Collapse, Tag} from 'antd';


function SkillsCollapsable(props: any) {
    const onChange = (key: string | string[]) => {
    };

    const {matchedSkills, missingSkills} = props

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
    return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange}/>;
}

export default SkillsCollapsable;