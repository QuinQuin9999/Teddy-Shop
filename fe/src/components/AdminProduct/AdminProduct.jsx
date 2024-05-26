import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Input, InputNumber, Select, Space, Tag } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import InputComponent from "../InputComponent/InputComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../Message/Message'
import { useQuery } from "@tanstack/react-query";
import { renderOptionsType } from '../../utils'
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import axios from "axios";
import { deleteProduct, saveOrUpdate, update } from "../../services/ProductService";
import {Cloudinary} from "@cloudinary/url-gen";
import Upload from "antd/es/upload/Upload";


const AdminProduct = () =>
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user)
    const [imageUrl, setImageUrl] = useState('');

 const initial = () => ({
    id: '',
    productName: '',
    productImg: '',
    productType: '',
    productPrice: [],
    discount: '',
    countInStock: [],
    description: {
        Material: [],
        Color: [],
        Size: []
    },
    newType: ''
});
      
    const [stateProduct, setStateProduct] = useState(initial())

    const [stateProductDetails, setStateProductDetails] = useState(initial())
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const mutation = useMutationHook(
        (data) => {
          const {      
          productName,
          productImg,
          productType,
          productPrice,
          discount,
          countInStock,
          description } = data
          const res = saveOrUpdate({
          productName,
          productImg,
          productType,
          productPrice,
          discount,
          countInStock,
          description 
          })
          return res
        }
    )

    const mutationUpdate = useMutationHook(
        (data) => {
          const { _id,
            token,
            ...rests } = data
          const res = update(
            _id,
            token,
            { ...rests })
          return res
        },
      )

    const mutationDeleted = useMutationHook(
        (data) => {
          const { id,
            token,
          } = data
          const res = deleteProduct(
            id,
            token)
          return res
        },
      )


    const getAllProducts = async () => {
        const res = await axios.get(`http://localhost:8083/api/v1/product/getAll`);
        return res
      }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await axios.get(`http://localhost:8083/api/v1/product/search/${rowSelected}`);
        if (res?.data) {
            setStateProductDetails({
            id: res?.data?.id,
            productName: res?.data?.productName,
            productPrice: res?.data?.productPrice,
            description: res?.data?.description,
            countInStock: res?.data?.countInStock,
            productImg: res?.data?.productImg,
            productType: res?.data?.productType,
            discount: res?.data?.discount
          })
        }
        setIsLoadingUpdate(false)
      }
    
    const fetchAllTypeProduct = async () => {
        const res = await axios.get(`http://localhost:8083/api/v1/product/getAllTypes`);
        return res
      }
  
    useEffect(() => {
        if(!isModalOpen) {
          form.setFieldsValue(stateProductDetails)
        }else {
          form.setFieldsValue(initial())
        }
      }, [form, stateProductDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
          setIsLoadingUpdate(false) 
          fetchGetDetailsProduct(rowSelected)
        }
      }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDeleted 
    const queryProduct = useQuery({queryKey: ['products'], queryFn: getAllProducts})
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })

    const {isLoading: isLoadingProducts, data: products} = queryProduct
    const renderAction = () => {
        return (
          <div>
            <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
          </div>
        )
      }
    
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
    
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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id.length - b.id.length,
            ...getColumnSearchProps('id')
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            sorter: (a, b) => a.productName.length - b.productName.length,
            ...getColumnSearchProps('productName'),
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'productType',
            sorter: (a, b) => a.productType.length - b.productType.length,
            ...getColumnSearchProps('productType')
        },
        {
            title: 'Giá',
            dataIndex: 'productPrice',
            sorter: (a, b) => {
              const priceA = Object.values(a.productPrice || {}).reduce((sum, price) => sum + price, 0);
              const priceB = Object.values(b.productPrice || {}).reduce((sum, price) => sum + price, 0);
              return priceA - priceB;
          },
          render: (prices) => {
              if (!prices || typeof prices !== 'object') {
                  return <Tag>Không có giá</Tag>;
              }
              return Object.entries(prices).map(([size, price]) => (
                  <Tag key={size}>{size}: {price}</Tag>
              ));
          },
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            sorter: (a, b) => a.discount - b.discount,
            filters: [
                { text: '<=10%', value: '<=10' },
                { text: '10%-20%', value: '10-20' },
                { text: '20%-30%', value: '20-30' },
                { text: '30%-40%', value: '30-40' },
                { text: '40% - 50%', value: '40-50' },
                { text: '>=50%', value: '>=50' },
            ],
            onFilter: (value, record) => {
                if (value === '<=10') {
                    return record.discount <= 10;
                } else if (value === '10-20') {
                    return record.discount >= 10 && record.discount <= 20;
                } else if (value === '20-30') {
                    return record.discount >= 20 && record.discount <= 30;
                } else if (value === '30-40') {
                    return record.discount >= 30 && record.discount <= 40;
                } else if (value === '40-50') {
                    return record.discount >= 40 && record.discount <= 50;
                } else {
                    return record.discount >= 50;
                }
            }
        },
        {
            title: '',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    
      const dataTable = products?.data?.map(product => ({ ...product, key: product._id }));

    
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
          message.success()
          handleCancel()
        } else if (isError) {
          message.error()
        }
      }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
          message.success()
          handleCancelDelete()
        } else if (isErrorDeleted) {
          message.error()
        }
      }, [isSuccessDeleted])
    
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
      }

    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.accessToken }, {
          onSettled: () => {
            queryProduct.refetch()
          }
        })
        setIsModalOpenDelete(false)
    }
      
    
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            productName: '',
            productImg: '',
            productType: '',
            productPrice: [],
            discount: '',
            countInStock: [],
            description: {
                Material: [],
                Color: [],
                Size: []
            }      })
        form.resetFields()
      };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
          message.success()
          handleCloseDrawer()
        } else if (isErrorUpdated) {
          message.error()
        }
      }, [isSuccessUpdated])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
    productName: '',
    productImg: '',
    productType: '',
    productPrice: [],
    discount: '',
    countInStock: [],
    description: {
        Material: [],
        Color: [],
        Size: []
    }
        })
        setImageUrl('');
        form.resetFields()
      };

      const handlePriceChange = (prices) => {
        const newProductPrice = prices.reduce((acc, { size, price }) => {
            acc[size] = price;
            return acc;
        }, {});
        setStateProduct((prevState) => ({
            ...prevState,
            productPrice: newProductPrice,
        }));
    };

    const handleStockChange = (stocks) => {
      const newCountInStock = stocks.reduce((acc, { color, size, quantity }) => {
          if (!acc[color]) {
              acc[color] = {};
          }
          acc[color][size] = quantity;
          return acc;
      }, {});
      setStateProduct((prevState) => ({
          ...prevState,
          countInStock: newCountInStock,
      }));
  };

  const onFinish = (values) => {
    handlePriceChange(values.productPrice);
    handleStockChange(values.countInStock);
        const params = {
            productName: stateProduct.productName,
            productPrice: stateProduct.productPrice,
            description: stateProduct.description,
            countInStock: stateProduct.countInStock,
            productImg: imageUrl,
            productType: stateProduct.productType,
            discount: stateProduct.discount,
        };
    
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
                handleCancel();
            },
        });
    };
    
    
    const handleOnchange = (e) => {
      const { name, value } = e.target;
      setStateProduct((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
        ...stateProductDetails,
        [e.target.name] : e.target.value
    })
}
  
    const onUpdateProduct = () => {
        mutationUpdate.mutate({ _id: rowSelected, token: user?.accessToken, ...stateProductDetails }, {
          onSettled: () => {
            queryProduct.refetch()
          }
        })
        setIsOpenDrawer(false);
      }

    const handleChangeSelect = (value) => {
        setStateProduct({
          ...stateProduct,
          type: value
        })
    }

  console.log("Type moi", typeProduct?.data?.data)
  
  const handleUpload = async (files) => {
    const file = files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dsbigrnvs/image/upload', formData); // Replace with your Cloudinary URL
      setImageUrl(response.data.secure_url);
      setStateProductDetails((prevState) => ({
          ...prevState,
          productImg: response.data.secure_url
      }));
      message.success('Image uploaded successfully!');
  } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      message.error('Error uploading image!');
  }
};

const customUpload = {
    async beforeUpload(file) {
        await handleUpload(file);
        return false; // Ngăn hành vi tải lên mặc định
    },
};


    const handleAttributeChange = (key, value, isDetail = false) => {
      const newValue = Array.isArray(value) ? [...value] : value;
  
      if (isDetail) {
          setStateProductDetails((prevState) => ({
              ...prevState,
              description: {
                  ...prevState.description,
                  [key]: newValue,
              },
          }));
      } else {
          setStateProduct((prevState) => ({
              ...prevState,
              description: {
                  ...prevState.description,
                  [key]: newValue,
              },
          }));
      }
  };

  const renderDescription = (description) => {
    return (
        <>
            <Form.Item label="Chất liệu" name={['description', 'Material']}>
                <Input value={description.Material.join(', ')} onChange={handleOnchangeDetails} name="Material" />
            </Form.Item>
            <Form.Item label="Màu sắc" name={['description', 'Color']}>
                <Input value={description.Color.join(', ')} onChange={handleOnchangeDetails} name="Color" />
            </Form.Item>
            <Form.Item label="Kích thước" name={['description', 'Size']}>
                <Input value={description.Size.join(', ')} onChange={handleOnchangeDetails} name="Size" />
            </Form.Item>
        </>
    );
};
const renderProductPriceFields = (productPrice) => {
  return Object.keys(productPrice).map((key) => (
      <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
          <Input
              style={{ marginRight: 8 }}
              value={key}
              readOnly
          />
          <Input
              value={productPrice[key]}
              onChange={(e) => handlePriceChange(key, e.target.value)}
              placeholder="Giá"
          />
      </div>
  ));
};

const renderCountInStockFields = (countInStock) => {
  return Object.keys(countInStock).map((color) => (
      <div key={color}>
          <h4 style={{fontSize: '14px'}}>{color}</h4>
          {Object.keys(countInStock[color]).map((size) => (
              <div key={size} style={{ display: 'flex', marginBottom: 8 }}>
                  <Input
                      style={{ marginRight: 8 }}
                      value={size}
                      readOnly
                  />
                  <Input
                      value={countInStock[color][size]}
                      onChange={(e) => handleStockChange(color, size, e.target.value)}
                      placeholder="Số lượng"
                  />
              </div>
          ))}
      </div>
  ));
};

console.log('detail',stateProductDetails)


return(
      <div style={{margin: '20px 20px'}}>
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{ height: '50px', width: '50px', borderRadius: '6px', borderStyle: 'dashed' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '20px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    isLoading={isLoadingProducts}
                    columns={columns}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record.id);
                            },
                        };
                    }}
                />
            </div>
            <ModalComponent
                forceRender
                title="Thêm sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={form.submit}
            >
               <Form form={form} onFinish={onFinish} layout="vertical" initialValues={stateProduct}>
    <Form.Item
        label="Tên sản phẩm"
        name="productName"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
    >
        <Input
            value={stateProduct['productName']}
            onChange={(e) => handleOnchange(e)}
            name="productName"
        />
    </Form.Item>
    <Form.Item
        label="Loại"
        name="productType"
        rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
    >
        <Input
            value={stateProduct['productType']}
            onChange={(e) => handleOnchange(e)}
            name="productType"
        />
    </Form.Item>
    <Form.Item
        label="Giảm giá"
        name="discount"
        rules={[{ required: true, message: 'Vui lòng nhập giảm giá!' }]}
    >
        <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            onChange={value => handleOnchange({ target: { name: 'discount', value } })}
        />
    </Form.Item>
    <Form.Item label="Chất liệu" name="description.Material">
        <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Thêm chất liệu"
            onChange={value => handleAttributeChange('Material', value)}
        />
    </Form.Item>
    <Form.Item label="Màu sắc" name="description.Color">
        <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Thêm màu sắc"
            onChange={value => handleAttributeChange('Color', value)}
        />
    </Form.Item>
    <Form.Item label="Kích thước" name="description.Size">
        <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Thêm kích thước"
            onChange={value => handleAttributeChange('Size', value)}
        />
    </Form.Item>
    <Form.Item label="Giá sản phẩm">
                <Form.List name="productPrice">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'size']}
                                        fieldKey={[fieldKey, 'size']}
                                        rules={[{ required: true, message: 'Vui lòng nhập kích thước!' }]}
                                    >
                                        <Input placeholder="Kích thước" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        fieldKey={[fieldKey, 'price']}
                                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            formatter={(value) => `₫ ${value}`}
                                            parser={(value) => value.replace('₫', '')}
                                            placeholder="Giá"
                                        />
                                    </Form.Item>
                                    <Button type="dashed" onClick={() => remove(name)} icon={<DeleteOutlined />} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm giá
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item label="Hàng tồn kho">
                <Form.List name="countInStock">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'color']}
                                        fieldKey={[fieldKey, 'color']}
                                        rules={[{ required: true, message: 'Vui lòng nhập màu!' }]}
                                    >
                                        <Input placeholder="Màu" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'size']}
                                        fieldKey={[fieldKey, 'size']}
                                        rules={[{ required: true, message: 'Vui lòng nhập kích thước!' }]}
                                    >
                                        <Input placeholder="Kích thước" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        fieldKey={[fieldKey, 'quantity']}
                                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                                    >
                                        <InputNumber min={0} placeholder="Số lượng" />
                                    </Form.Item>
                                    <Button type="dashed" onClick={() => remove(name)} icon={<DeleteOutlined />} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add({ color: '', size: '', quantity: 0 })} block icon={<PlusOutlined />}>
                                    Thêm hàng tồn kho
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item label="Hình ảnh" name="productImg">
                    <input
                        type="file"
                        onChange={(e) => handleUpload(e.target.files)}
                        accept="image/*"
                    />
                    {imageUrl && (
                        <img src={imageUrl} alt="Product" style={{ width: '100px', height: '100px' }} />
                    )}
                </Form.Item>
</Form>
            </ModalComponent>
             <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
                    label="ID"
                    name="id"
                    rules={[{ required: true, message: 'Vui lòng nhập id sản phẩm!' }]}
                >
                    <Input value={stateProductDetails.id} onChange={handleOnchangeDetails} name="id" />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    name="productName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input value={stateProductDetails.productName} onChange={handleOnchangeDetails} name="productName" />
                </Form.Item>
                <Form.Item
                    label="Loại"
                    name="productType"
                    rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
                >
                    <Input value={stateProductDetails.productType} onChange={handleOnchangeDetails} name="productType" />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="price"
                >
                   {renderProductPriceFields(stateProductDetails.productPrice)}
                </Form.Item>
                {stateProductDetails.description && renderDescription(stateProductDetails.description)}
                <Form.Item
                    label="Giảm giá"
                    name="discount"
                    rules={[{ required: true, message: 'Vui lòng nhập giảm giá của sản phẩm!' }]}
                >
                    <Input value={stateProductDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                </Form.Item>
                <Form.Item
                    label="Hàng trong kho"
                    name="countInStock"
                >
                  {renderCountInStockFields(stateProductDetails.countInStock)}
                    {/* <Input value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" /> */}
                </Form.Item>
                <Form.Item label="Hình ảnh" name="productImg">
                    <input
                        type="file"
                        onChange={(e) => handleUpload(e.target.files)}
                        accept="image/*"
                    />
                    {stateProductDetails.productImg && (
                        <img src={stateProductDetails.productImg} alt="Product" style={{ width: '100px', height: '100px' }} />
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        {/* </Loading> */}
      </DrawerComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        {/* <Loading isLoading={isLoadingDeleted}> */}
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        {/* </Loading> */}
      </ModalComponent>
        </div>
    </div>
    )
}

export default AdminProduct;

