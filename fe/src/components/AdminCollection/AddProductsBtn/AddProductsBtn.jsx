import React, { useState, useEffect } from 'react'
import { Button, Tooltip, Modal, Input } from 'antd'
import * as ProductDetailService from '../../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import ProductList from '../ProductList_Add/ProductList'

const AddProductsBtn = ({collectionId}) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [productList, setProductList] = useState()
  const [isFetchFindProductsByKey, setIsFetchFindProductsByKey] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
    setProductList()
  }
  const handleOk = (e) => {
    setIsModalOpen(false)
    setInputValue('')
    setProductList()
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setInputValue('')
    setProductList()
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleInputSearch = (e) => {
    // setProductList()
    if (inputValue.trim() !== '') {
      setIsFetchFindProductsByKey(true)
  }}

  const { data: foundProducts, isLoading, error } = useQuery({
    queryKey: ['findProductsByKey'],
    queryFn: () => {
        setIsFetchFindProductsByKey(false)
        return ProductDetailService.getProductsByName(inputValue)
    },
    enabled: isFetchFindProductsByKey,
});

useEffect(() => {
  if (foundProducts) {
    if (foundProducts.status === 'OK') {
      setProductList(foundProducts.data)
    }
  }
}, [foundProducts])

  return (
    <>
    <Tooltip placement="top" title="Thêm sản phẩm" color='blue'>
      <Button style={{margin: '0 2%'}} 
      size='large'
      onClick={showModal}
      > + </Button>
    </Tooltip>
    <Modal title="Insert Products" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
      <Input.Search
        value={inputValue}
        placeholder="Type keyword"
        enterButton
        onChange={handleInputChange}
        onSearch={handleInputSearch}
        style={{ width: 200 }}
      />
      {
        (!!productList) && <ProductList
                            collectionId={collectionId}
                            productList={productList}
                          />
      }
      
    </Modal>
    </>
  )
}

export default AddProductsBtn