import { Button, Form, Input, Modal, notification, Popconfirm, Select, Space, Table, DatePicker } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Option } = Select;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const orderStatuses = ["Pending", "Shipping", "Delivered", "Cancelled"];

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
        <div>
          {orderItems.map((item, index) => (
            <div key={index}>{item.productName}</div>
          ))}
        </div>
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
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (orderDate) => new Date(orderDate).toLocaleDateString(),
    },
    // {
    //   title: 'Ngày giao',
    //   dataIndex: 'deliveredDate',
    //   key: 'deliveredDate',
    //   render: (deliveredDate) => new Date(deliveredDate).toLocaleDateString(),
    // },
    {
      title: 'Thanh toán',
      dataIndex: 'paid',
      key: 'paid',
      render: (paid) => paid? <span style={{color:"green"}}>Đã thanh toán</span> : <span style={{color:"red"}}>Chưa thanh toán</span>,
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" size="small" onClick={() => handleOpenModal(record)}>
            Chi tiết
          </Button>
          <Button type="default" size="small" icon={ <EditOutlined /> } onClick={() => handleEditOrder(record)}>
          </Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa đơn hàng này?" onConfirm={() => handleDeleteOrder(record.id, record.status)}>
            <Button type="danger" size="small" icon={ <DeleteOutlined style={{color: 'red'}} /> }>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    if (!!orders) {
      setPendingOrders(orders.filter(order => order.status === 'Pending'))
      setShippingOrders(orders.filter(order => order.status === 'Shipping'))
      setDeliveredOrders(orders.filter(order => order.status === 'Delivered'))
      setCancelledOrders(orders.filter(order => order.status === 'Cancelled'))
    }
  }, [orders])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/order/get-all-order');
      // console.log(response.data.data)
      setOrders(response.data.data); 
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

  const handleDeleteOrder = async (orderId, status) => {
    try {
      await axios.delete(`http://localhost:8083/api/order/delete-order/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
      notification.success({ message: 'Đơn hàng đã được xóa thành công' });
    } catch (error) {
      console.error('Error deleting order:', error);
      notification.error({ message: 'Lỗi khi xóa đơn hàng' });
    }
  };

  const handleSubmit = async (values) => {
    try {
      const updateOrder = {...selectedOrder, ...values};
      await axios.put(`http://localhost:8083/api/order/update-order/${selectedOrderId}`, updateOrder);
      setOrders(orders.map(order => (order.id === selectedOrderId ? { ...order, ...values } : order)));
      notification.success({ message: 'Đơn hàng đã được cập nhật thành công' });
      setModalVisible(false);
    } catch (error) {
      console.error('Error submitting order:', error);
      notification.error({ message: 'Lỗi khi cập nhật đơn hàng' });
    }
  };

  return (
    orderStatuses.map((orderStatus, index) => (
      <div key={index}>
        <h2>
          Đơn hàng {orderStatus === 'Pending'? 'đang xử lý' : orderStatus === 'Shipping'? 'đang giao' : orderStatus === 'Delivered'? 'đã giao' : 'đã bị huỷ'}
        </h2>
        <Table 
          columns={columns} 
          dataSource={orderStatus === 'Pending'? pendingOrders : orderStatus === 'Shipping'? shippingOrders : orderStatus === 'Delivered'? deliveredOrders : cancelledOrders} 
          loading={loading} 
          rowKey="id" />

        <Modal
          title={editMode ? `Sửa đơn hàng #${selectedOrderId}` : 'Chi tiết đơn hàng'}
          open={modalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={700}
        >
          <OrderForm
            order={selectedOrder}
            onSubmit={handleSubmit}
            editMode={editMode}
          />
        </Modal>
      </div>
    ))
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
      orderDate: order?.orderDate || '',
      deliveredDate: order?.deliveredDate || '',
      paid: order?.paid,
      // orderItems: order?.orderItems.map(orderItem => orderItem.productName).join(', ') || '',
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
      <Form.Item name="orderDate" label="Ngày đặt" >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="deliveredDate" label="Giao" >
        <DatePicker disabled={!editMode} />
      </Form.Item>
      <Form.Item name="paid" label="Tình trạng thanh toán" >
        <Select disabled={!editMode}>
          <Option value={true}>Đã thanh toán</Option>
          <Option value={false}>Chưa thanh toán</Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng' }]}>
        <Select disabled={!editMode}>
          <Option value="Pending">Đang xử lý</Option>
          <Option value="Shipping">Đang giao</Option>
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
