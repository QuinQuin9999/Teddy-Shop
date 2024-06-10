import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Table, message, Popconfirm, Modal, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import InputComponent from '../InputComponent/InputComponent';
import TableComponent from '../TableComponent/TableComponent';

const { Column } = Table;

const AdminCarousel = () => {
    const [form] = Form.useForm();
    const [carousels, setCarousels] = useState([]);
    const [editingId, setEditingId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        fetchCarousels();
    }, []);

    const fetchCarousels = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/v1/carousel/getAll');
            setCarousels(response.data);
        } catch (error) {
            message.error('Failed to fetch carousels');
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : ''); 

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileNameChange = (event) => {
        setFileName(event.target.value); 
    };

    const onFinish = async () => {
        const formData = new FormData();
        formData.append('fileName', fileName); 

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            if (editingId) {
                // Edit existing carousel
                await axios.put(`http://localhost:8083/api/v1/carousel/edit/${editingId}`, formData);
                message.success('Carousel updated successfully!');
            } else {
                // Create new carousel
                await axios.post('http://localhost:8083/api/v1/carousel/save', formData);
                message.success('Image uploaded successfully!');
            }
            form.resetFields();
            setIsModalVisible(false);
            fetchCarousels();
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload image');
        }
    };

    const deleteCarousel = async (id) => {
        try {
            await axios.delete(`http://localhost:8083/api/v1/carousel/delete/${id}`);
            message.success('Carousel deleted successfully');
            fetchCarousels();
        } catch (error) {
            message.error('Failed to delete carousel');
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedFile(null);
        setFileName('');
        setEditingId('');
        setImageUrl('');
    };

    const editCarousel = (record) => {
        setEditingId(record.id);
        setFileName(record.fileName);
        setImageUrl(record.url);
        setIsModalVisible(true);
        form.setFieldsValue({
            fileName: record.fileName,
        });
    };

    const renderAction = (text, record) => (
        <>
            <Button type="link" onClick={() => editCarousel(record)}>
                Chỉnh sửa
            </Button>
            <Popconfirm
                title="Bạn muốn xóa file này?"
                onConfirm={() => deleteCarousel(record.id)}
                okText="Xác nhận"
                cancelText="Thoát"
            >
                <Button type="link" danger>
                    Xoá
                </Button>
            </Popconfirm>
        </>
    );

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Nhập ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Đặt lại
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const renderUrl = (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">Xem</a>
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id.length - b.id.length,
            ...getColumnSearchProps('id')
        },
        {
            title: 'Tên file',
            dataIndex: 'fileName',
            sorter: (a, b) => a.fileName.length - b.fileName.length,
            ...getColumnSearchProps('fileName'),
        },
        {
            title: 'Dung lượng',
            dataIndex: 'data',
            sorter: (a, b) => a.data.length - b.data.length,
            ...getColumnSearchProps('data'),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            sorter: (a, b) => a.size.length - b.size.length,
            ...getColumnSearchProps('size'),
        },
        {
            title: 'URL',
            dataIndex: 'url',
            render: renderUrl
        },
        {
            title: '',
            dataIndex: 'action',
            render: renderAction
        }
    ]

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{marginBottom: '16px'}}>
                Thêm
            </Button>
            <Modal
                title={editingId ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item label="Hình ảnh">
                        {editingId ? (
                            <>
                                <img src={imageUrl} alt="Selected Image" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
                            </>
                        ) : (
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="Tên file">
                        <Input value={fileName} onChange={handleFileNameChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingId ? 'Cập nhật' : 'Lưu'}
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                            Thoát
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <TableComponent columns={columns} data={carousels} />
        </div>
    );
};

export default AdminCarousel;
