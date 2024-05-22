import React, { useState, useEffect } from 'react'
import { List, Divider, Button, message, Checkbox } from 'antd'
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

    const handleCheckboxChange = (id) => {
        setData(data.map(product =>
          product._id === id ? { ...product, checked: !product.checked } : product
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
        queryFn: () => {
            // console.log(data);
            setIsFetchAddProducts(false)
            message.success('Add Products Success')
            dispatch(addProducts({id:collectionId, productList: reqData}))
            return CollectionService.addProducts(collectionId, reqData )
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
                <div style={{flex: '2', textAlign: 'center'}}><strong>HÃNG</strong></div>
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
                    <div style={{flex: '2', textAlign: 'center'}}>{product.name}</div>
                    <div style={{flex: '2', textAlign: 'center'}}>{product.type}</div>
                    <div style={{flex: '2', textAlign: 'center'}}>{product.description.Producer}</div>
                    <div style={{flex: '2', textAlign: 'center'}}>{product.price.toLocaleString()} đ</div>
                    <div style={{flex: '1', textAlign: 'center'}}>
                        <Checkbox checked={product.checked} onChange={() => handleCheckboxChange(product._id)} />
                    </div>
                    
                </List.Item>
            )}
        />
        </>
        ) : null
    )
}

export default ProductList