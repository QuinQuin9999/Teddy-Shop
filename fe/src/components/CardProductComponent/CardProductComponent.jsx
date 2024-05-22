import React from 'react';
import {Button } from 'antd';
import { WrapperCard, DiscountTag, ButtonShow, ShoppingCart} from './style';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
import { useDispatch } from 'react-redux';
  
const CardProductComponent = ({ id, productName, productType, productImg, productPrice, discount, countInStock, description }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const price = productPrice ? Object.values(productPrice)[0] : null;
  const discountPrice = discount ? price - (discount / 100) * price : price;

  let formattedPrice = null;
  if (discountPrice) {
    formattedPrice = discountPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  let originalPrice = null;
  if (discount !== 0 && price) {
    originalPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  const discountPercentage = discount ? `-${discount}%` : null;
  const handleViewProduct = () => {
    navigate(`/ProductDetail/${id}`);
  }

  const handleAddToCart = () => {
    // let amount=1;
    // dispatch(addCartProduct({img,name,price,discount,type,id,amount}));
  }

  return (
    <WrapperCard hoverable style={{ borderRadius: '4px', overflow: 'hidden' }} onClick={handleViewProduct}>
      <img
        alt={productName}
        src={productImg}
        style={{ width: '100%', objectFit: 'cover', height: '200px' }}
      />
      <div>
        <h3 style={{ margin:'4px 8px 0', fontWeight: '800', fontSize: '14px', color: '#BF8B70', height: '46px', textAlign: 'center'}}>{productName}</h3>
          <div style={{height: '48px'}}>
          {originalPrice && (
            <p style={{ textAlign: 'center', textDecoration: 'line-through', color: '#a9a9a9', fontSize: '14px', fontWeight: '600', marginTop: '0px', marginBottom:'0px',}}>
              {convertPrice(originalPrice) }
            </p>
          )}
          <p style={{ textAlign: 'center', fontWeight: '800', color: 'red', marginTop: '0px', marginBottom:'0px', marginRight: '10px', fontSize: '16px', fontWeight: '800', color: '#BF8B70' }}>
            {convertPrice(formattedPrice)}
          </p>
          </div>
          {discountPercentage && <DiscountTag>{discountPercentage}</DiscountTag>}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ButtonShow 
          onClick={() => handleAddToCart()}>
            Thêm vào giỏ
            <ShoppingCart/>
          </ButtonShow>
            
        </div>
      </div>
    </WrapperCard>
  );
};

export default CardProductComponent;