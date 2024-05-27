// ProductListByCategoryPage.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent';
import { Button, Pagination } from 'antd';
import { WrapperProducts } from '../SearchPage/style';

const ProductListByCategoryPage = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);


  const fetchProductsByCategoryAPI = async () => {
    const res = await axios.get(`http://localhost:8083/api/v1/product/searchByType?productType=${category}`);
    return res.data;
  };

  const { isLoading, data: products, error } = useQuery({
    queryKey: ['products', category],
    queryFn: fetchProductsByCategoryAPI,
    retry: 3,
    retryDelay: 1000,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const productsOnCurrentPage = products.slice(startIndex, endIndex);

  return (
    <div style={{width: 'fit-content',  margin: '0 120px', height: 'fit-content'}}>
      <h2 style={{textAlign: 'center' , marginTop: '16px'}}>{category}</h2>
        <WrapperProducts>
        {productsOnCurrentPage.map(product => (
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
      <Link to="/">
        <Button style={{marginLeft: '16px'}} type="primary">Quay lại Trang Chủ</Button>
      </Link>
    </div>
  );
};

export default ProductListByCategoryPage;
