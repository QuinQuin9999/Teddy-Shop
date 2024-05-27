import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Row, Col, Space, List, Typography, Image } from 'antd';
import { useSelector } from 'react-redux';
const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const userId = useSelector(state => state.user.id);
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: (orderItems) => (
        <span>
          {orderItems.map((item, index) => (
            <div key={index}>{item.productName}</div>
          ))}
        </span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => totalPrice.toLocaleString('vi-VN' , { style: 'currency', currency: 'VND' }).replace('₫', 'VND'),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (orderDate) => new Date(orderDate).toLocaleDateString(),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status) => 
        (status === "Pending"? <span>Đang xử lý</span> 
          : status === "Shipped"? <span>Đã gửi</span>
          : status === "Delivered"? <span>Đã giao</span>
          : status === "Cancelled"? <span>Đã hủy</span>
          : null
        )
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Button type="primary" size="small" onClick={() => handleOpenModal(record)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchOrderHistory();
  }, [userId]);

  

  const fetchOrderHistory = async () => {
    try {
      //await fetchUserId();
      const response = await fetch(`http://localhost:8083/api/order/get-all-userOrder/${userId}`);
      const data = await response.json();
      setOrderHistory(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const handleOpenModal = (record) => {
    setSelectedOrder(record);
    setSelectedOrderId(record.id);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ }}>
      <h1 style={{marginBottom: '32px'}}>Lịch sử mua hàng</h1>
      <Table columns={columns} dataSource={orderHistory} loading={loading} rowKey="id" />

      <Modal
        title={`Chi tiết đơn hàng #${selectedOrderId}`}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
      >
        {selectedOrder && (
          <div>
            <List
              itemLayout="vertical"
              dataSource={[selectedOrder.shippingAddress]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Typography.Title level={5} >Địa chỉ giao hàng</Typography.Title>}
                  />
                  <Space direction="vertical">
                    <Row gutter={[16, 16]}>
                      <Col span={12} className="left-align">Họ và tên:</Col>
                      <Col span={12} className="left-align">{item.fullName}</Col>
                      <Col span={12} className="left-align">Địa chỉ:</Col>
                      <Col span={12} className="left-align">{item.address}</Col>
                      <Col span={12} className="left-align">Số điện thoại:</Col>
                      <Col span={12} className="left-align">{item.phone.toString().replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</Col>
                    </Row>
                  </Space>
                </List.Item>
              )}
            />
            {<Typography.Title level={5}>Danh sách sản phẩm</Typography.Title>}

            <List
              itemLayout="horizontal"
              dataSource={selectedOrder.orderItems}
              renderItem={(item) => (
                <List.Item key={item.idProduct}>
                  <List.Item.Meta
                    avatar={<Image src={item.image} alt={item.name} width={100} />}
                    title={item.name}
                  />
                  <Space direction="vertical">
                    <p>Số lượng: {item.amount}</p>
                    <p>Giá: {item.price.toLocaleString()} VND</p>
                  </Space>
                </List.Item>
              )}
            />

            <List
              itemLayout="vertical"
              dataSource={[{ title: 'Thông tin thanh toán' }]}
              renderItem={(item) => (
                <List.Item key={item.title} style={{ borderBottom: '1px solid #ddd' }}>
                  <List.Item.Meta title={item.title} />
                  <Space direction="vertical">
                    <Row gutter={[16, 16]}>
                      <Col span={12} className="left-align">Phương thức thanh toán:</Col>
                      <Col span={12} className="right-align">{selectedOrder.paymentMethod}</Col>
                      <Col span={12} className="left-align">Tổng tiền sản phẩm:</Col>
                      <Col span={12} className="right-align">{selectedOrder.itemsPrice.toLocaleString()} VND</Col>
                      <Col span={12} className="left-align">Phí vận chuyển:</Col>
                      <Col span={12} className="right-align">{selectedOrder.shippingPrice.toLocaleString()} VND</Col>
                      <Col span={12} className="left-align">Tổng giá trị đơn hàng:</Col>
                      <Col span={12} className="right-align">{selectedOrder.totalPrice.toLocaleString()} VND</Col>
                      <Col span={12} className="left-align">Trạng thái thanh toán:</Col>
                      <Col span={12} className="right-align">{selectedOrder.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</Col>
                      <Col span={12} className="left-align">Trạng thái giao hàng:</Col>
                      <Col span={12} className="right-align">{selectedOrder.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}</Col>
                    </Row>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistory;