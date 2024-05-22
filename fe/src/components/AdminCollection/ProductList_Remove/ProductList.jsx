import React, { useState, useEffect } from 'react'
import { List, Divider, Button, message, Checkbox } from 'antd'
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
          product._id === id ? { ...product, checked: !product.checked } : product
        ));
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
        queryFn: () => {
            setIsFetchRemoveProducts(false)
            return CollectionService.removeProducts(collectionId, {name: collectionName, productList: data})
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
                <div style={{flex: '1', textAlign: 'center'}}><strong>HÃNG</strong></div>
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
                    <div style={{flex: '1', textAlign: 'center'}}>{product.name}</div>
                    <div style={{flex: '1', textAlign: 'center'}}>{product.type}</div>
                    <div style={{flex: '1', textAlign: 'center'}}>{product.description.Producer}</div>
                    <div style={{flex: '1', textAlign: 'center'}}>{product.price.toLocaleString()} đ</div>
                    <Checkbox checked={product.checked} onChange={() => handleCheckboxChange(product._id)} />
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