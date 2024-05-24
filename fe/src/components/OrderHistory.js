import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Space, notification, Popconfirm, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: (orderItems) => (
        <span>
          {orderItems.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VND'),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Ngày giao',
      dataIndex: 'deliveredAt',
      key: 'deliveredAt',
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" size="small" onClick={() => handleOpenModal(record)}>
            Chi tiết
          </Button>
          <Button type="default" size="small" onClick={() => handleEditOrder(record)}>
            Sửa
          </Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa đơn hàng này?" onConfirm={() => handleDeleteOrder(record.id)}>
            <Button type="danger" size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/admin/orders/get-all-orders');
      setOrderHistory(response.data.data); // Đảm bảo rằng response.data.data chứa mảng các đơn hàng
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order history:', error);
      notification.error({ message: 'Lỗi khi tải lịch sử đơn hàng' });
    }
  };

  const handleOpenModal = (record) => {
    setSelectedOrder(record);
    setSelectedOrderId(record.id);
    setEditMode(false);
    setModalVisible(true);
  };

  const handleEditOrder = (record) => {
    setSelectedOrder(record);
    setSelectedOrderId(record.id);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8083/api/admin/orders/delete-order/${orderId}`);
      setOrderHistory(orderHistory.filter(order => order.id !== orderId));
      notification.success({ message: 'Đơn hàng đã được xóa thành công' });
    } catch (error) {
      console.error('Error deleting order:', error);
      notification.error({ message: 'Lỗi khi xóa đơn hàng' });
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:8083/api/admin/orders/update-order/${selectedOrderId}`, values);
      setOrderHistory(orderHistory.map(order => (order.id === selectedOrderId ? { ...order, ...values } : order)));
      notification.success({ message: 'Đơn hàng đã được cập nhật thành công' });
      setModalVisible(false);
    } catch (error) {
      console.error('Error submitting order:', error);
      notification.error({ message: 'Lỗi khi gửi thông tin đơn hàng' });
    }
  };

  return (
    <div>
      <h1>Lịch sử mua hàng</h1>
      <Table columns={columns} dataSource={orderHistory} loading={loading} rowKey="_id" />

      <Modal
        title={editMode ? `Sửa đơn hàng #${selectedOrderId}` : 'Chi tiết đơn hàng'}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
      >
        <OrderForm
          order={editMode ? selectedOrder : selectedOrder}
          onSubmit={handleSubmit}
          editMode={editMode}
        />
      </Modal>
    </div>
  );
};

const OrderForm = ({ order, onSubmit, editMode }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      fullName: order?.shippingAddress?.fullName || '',
      address: order?.shippingAddress?.address || '',
      phone: order?.shippingAddress?.phone || '',
      paymentMethod: order?.paymentMethod || '',
      totalPrice: order?.totalPrice || '',
      status: order?.status || '',
    });
  }, [order, form]);

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
        <Input disabled={!editMode} />
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
        <Input disabled={!editMode} />
      </Form.Item>
      <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
        <Input disabled={!editMode} />
      </Form.Item>
      <Form.Item name="paymentMethod" label="Phương thức thanh toán" rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}>
        <Select disabled={!editMode}>
          <Option value="COD">Thanh toán khi giao hàng (COD)</Option>
          <Option value="Credit Card">Thẻ tín dụng</Option>
          <Option value="Paypal">Paypal</Option>
        </Select>
      </Form.Item>
      <Form.Item name="totalPrice" label="Tổng tiền" rules={[{ required: true, message: 'Vui lòng nhập tổng tiền' }]}>
        <Input disabled={!editMode} />
      </Form.Item>
      <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng' }]}>
        <Select disabled={!editMode}>
          <Option value="Pending">Đang xử lý</Option>
          <Option value="Shipped">Đã gửi</Option>
          <Option value="Delivered">Đã giao</Option>
          <Option value="Cancelled">Đã hủy</Option>
        </Select>
      </Form.Item>
      {editMode && (
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      )}
    </Form>
  );
};

export default OrderHistory;
