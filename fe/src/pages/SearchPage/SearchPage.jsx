import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from "axios"; 
import { WrapperProducts, WrapperButtonMore, Container, WrapperDiv } from './style';
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent';
import SelectPriceComponent from '../../components/SelectPriceComponent/SelectPriceComponent';
import SelectSizeComponent from '../../components/SelectSizeComponent/SelectSizeComponent';
import SelectColorComponent from '../../components/SelectColorComponent/SelectColorComponent';
import SelectMaterialComponent from '../../components/SelectMaterialComponent/SelectMaterialComponent';
import { Pagination } from 'antd';

const SearchPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name') || null;
    const minPrice = searchParams.get('minPrice') || '0';
    const maxPrice = searchParams.get('maxPrice') || '1000000000';
    const size = searchParams.get('size') || null;
    const color = searchParams.get('color') || null;
    const material = searchParams.get('material') || null;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProductsSearchAPI = async (name, minPrice, maxPrice,size, color, material) => {
        const response = await axios.get(`http://localhost:8083/api/v1/product/search`, {
            params: {
                productName: name,
                minPrice: minPrice,
                maxPrice: maxPrice,
                size: size,
                color: color,
                material: material
            }
        });
        return response.data;
    };

    const { isLoading, data: products, error } = useQuery({
        queryKey: ['products', name, minPrice, maxPrice, size, color, material],
        queryFn: () => fetchProductsSearchAPI(name, minPrice, maxPrice, size, color, material),
        retry: 3,
        retryDelay: 1000
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    const renderSearchResultCount = () => {
        return products?.length > 0 ? (
            <div style={{ paddingTop: '20px', fontSize: '16px', marginLeft: '20px' }}>
                {(name !== null) && (<>Kết quả tìm kiếm cho <strong>"{name}"</strong>:</>)}
            </div>
        ) : (
            <div style={{ margin: '20px 0', fontSize: '20px', marginLeft: '24px' }}>Không tìm thấy sản phẩm.</div>
        );
    };
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    const productsOnCurrentPage = products.slice(startIndex, endIndex);

    return (
        <WrapperDiv>
            {renderSearchResultCount()}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px auto', paddingTop: '20px', maxWidth: '1240px' }}>
                {products?.length > 0 && (
                <>
                <div style={{ display: 'flex', gap: '10px' }}> 
                    <SelectPriceComponent/>
                    <SelectSizeComponent/>
                    <SelectColorComponent/>
                    <SelectMaterialComponent/>
                </div>
                </>
                )}
            </div>
            <WrapperProducts>
                {productsOnCurrentPage?.map(product => (
                    <CardProductComponent key={product.id} {...product} />
                ))}
            </WrapperProducts>
            <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={products.length}
                pageSize={12}
                style={{ textAlign: 'center', marginTop: '20px' }}
            />
        </WrapperDiv>
    );
};

export default SearchPage;