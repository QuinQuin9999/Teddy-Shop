import React, { useState, useEffect } from 'react'
import { Tag, List, Divider, Button, message, Checkbox } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import * as CollectionService from '../../../services/CollectionService'
import { useQuery } from '@tanstack/react-query'
import AddProductsBtn from '../AddProductsBtn/AddProductsBtn'
import { useDispatch } from 'react-redux';
import { removeProducts } from '../../../redux/slices/collectionSlice';

const ProductList = ({collectionId, collectionName, productList}) => {

    const dispatch = useDispatch()

    const [data, setData] = useState(productList.map(product => ({...product, checked: false})))
    const [isFetchRemoveProducts, setIsFetchRemoveProducts] = useState(false)

    useEffect(() => {
        setData(productList.map(product => ({...product, checked: false})))
    }, [collectionId])

    useEffect(() => {
        setData(productList.map(product => ({...product, checked: false})))
    }, [productList])

    const handleCheckboxChange = (id) => {
        setData(data.map(product =>
          product.id === id ? { ...product, checked: !product.checked } : product
        ));
    };

    const renderProductPrice = (productPrice) => {
        if (!productPrice || typeof productPrice !== 'object') {
            return <Tag>Không có giá</Tag>;
        }
        return Object.entries(productPrice).map(([size, price]) => (
            <div><Tag key={size}>{size}: {price} đ</Tag></div> 
        ));
    };

    const renderProductDescription = (description) => {
        if (!description || typeof description !== 'object') {
            return null;
        }
        return  (
            <>
                <div><Tag>Material: {description.Material}</Tag></div> 
                <div><Tag>Color: {description.Color}</Tag></div>        
            </>
        )
    };

    const handleDelete = () => {
        setData(data.filter(product => !product.checked).map(product => {
            const { checked, ...newProduct } = product
            return newProduct
        }));
        setIsFetchRemoveProducts(true)
        message.success('Remove Products Success')
    };

    const { data: removeResponse, isLoading, error } = useQuery({
        queryKey: ['removeProducts'],
        queryFn: async () => {
            setIsFetchRemoveProducts(false)
            return await CollectionService.removeProducts(collectionId, { productList: data})
        },
        enabled: isFetchRemoveProducts,
    });

    useEffect(() => {
        if (removeResponse) {
            if (removeResponse.status === 'OK') {
                dispatch(removeProducts(removeResponse.data))
                // console.log(removeResponse.data)
            }
        }
    }, [removeResponse])

    return (
        <>
        <List>
            <List.Item>
                <div style={{flex: '1', textAlign: 'center'}}><strong>TÊN</strong></div>
                <div style={{flex: '1', textAlign: 'center'}}><strong>LOẠI</strong></div>
                <div style={{flex: '1', textAlign: 'center'}}><strong>ĐẶC ĐIỂM</strong></div>
                <div style={{flex: '1', textAlign: 'center'}}><strong>GIÁ</strong></div>
                <Button danger type="text" icon={<DeleteFilled style={{color: '#FF4D4F'}} />}
                    onClick={handleDelete}
                >
                </Button>
            </List.Item>
        </List>
        <Divider></Divider>
        <List
            dataSource={data}
            renderItem={(product) => (
                <List.Item>
                    <div style={{flex: '1', textAlign: 'center'}}>{product.productName}</div>
                    <div style={{flex: '1', textAlign: 'center'}}>{product.productType}</div>
                    <div style={{flex: '1', textAlign: 'center'}}>{renderProductDescription(product.description)}</div>
                    <div style={{flex: '1', textAlign: 'center'}}>{renderProductPrice(product.productPrice)}</div>
                    <Checkbox checked={product.checked} onChange={() => handleCheckboxChange(product.id)} />
                </List.Item>
            )}
        />
        <Divider></Divider>
        <AddProductsBtn 
            collectionId={collectionId}
        />
        </>
    )
}

export default ProductList