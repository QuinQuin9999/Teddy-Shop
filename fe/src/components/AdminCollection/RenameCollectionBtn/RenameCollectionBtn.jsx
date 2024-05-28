import React, { useState, useEffect } from 'react'
import { List, Divider, Button, message, Popconfirm, Checkbox, Tooltip, Modal, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import * as CollectionService from '../../../services/CollectionService'
import * as ProductService from '../../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import ProductList from '../ProductList_Add/ProductList'
// import { renameCollection } from '../../../redux/slices/collectionSlice';
import { useDispatch } from 'react-redux';

const RenameCollectionBtn = ({ collectionId }) => {

    const dispatch = useDispatch();

    const [nameInput, setNameInput] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFetchRenameCollection, setIsFetchRenameCollection] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = (e) => {
        setIsModalOpen(false)
        // console.log(nameInput)
        // setNameInput('')
        if(nameInput.trim() !== '') {
            setIsFetchRenameCollection(true)
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        setNameInput('')
    }
    const handleInputChange = (e) => {
        setNameInput(e.target.value)
    }

    const { data: renameResponse, isLoading, error } = useQuery({
        queryKey: ['renameCollection'],
        queryFn: async () => {
            setIsFetchRenameCollection(false)
            dispatch(renameCollection({id: collectionId, newName: nameInput}))
            return await CollectionService.renameCollection(collectionId, nameInput)
        },
        enabled: isFetchRenameCollection
    });

    // useEffect(() => {
    //     if (renameResponse) {
    //         if (renameResponse.status === 'OK') {
    //             // message.success('Rename Collection Success')
    //             console.log(renameResponse.data)
    //         }
    //     }
    // }, [renameResponse])

    // useEffect(() => {
    //     setNameInput('')
    // }, [])

    return (
        <>
        <Tooltip placement="top" title="Đổi tên" color='blue'>
            <Button type="text" icon={<EditOutlined />}
            onClick={showModal}
            >

            </Button>
        </Tooltip>
        <Modal title="Rename Collection" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input 
                placeholder="Type new name"
                value={nameInput}
                onChange={handleInputChange}
            />
        </Modal>
        </>
    )
}

export default RenameCollectionBtn