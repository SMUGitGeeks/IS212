import { StarFilled } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { getRoleListings } from '../../actions/roleListings';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Space, Skeleton } from 'antd';
import { Link } from 'react-router-dom';



const RoleList = ({ getRoleListings, roleListing: { roleListings, loading } }: any) => {
    useEffect(() => {
        getRoleListings();

    }, [getRoleListings]);

    const date = new Date();

    return loading ?
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 10,
            }}
            dataSource={Array.from({ length: 8 }).map((_, i) => i)}
            renderItem={(item: any) => (
                <List.Item
                key={item}
                >
                    <Skeleton active title />
                </List.Item>
            
            )}
        />
        : 
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
                {/* <b>ant design</b> footer part */}
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
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing
});

export default connect(mapStateToProps, { getRoleListings })(RoleList);