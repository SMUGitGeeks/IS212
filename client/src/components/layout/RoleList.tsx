import { StarFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getRoleListings } from '../../actions/roleListings';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, List, Space, Select } from 'antd';
import { Link } from 'react-router-dom';

// interface RoleSimpleDetail {
//   title: string;
//   description: string;  // sub details
//   content: string;      // body of content
//   id: string;           // role list id
//   imgSrc?: any;         // if image used include, if no image don't use
// }

// interface RoleListProps {
//   getRoles: () => void;
//   role: {roles: [] , loading: boolean};
//   search: string;
//   setSearch: (search: string) => void;
//   handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const RoleList = ({ getRoleListings, roleListing: { roleListings, loading } }: any) => {
interface filterOption {
  value: string;
  label: string;
}


// Sort Example:
const sortOptions: filterOption[] = [
  {
      value: 'default',
      label: 'Default'
  },
  {
      value: 'skillMatch',
      label: 'Highest Skill Match'
  },
]

  const dispatch = useDispatch();
  const [sort, setSort] = useState('asc')

  useEffect(() => {
      getRoleListings();
  }, [getRoleListings]);
      // dispatch(searchPosts(search));
  // if (sort === 'default') {
  // 	dispatch(sortPostsDesc());
  // }
  // if (sort === 'skillMatch') {
  // 	dispatch(sortPostsAsc());
  // }


  const onSelect = (value: string) => {
      console.log(value)
      setSort(value)
  }

  const date = new Date();

    return loading ?
      <div>Loading</div> :
      <>
        <Select
            style={{ width: 200 }}
            // placeholder="Search to Select"
            defaultValue={'default'}
            optionFilterProp="children"
            filterOption={true}
            options={sortOptions}
            onSelect={onSelect}
        />
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={roleListings}
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
      </>
} 

RoleList.propTypes = {
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing
});

export default connect(mapStateToProps, { getRoleListings })(RoleList);