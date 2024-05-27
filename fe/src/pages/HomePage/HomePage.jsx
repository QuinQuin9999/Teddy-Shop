import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import ProductListByCategory from './ProductLisrByCategory/ProductListByCategory';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewMore = (category) => {
    navigate(`/category/${category}`);
  };

  const fetchProductsAPI = async () => {
    const res = await axios.get('http://localhost:8083/api/v1/product/getAll');
    return res.data;
  };

  const { isLoading, data: products, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsAPI,
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  const groupedProducts = products.reduce((acc, product) => {
    (acc[product.productType] = acc[product.productType] || []).push(product);
    return acc;
  }, {});

  return (
    <div>
      <ImageSlider />
      <div style={{ maxWidth: '1200px', textAlign: 'center', margin: 'auto'  }}>
        {Object.keys(groupedProducts).map((category) => (
          <ProductListByCategory
            key={category}
            category={category}
            products={groupedProducts[category]}
            onViewMore={handleViewMore}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;