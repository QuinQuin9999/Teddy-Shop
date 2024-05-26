import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import axios from 'axios';

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubModalVisible, setIsSubModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8083/api/v1/category/getAll`);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8083/api/v1/category/delete/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleDeleteSubCategory = async (categoryId, subId) => {
    try {
      console.log(`Deleting subCategory with ID ${subId} from category ${categoryId}`);
      await axios.delete(`http://localhost:8083/api/v1/category/deleteSubCategory/${categoryId}/${subId}`);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete subcategory:', error);
    }
  };
   

  const showModal = (category = null) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const showSubModal = (category, subCategory = null) => {
    setEditingCategory(category);
    setEditingSubCategory(subCategory);
    setIsSubModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsSubModalVisible(false);
    setEditingCategory(null);
    setEditingSubCategory(null);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:8083/api/v1/category/edit/${editingCategory.id}`, values);
      } else {
        await axios.post(`http://localhost:8083/api/v1/category/save`, values);
      }
      fetchCategories();
      setIsModalVisible(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to submit category:', error);
    }
  };

  const handleSubFormSubmit = async (values) => {
    try {
      if (editingSubCategory) {
        await axios.put(`http://localhost:8083/api/v1/category/editSubCategory/${editingCategory?.id}/${editingSubCategory?.id}`, values);
      } else {
        await axios.post(`http://localhost:8083/api/v1/category/addSubCategory/${editingCategory?.id}`, values);
      }
      fetchCategories();
      setIsSubModalVisible(false);
      setEditingSubCategory(null);
    } catch (error) {
      console.error('Failed to submit subcategory:', error);
    }
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Danh mục con',
      dataIndex: 'subCategories',
      key: 'subCategories',
      render: (subCategories, record) => (
        <ul>
          {subCategories.map(sub => (
            <li key={sub.id} style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
              {sub.subCategoryName} 
              <diV>
              <Button style={{marginRight: '10px'}} onClick={() => showSubModal(record, sub)}>Sửa</Button>
              <Button onClick={() => handleDeleteSubCategory(record.id, sub.id)} danger>Xóa</Button>
              </diV>
            </li>
          ))}
          <Button onClick={() => showSubModal(record)}>Thêm Danh mục con</Button>
        </ul>
      ),
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)}>Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => showModal()}>Thêm Danh mục</Button>
      <Table columns={columns} dataSource={categories} rowKey="id" loading={loading} />
      <Modal title={editingCategory ? 'Edit Category' : 'Add Category'} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          initialValues={editingCategory || { categoryName: '' }}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item label="Tên danh mục" name="categoryName" rules={[{ required: true, message: 'Nhập tên Danh mục!' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form>
      </Modal>
      <Modal title={editingSubCategory ? 'Edit SubCategory' : 'Add SubCategory'} visible={isSubModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          initialValues={editingSubCategory || { subCategoryName: '', href: '' }}
          onFinish={handleSubFormSubmit}
          layout="vertical"
        >
          <Form.Item label="Tên danh mục con" name="subCategoryName" rules={[{ required: true, message: 'Nhập tên Danh mục con!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Href" name="href" rules={[{ required: true, message: 'Nhập tên link Danh mục con!' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AdminCategory;
