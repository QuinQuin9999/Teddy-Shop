import React, { useEffect, useState, useSelector } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import ProductListByCategory from './ProductLisrByCategory/ProductListByCategory';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../../components/ChatBox/Chatbox'
import { WechatOutlined } from '@ant-design/icons'
import { Button } from "antd";
import DealSection from '../../components/DealSection/DealSection';

const HomePage = () => {
  // const user = useSelector((state) => state.user.id);
  // const [userId, setUserId] = useState('')
  const navigate = useNavigate();
  const [isChatBoxOpen, setChatBoxOpen] = useState(false)

  // useEffect(() => {setUserId(user)}, [user])
  const handleChatIconClick = () => {
    setChatBoxOpen(!isChatBoxOpen)
  }

  const handleCloseChatBox = () => {
    setChatBoxOpen(false)
  }

  const handleViewMore = (category) => {
    navigate(`/category/${category}`);
  };

  const fetchProductsAPI = async () => {
    const res = await axios.get('http://localhost:8083/api/v1/product/getAll');
    return res.data;
  };

  const { isLoading, data: products, error } = useQuery({
    queryKey: ['productsHome'],
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
  
  const hotTrendData = groupedProducts['Labubu']
  const handleViewDeal = (category) => {
    navigate(`/category/Labubu`);
  };

  return (
    <div>
      <ImageSlider />
      <div style={{marginTop: '20px'}}><DealSection data={hotTrendData} onViewMore={handleViewDeal}/></div>
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
      <div>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<WechatOutlined />}
          style={{
            position: 'fixed',
            bottom: '65px',
            right: '11px',
            padding: '5px',
            transition: 'width 0.3s, height 0.3s, box-shadow 0.3s', 
            width: isChatBoxOpen ? '46px' : '50px',
            height: isChatBoxOpen ? '46px' : '50px',
            boxShadow: isChatBoxOpen ? '0px 4px 8px rgba(30,144,255,0.8)' : 'none',
          }}
          onClick={handleChatIconClick}
        />
        {isChatBoxOpen && (
        <ChatBox onClose={handleCloseChatBox} user={{id: 'SignInUser'}}/>
      )}
    </div>
    </div>
  );
};

export default HomePage;