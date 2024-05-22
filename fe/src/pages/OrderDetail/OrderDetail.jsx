import React, { useState,  } from 'react';
import { List, Image, Space, Typography, Card } from 'antd';

const OrderDetail = () => {
  // const [orderDetail, setOrderDetail] = useState(null);

  // useEffect(() => {
  //   fetch(`http://localhost:8083/api/orderDetail/get-details-order/66299c5f3a8b7a497434512a`, {
  //     mode: 'cors',
  //     credentials: 'include',
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setOrderDetail(data))
  //     .catch((error) => {
  //       console.error('Error fetching order detail:', error);
  //       // Hiển thị thông báo lỗi cho người dùng
  //     });
  // }, []);

  // if (!orderDetail) {
  //   return <div>Loading...</div>;
  // }
  const [orderDetail, ] = useState({
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      address: '123, Fake Street',
      phone: '0123456789',
    },
    orderItems: [
      {
        _id: '1',
        image: 'https://via.placeholder.com/150', // Placeholder image
        name: 'chuột',
        amount: 2,
        price: 200000,
      },
      {
        _id: '2',
        image: 'https://via.placeholder.com/150', // Placeholder image
        name: 'chuột',
        amount: 1,
        price: 350000,
      },
    ],
    paymentMethod: 'Thanh toán khi giao hàng (COD)',
    itemsPrice: 550000,
    shippingPrice: 20000,
    totalPrice: 570000,
    isPaid: false,
    isDelivered: false,
  });
  return (
    <Card title="Chi tiết đơn hàng" style={{ width: '100%' }}>
      <List
        itemLayout="horizontal"
        dataSource={orderDetail.shippingAddress ? [orderDetail.shippingAddress] : []}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Typography.Title level={4}>Địa chỉ giao hàng</Typography.Title>}
            />
            <Space direction="vertical">
              <p>Họ và tên: {item.fullName}</p>
              <p>Địa chỉ: {item.address}</p>
              <p>Số điện thoại: {item.phone}</p>
            </Space>
          </List.Item>
        )}
      />

      <List
        itemLayout="horizontal"
        dataSource={orderDetail.orderItems || []}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Image src={item.image} alt={item.name} width={64} />}
              title={item.name}
            />
            <Space direction="vertical">
              <p>Số lượng: {item.amount}</p>
              <p>Giá: {item.price} VND</p>
            </Space>
          </List.Item>
        )}
      />

      <List
        itemLayout="horizontal"
        dataSource={[{ title: 'Thông tin thanh toán' }]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} />
            <Space direction="vertical">
              <p>Phương thức thanh toán: {orderDetail.paymentMethod}</p>
              <p>Tổng tiền sản phẩm: {orderDetail.itemsPrice} VND</p>
              <p>Phí vận chuyển: {orderDetail.shippingPrice} VND</p>
              <p>Tổng giá trị đơn hàng: {orderDetail.totalPrice} VND</p>
              <p>Trạng thái thanh toán: {orderDetail.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
              <p>Trạng thái giao hàng: {orderDetail.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}</p>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default OrderDetail;