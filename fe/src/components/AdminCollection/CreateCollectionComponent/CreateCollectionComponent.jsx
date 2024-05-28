import React, { useState, useEffect } from 'react'
import { message, Modal, Form, Input, Button } from 'antd'
import { CreateCollection } from './style'
import * as ProductService from '../../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import * as CollectionService from '../../../services/CollectionService'
import { useDispatch } from 'react-redux';
import { addCollection } from '../../../redux/slices/collectionSlice';

const CreateCollectionComponent = () => {

    const dispatch = useDispatch()
    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [productList, setProductList] = useState()
    const [collectionName, setCollectionName] = useState('')
    const [isFetchFindProductsByName, setIsFetchFindProductsByName] = useState(false)
    const [isFetchCreateCollection, setIsFetchCreateCollection] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = (e) => {
        if (collectionName.trim() !== '') {
            setIsFetchFindProductsByName(true)
        }
        setIsModalOpen(false)
        // setCollectionName('')
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        setCollectionName('')
    }

    const { data: foundPros, isLoading, error } = useQuery({
        queryKey: ['findProductsByName'],
        queryFn: async () => {
            setIsFetchFindProductsByName(false)
            return await ProductService.getProductsByName(collectionName)
        },
        enabled: isFetchFindProductsByName,
    })

    useEffect(() => {
        if (foundPros) {
            setProductList(foundPros.data)
            setIsFetchCreateCollection(true)
            // console.log(foundPros.data)
        }
    }, [foundPros])

    const { data: createResponse} = useQuery({
        queryKey: ['createCollection'],
        queryFn: async ()=> {
            setIsFetchCreateCollection(false)
            return await CollectionService.createCollection(collectionName, productList)
        },
        enabled: isFetchCreateCollection && !!productList
    })

    useEffect(() => {
        if (createResponse) {
            console.log(createResponse)
            if (createResponse.status === 'OK') {
                dispatch(addCollection(createResponse.data))
                setProductList()
            } else {
                setProductList()
                // message.error("Tên collection đã tồn tại")
            }
        }
    }, [createResponse])

    return (
        <>
        <div>
            <Button
                size='large'
                onClick={showModal}
            > + </Button>
            <CreateCollection>Create Collection</CreateCollection>
        </div>
        <Modal title="Create Collection" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form>
                <Form.Item
                    label="Colection Name"
                    name="collection-id"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <Input 
                        placeholder="Type the collection name"
                        value={collectionName}
                        onChange={(e) => {setCollectionName(e.target.value)}}
                    />
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default CreateCollectionComponent