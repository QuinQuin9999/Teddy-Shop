import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Input, Rate, Modal, notification, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { MonthPicker } = DatePicker;

const formatDate = (date) => {
  const dateObject = new Date(date);
  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const year = dateObject.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

const AdminReview = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);

  const getAllReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/v1/review/getAll`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    getAllReviews().then(setData);
  }, []);

  const handleDelete = (reviewId) => {
    setOpen(true);
    setId(reviewId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    try {
      const response = await axios.delete(`http://localhost:8083/api/v1/review/delete/${id}`);
      console.log('Review deleted successfully', response.data);
      const updatedReviews = await getAllReviews();
      setData(updatedReviews);
      setOpen(false);

      notification.success({
        message: 'Success',
        description: 'A review has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleDeleteFeedback = async (reviewId, feedbackId) => {
    try {
      Modal.confirm({
        title: 'Xác nhận',
        content: 'Bạn có muốn xóa phản hồi này khỏi đánh giá trên?',
        okText: 'Xóa',
        cancelText: 'Cancel',
        onOk: async () => {
          const response = await axios.delete(`http://localhost:8083/api/v1/review/${reviewId}/feedback/${feedbackId}`);
          console.log('Feedback deleted successfully', response.data);

          const updatedReviews = await getAllReviews();
          setData(updatedReviews);

          notification.success({
            message: 'Success',
            description: 'A feedback has been successfully deleted.',
          });
        },
        onCancel: () => {
          console.log('Delete canceled');
        },
      });
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      if (dataIndex === 'date') {
        return (
          <div style={{ padding: 8 }}>
            <MonthPicker
              value={selectedKeys[0] ? moment(selectedKeys[0], 'MM-YYYY') : null}
              format="MM-YYYY"
              onChange={(date, dateString) => setSelectedKeys(dateString ? [dateString] : [])}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                size="small"
                style={{ width: 90 }}
              >
                OK
              </Button>
              <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        );
      } else {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        );
      }
    },
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'date') {
        const recordDate = moment(record[dataIndex]);
        return recordDate.format('MM-YYYY') === value;
      } else {
        return record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
  });

  const columns = [
    {
      title: 'Ngày đánh giá',
      dataIndex: 'reviewDate',
      sorter: (a, b) => new Date(a.reviewDate) - new Date(b.reviewDate),
      render: (date) => (date ? formatDate(date) : 'Unknown date'),
      ...getColumnSearchProps('reviewDate'),
    },
    {
      title: 'Người đánh giá',
      dataIndex: 'userId',
      ...getColumnSearchProps('userId'),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      ...getColumnSearchProps('productId'),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => <Rate value={rating} disabled />,
      filters: [
        { text: '1 star', value: 1 },
        { text: '2 stars', value: 2 },
        { text: '3 stars', value: 3 },
        { text: '4 stars', value: 4 },
        { text: '5 stars', value: 5 },
      ],
      onFilter: (value, record) => record.rating === value,
      filterMultiple: false,
    },
    {
      title: 'Nội dung',
      dataIndex: 'reviewContent',
      ...getColumnSearchProps('reviewContent'),
    },
    {
      title: 'Số lượng phản hồi',
      dataIndex: 'feedback',
      render: (feedback) => feedback.length > 0 ? feedback.length : 'Chưa có phản hồi',
    },
    {
      title: '',
      dataIndex: 'reviewId',
      render: (reviewId) => (
        <Space>
          <Button type="primary" onClick={() => handleDelete(reviewId)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const columns = [
      { title: 'UserID', dataIndex: 'userId', key: 'userId' },
      { title: 'Nội dung', dataIndex: 'comment', key: 'comment' },
      { title: 'Ngày', dataIndex: 'feedbackDate', key: 'feedbackDate', render: (date) => formatDate(date) },
      {
        title: '',
        dataIndex: 'id',
        render: (id) => (
          <Button type="primary" danger onClick={() => handleDeleteFeedback(record.reviewId, id)}>
            Xóa
          </Button>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.feedback}
        pagination={false}
        rowKey="feedbackId"
      />
    );
  };

  return (
    <div>
      <h1 style={{fontSize: '24px'}}>Quản lý đánh giá</h1>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey="reviewId"
      />
      <Modal
        title="Xác nhận"
        visible={open}
        onOk={handleYes}
        onCancel={handleClose}
      >
        Bạn có muốn xóa đánh giá này?
      </Modal>
    </div>
  );
};

export default AdminReview;
