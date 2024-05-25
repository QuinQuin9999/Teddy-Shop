import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const AdminUser = () => {
   
  const [users, setUsers] = useState([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [form] = Form.useForm();
  const [deleteUserId, setDeleteUserId] = useState(null);
  const searchInput = useRef(null);  
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    
  };  
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/user/getAllUsers');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    setDeleteUserId(userId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8083/api/user/delete-user/${deleteUserId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status === 'OK') {
        message.success('User deleted successfully');
        fetchUserData();
      } else {
        message.error('Failed to delete user');
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred while deleting user');
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const handleCancel = () => {
    setUpdateModalVisible(false);
    setDeleteModalVisible(false);
    setDeleteUserId(null);
  };

  const showModal = (user) => {
    setUpdateModalVisible(true);
    setUserData(user);
    form.setFieldsValue(user);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8083/api/user/updateUser/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.status === 'OK') {
        message.success('User updated successfully');
        setUpdateModalVisible(false);
        fetchUserData();
      } else {
        message.error('Failed to update user');
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred while updating user');
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}

          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: open => {
      if (open) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      sorter: (a, b) => a.phone - b.phone,
      render: (phone) => phone.toString().replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3'),

    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address'),
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <EditOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => showModal(record)} />
          <DeleteOutlined style={{ marginLeft: 8, color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={() => handleDelete(record.id)} />
        </span>
      ),
    },
  ];

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title="Cập nhật thông tin"
        visible={updateModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Nhập tên người dùng' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Nhập email' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Nhập số điện thoại' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Nhập địa chỉ' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa người dùng này không?</p>
      </Modal>
    </div>
  );
};

export default AdminUser;