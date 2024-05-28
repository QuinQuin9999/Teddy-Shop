import React, { useState, useEffect } from 'react'
import { Tag, List, Divider, Button, message, Checkbox } from 'antd'
import * as CollectionService from '../../../services/CollectionService'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux';
import { addProducts } from '../../../redux/slices/collectionSlice';

const ProductList = ({collectionId, productList}) => {

    const dispatch = useDispatch()

    const [data, setData] = useState(productList.map(product => ({...product, checked: false})))
    const [isFetchAddProducts, setIsFetchAddProducts] = useState(false)
    const [reqData, setReqData] = useState([])

    useEffect(() => {
        setData(productList.map(product => ({...product, checked: false})))
    }, [productList])

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

    const handleCheckboxChange = (id) => {
        setData(data.map(product =>
          product.id === id ? { ...product, checked: !product.checked } : product
        ));
    };

    const handleInsert = () => {
        setData(data.filter(product => !product.checked));
        setReqData(data.filter(product => product.checked).map(product => {
            const { checked, ...newProduct } = product
            return newProduct
        }));
        
        setIsFetchAddProducts(true)
    };

    const { data: addResponse, isLoading, error } = useQuery({
        queryKey: ['addProducts'],
        queryFn: async () => {
            // console.log(data);
            setIsFetchAddProducts(false)
            message.success('Add Products Success')
            dispatch(addProducts({id:collectionId, productList: reqData}))
            return await CollectionService.addProducts(collectionId, reqData )
        },
        enabled: isFetchAddProducts && (reqData.length > 0)
    });

    return (
        (data.length > 0) ? (
        <>
        <List>
            <List.Item>
                <div style={{flex: '2', textAlign: 'center'}}><strong>TÊN</strong></div>
                <div style={{flex: '2', textAlign: 'center'}}><strong>LOẠI</strong></div>
                <div style={{flex: '2', textAlign: 'center'}}><strong>ĐẶC ĐIỂM</strong></div>
                <div style={{flex: '2', textAlign: 'center'}}><strong>GIÁ</strong></div>
                <div style={{flex: '1', textAlign: 'center'}}>
                    <Button type="primary" 
                        onClick={handleInsert}
                    >
                    Insert
                    </Button>
                </div>
                
            </List.Item>
        </List>
        <Divider></Divider>
        <List
            dataSource={data}
            renderItem={(product) => (
                <List.Item>
                    <div style={{flex: '2', textAlign: 'center'}}>{product.productName}</div>
                    <div style={{flex: '2', textAlign: 'center'}}>{product.productType}</div>
                    <div style={{flex: '2', textAlign: 'center'}}>{renderProductDescription(product.description)}</div>
                    <div style={{flex: '2', textAlign: 'center'}}>{renderProductPrice(product.productPrice)}</div>
                    <div style={{flex: '1', textAlign: 'center'}}>
                        <Checkbox checked={product.checked} onChange={() => handleCheckboxChange(product.id)} />
                    </div>
                    
                </List.Item>
            )}
        />
        </>
        ) : null
    )
}

export default ProductList