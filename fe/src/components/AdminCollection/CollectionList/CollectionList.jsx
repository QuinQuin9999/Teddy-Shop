import React, { useState, useEffect } from 'react'
import { Collapse, Flex, Button, message, Popconfirm, Divider } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import * as CollectionService from '../../../services/CollectionService'
import { useQuery } from '@tanstack/react-query'
import ProductList from '../ProductList_Remove/ProductList'
import { useSelector } from 'react-redux';
import { getAllCollections, removeCollection } from '../../../redux/slices/collectionSlice';
import { useDispatch } from 'react-redux';
// import RenameCollectionBtn from '../RenameCollectionBtn/RenameCollectionBtn'
import ExportExcelComponent from '../ExportExcelComponent/ExportExcelComponent'

const CollectionList = () => {

    const dispatch = useDispatch();
    const collectionsFromRedux = useSelector(state => state.collection.collections)

    const [items, setItems] = useState()
    const [isFetchDeleteCollection, setIsFetchDeleteCollection] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const [collections, setCollections] = useState([])  
    
    useEffect (() => {
        setCollections(collectionsFromRedux)
    }, [collectionsFromRedux])

    const { data: allCollections, isLoading, error } = useQuery({
        queryKey: ['getAllCollections'],
        queryFn: async () => await CollectionService.getAllCollections(),
    });

    const { data: deleteResponse } = useQuery({
        queryKey: ['deleteCollection'],
        queryFn: async () => {
            setIsFetchDeleteCollection(false)
            return await CollectionService.deleteCollection(deleteId)
        },
        enabled: isFetchDeleteCollection && !!deleteId
    })

    useEffect(() => {
        if(allCollections) {
            if (allCollections.status === 'OK') {
                console.log(allCollections.data)
                setCollections(allCollections.data)
                dispatch(getAllCollections(allCollections.data))
            }
        }
    }, [allCollections])   

    useEffect(() => {
        if(deleteResponse) {
            if (deleteResponse.status === 'OK') {
                dispatch(removeCollection(collections))
            }
        }
    }, [deleteResponse])

    useEffect(() => {
        if(collections) {
            setItems(collections.map((collection, index) => (
                {
                    key: index.toString(),
                    label: 
                        <>
                        <Flex justify = 'space-between'>
                            <strong>{collection?.id}</strong>
                            <Flex>
                                {/* <RenameCollectionBtn collectionId={collection?.id} /> */}
                                <Popconfirm
                                    placement="topRight"
                                    title="Delete the Collection"
                                    description={`Are you sure to delete the Collection "${collection?.id}"?`}
                                    onConfirm={() => {
                                        setDeleteId(collection?.id)
                                        setCollections(collections.filter(item => item?.id !== collection?.id))
                                        setIsFetchDeleteCollection(true)
                                        message.success('Delete Collection Success')
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger type="text" icon={<DeleteOutlined style={{color: '#FF4D4F'}} />}>
                                    </Button>
                                </Popconfirm>
                            </Flex>
                        </Flex>
                        </>,
                    children: <ProductList 
                                collectionId={collection?.id}
                                // collectionName={collection?.id}
                                productList={collection?.productList}
                                />
                }
            )))
        }
    }, [collections])

    return (
        <>
        {(collections.length > 0) && <Collapse items={items} />}  
        <Divider></Divider> 
        <ExportExcelComponent collections={collections.map(collection => ({
            ...collection,
            productList: JSON.stringify(collection?.productList)
        }))} />
        </>
    )
}

export default CollectionList