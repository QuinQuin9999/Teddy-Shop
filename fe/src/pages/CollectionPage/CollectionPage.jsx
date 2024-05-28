import React, { useState, useEffect } from "react"
import { WrapperProducts, WrapperDiv } from './style';
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import * as CollectionService from '../../services/CollectionService'
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent';
import { Pagination } from "antd";

const CollectionPage = () => {

    const navigate = useNavigate();
    const params = useParams();
    const collectionName = params.id;
    const [currentPage, setCurrentPage] = useState(1);

    const [isFetchGetCollection, setIsFetchGetCollection] = useState(false)

    const { data: collection } = useQuery({
        queryKey: ['getCollectionByName'],
        queryFn: async () => {
            setIsFetchGetCollection(false)

            console.log('collectionName', collectionName)
            return await CollectionService.getById(collectionName)
        }
        // enabled: isFetchDeleteCollection && !!deleteId
    })

    useEffect(() => {
        console.log('collectionName', collectionName)
        setIsFetchGetCollection(true)
    }, [])

    useEffect(() => {
        if (collection) {
            if (collection?.status === 'OK') {
                console.log(collection?.data)
            }
        }
    }, [collection])
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    const productsOnCurrentPage = collection?.data?.productList?.slice(startIndex, endIndex);

    return (
        <WrapperDiv style={{margin: '0 120px'}}>
            <WrapperProducts>
                {productsOnCurrentPage?.map(product => (
                    <CardProductComponent key={product.id} {...product} />
                ))}
            </WrapperProducts>
            <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={collection?.data?.length}
                pageSize={12}
                style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}
            />
        </WrapperDiv>
    )
}

export default CollectionPage