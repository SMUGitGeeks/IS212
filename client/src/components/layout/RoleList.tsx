import { StarFilled } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../../actions/roleListings';
import PropTypes from 'prop-types';
import { Avatar, List, Space } from 'antd';
import { Link } from 'react-router-dom';

// interface RoleSimpleDetail {
//   title: string;
//   description: string;  // sub details
//   content: string;      // body of content
//   id: string;           // role list id
//   imgSrc?: any;         // if image used include, if no image don't use
// }

// const data:RoleSimpleDetail[] = [
//   {
//     title: `Role Title`,
//     description:
//       'Department Name, time etc',
//     content:
//       'Short description',
//     id: '1',
//     imgSrc: 'test'
//   },
//   {
//     title: `Role Title`,
//     description:
//       'Department Name, time etc',
//     content:
//       'Short description',
//     id: '2',
//     imgSrc: 'test'
//   }
// ]

const RoleList = ({ getRoles, role: { roles, loading } }: any) => {
  useEffect(() => {
    getRoles();
}, [getRoles]);

  const date = new Date();

    return loading ?
      <div>Loading</div> :
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={roles}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item: any) => (
            <Link to={`/roles/${item.rl_id}`}>
              <List.Item
              key={item.rl_desc}
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
                title={item.rl_desc}
                // description={item.description}
                description={date.getDate() - new Date(item.rl_open).getDate() + " days ago"}
              />
              {/* {item.content} */}
            </List.Item>
            </Link>
            
          )}
        />
      
} 

RoleList.propTypes = {
  getRoles: PropTypes.func.isRequired,
  role: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
  role: state.role
});

export default connect(mapStateToProps, { getRoles })(RoleList);