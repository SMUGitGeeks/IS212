import { StarFilled } from '@ant-design/icons';
import React from 'react';
import { useState } from 'react';

import { Avatar, List, Space } from 'antd';
import { Link } from 'react-router-dom';

interface RoleSimpleDetail {
  title: string;
  description: string;  // sub details
  content: string;      // body of content
  id: string;           // role list id
  imgSrc?: any;         // if image used include, if no image don't use
}

const data:RoleSimpleDetail[] = [
  {
    title: `Role Title`,
    description:
      'Department Name, time etc',
    content:
      'Short description',
    id: '1',
    imgSrc: 'test'
  },
  {
    title: `Role Title`,
    description:
      'Department Name, time etc',
    content:
      'Short description',
    id: '2',
    imgSrc: 'test'
  }
]

function RoleList(props: any) {
  // const { data } = props;
  // ^ Uncomment when arguments are passed.

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
            <Link to={`/roles/${item.id}`}>
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
                    {/* <img
                      width={200}
                      alt="logo"
                      src={item.imgSrc}
                    /> */}
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

export default RoleList;