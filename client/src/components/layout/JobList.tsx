import { StarFilled } from '@ant-design/icons';
import React from 'react';

import { Avatar, List, Space } from 'antd';
import { Link } from 'react-router-dom';

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   href: 'https://ant.design',
//   title: `ant design part ${i}`,
//   avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
//   description:
//     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//   content:
//     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));

const data = [
  {
    title: `Role Title`,
    description:
      'Department Name, time etc',
    content:
      'Short description',
    link: '/',
    imgSrc: 'test'
  },
  {
    title: `Role Title`,
    description:
      'Department Name, time etc',
    content:
      'Short description',
    link: '/',
    imgSrc: 'test'
  }
]

// const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

function JobList() {
    return (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={data}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => (
            <Link to={item.link}>
              <List.Item
              key={item.title}
              // actions={[
              //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              // ]}
              extra={
                <>
                  <Space direction='vertical'>
                    <StarFilled style={{ fontSize: '18px'}}/>
                    <img
                      width={200}
                      alt="logo"
                      src={item.imgSrc}
                    />
                  </Space>
                </>
              }
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              {item.content}
            </List.Item>
            </Link>
            
          )}
        />
      );
} 

export default JobList;