import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sampleOrders = [
      {
        id: 1,
        products: ['Product 1', 'Product 2'],
        total: 100,
        status: 'Đã giao',
        deliveryDate: '2024-04-18',
      },
      {
        id: 2,
        products: ['Product 3', 'Product 4'],
        total: 150,
        status: 'Đang giao',
        deliveryDate: '2024-04-20',
      },
    ];
    setOrders(sampleOrders);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {products.map((product) => (
            <Tag key={product}>{product}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Delivered' ? 'green' : 'blue'}>{status}</Tag>
      ),
    },
    {
      title: 'Ngày giao hàng',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Lịch sử mua hàng</h1>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default OrderHistory;