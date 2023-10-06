import {StarFilled} from '@ant-design/icons';
import React, {useEffect} from 'react';
import {getStaffListings} from '../../actions/staffListings';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {List, Skeleton, Space} from 'antd';
import {Link} from 'react-router-dom';


const StaffList = ({
                       getStaffListings,
                       staffListing: {staffListings, loading},
                   }: any) => {
    useEffect(() => {
        getStaffListings();

    }, [getStaffListings]);
    console.log(staffListings);


    const date = new Date();


    return loading ?
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 10,
            }}
            dataSource={Array.from({length: 8}).map((_, i) => i)}
            renderItem={(item: any) => (
                <List.Item
                    key={item}
                >
                    <Skeleton active title/>
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
            dataSource={staffListings}

            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={(item: any) => (
                <Link to={`/staff/${item.staff_id}`}>
                    <List.Item
                        key={item.fname}
                        // actions={[
                        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        // ]}
                    >
                        <List.Item.Meta
                            title={item.fname + " " + item.lname}
                            // description={item.description}
                            description={item.dept}
                        />
                        <br/>


                    </List.Item>
                </Link>

            )}
        />
}

StaffList.propTypes = {
    getStaffListings: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
    staffListing: state.staffListing,
});

export default connect(mapStateToProps, {getStaffListings})(StaffList);