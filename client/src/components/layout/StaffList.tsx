import React, {useEffect} from 'react';
import {getStaffListings} from '../../actions/staffListings';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {List, Skeleton} from 'antd';
import {Link} from 'react-router-dom';


const StaffList = ({
                       getStaffListings,
                       staffListing: {staffListings, loading},
                   }: any) => {
    useEffect(() => {
        getStaffListings();

    }, [getStaffListings]);

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
                    >
                        <List.Item.Meta
                            title={item.fname + " " + item.lname}
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