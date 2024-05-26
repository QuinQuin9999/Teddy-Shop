// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Row, Col, InputNumber, Divider, Flex } from 'antd';
// import { ProductDetailBtn, ProductDetailImg, ProductDiscount, ProductName, ProductSale, Ensure, StyledButton, WrapperEnsure } from './style';
// import { ProductOutlined, TruckOutlined, PhoneOutlined, LikeOutlined, RetweetOutlined, SafetyOutlined } from '@ant-design/icons';

// const Info = ({productId}) => {
//     const [productData, setProductData] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState('');
//     const [selectedColor, setSelectedColor] = useState('');
//     const [selectedMaterial, setSelectedMaterial] = useState('');

//     useEffect(() => {
//         const fetchProductData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8083/api/v1/product/search/${productId}`);
//                 setProductData(response.data);
//             } catch (error) {
//                 console.error('Error fetching product data:', error);
//             }
//         };

//         fetchProductData();
//     }, []);

//     useEffect(() => {
//         if (productData) {
//             const defaultSize = Object.keys(productData.productPrice)[0];
//             setSelectedSize(defaultSize);

//             const defaultColor = productData.description.Color[0];
//             setSelectedColor(defaultColor);

//             const defaultMaterial = productData.description.Material[0];
//             setSelectedMaterial(defaultMaterial);
//         }
//     }, [productData]);

//     const handleBuyNow = () => {
//         // Xử lý 
//     }

//     if (!productData) {
//         return <div>Loading...</div>;
//     }

//     const sale = selectedSize && productData.productPrice[selectedSize] ? productData.productPrice[selectedSize] * (1 - (productData.discount / 100)) : null;

//     return (
//         <Row justify="space-between">
//             <Col xs={24} sm={24} md={12} lg={8} className="product-detail-img" style={{ borderRight: '1px solid #D9D9D9' }}>
//                 <ProductDetailImg src={productData.productImg} alt={productData.productName} />
//             </Col>
//             <Col xs={24} sm={24} md={12} lg={16} className="product-detail-general">
//                 <div style={{ margin: '12px 24px' }}>
//                     <ProductName>
//                         {productData.productName}
//                     </ProductName>
//                     <Flex gap="large" style={{ margin: '1% 0' }}>
//                         {sale && <ProductSale className="pro-sale">{sale.toLocaleString()} đ</ProductSale>}
//                         {selectedSize && productData.productPrice[selectedSize] && <del className="pro-price" style={{ margin: 'auto 0' }}>{productData.productPrice[selectedSize].toLocaleString()} đ</del>}
//                         {(productData.discount !== 0) && <ProductDiscount className="pro-discount">-{productData.discount}%</ProductDiscount>}
//                     </Flex>
//                     <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', marginTop: '24px' }}>
//                         <div style={{ width: '100px', fontSize: '16px' }}>Kích thước:</div>
//                         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                             {Object.keys(productData.productPrice).map(size => (
//                                 <StyledButton
//                                     key={size}
//                                     type="default"
//                                     selected={selectedSize === size}
//                                     onClick={() => setSelectedSize(size)}
//                                     style={{ marginRight: '10px' }}
//                                 >
//                                     {size}
//                                 </StyledButton>
//                             ))}
//                         </div>
//                     </div>
//                     <Divider />
//                     <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
//                         <div style={{ width: '100px', fontSize: '16px' }}>Màu sắc:</div>
//                         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                             {productData.description.Color.map(color => (
//                                 <StyledButton
//                                     key={color}
//                                     type="default"
//                                     selected={selectedColor === color}
//                                     onClick={() => setSelectedColor(color)}
//                                 >
//                                     {color}
//                                 </StyledButton>
//                             ))}
//                         </div>
//                     </div>
//                     {productData.description.Material && (
//                         <>
//                             <Divider />
//                             <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
//                                 <div style={{ width: '100px', fontSize: '16px' }}>Chất liệu:</div>
//                                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                                     {productData.description.Material.map(material => (
//                                         <StyledButton
//                                             key={material}
//                                             type="default"
//                                             selected={selectedMaterial === material}
//                                             onClick={() => setSelectedMaterial(material)}
//                                         >
//                                             {material}
//                                         </StyledButton>
//                                     ))}
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                     <Divider />
//                     <div>
//                         <p>Kho: {productData.countInStock}</p>
//                         <InputNumber
//                             addonBefore={<label>Số lượng:</label>}
//                             min={1}
//                             max={productData.countInStock}
//                             value={quantity}
//                             onChange={setQuantity}
//                         />
//                     </div>
//                     <ProductDetailBtn type="submit" className="buy-now-btn" onClick={() => handleBuyNow()}>
//                         THÊM GIỎ HÀNG
//                     </ProductDetailBtn>
//                     <Divider />
//                     <WrapperEnsure>
//                         <Ensure><span style={{ color: '#ccc', fontSize: '20px' }}> <ProductOutlined/></span>Cam kết 100% chính hãng</Ensure>
//                         <Ensure><span style={{ color: '#ccc' , fontSize: '20px'}}> <TruckOutlined /> </span>Miễn phí giao hàng tại TPHCM</Ensure>
//                         <Ensure><span style={{ color: '#ccc' , fontSize: '20px'}}> <PhoneOutlined /> </span>Hỗ trợ 24/7</Ensure>
//                         <Ensure><span style={{ color: '#1A93FF' , fontSize: '16px'}}> <SafetyOutlined /></span>An toàn với trẻ em</Ensure>
//                         <Ensure><span style={{ color: '#1A93FF' , fontSize: '16px'}}> <LikeOutlined /> </span>Mở hộp kiểm tra nhận hàng</Ensure>
//                         <Ensure><span style={{ color: '#1A93FF' , fontSize: '16px'}}> <RetweetOutlined /></span>Đổi trả trong 7 ngày</Ensure>
//                     </WrapperEnsure>
//                 </div>
//                 <div></div>
//             </Col>
//         </Row>
//     )
// }

// export default Info;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, InputNumber, Divider, Flex } from 'antd';
import {
  ProductDetailBtn, ProductDetailImg, ProductDiscount, ProductName, ProductSale, Ensure, StyledButton, WrapperEnsure
} from './style';
import {
  ProductOutlined, TruckOutlined, PhoneOutlined, LikeOutlined, RetweetOutlined, SafetyOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addCartProduct } from "../../../redux/slices/cartSlice"

const Info = ({ productId }) => {
  const dispatch = useDispatch()
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/api/v1/product/search/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  useEffect(() => {
    if (productData) {
      const defaultSize = Object.keys(productData.productPrice)[0];
      setSelectedSize(defaultSize);

      const defaultColor = productData.description.Color[0];
      setSelectedColor(defaultColor);

      const defaultMaterial = productData.description.Material[0];
      setSelectedMaterial(defaultMaterial);
    }
  }, [productData]);

  const handleBuyNow = () => {
    const {countInStock, productPrice, ...rest} = productData
    const addCartData = rest
    dispatch(addCartProduct({...addCartData, 
                              // productPrice: {[size]}
                              price: productData.productPrice[selectedSize], 
                              description: {
                                Color: selectedColor,
                                Material: selectedMaterial,
                                Size: selectedSize,
                              },
                              amount: quantity}));
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  const sale = selectedSize && productData.productPrice[selectedSize] 
    ? productData.productPrice[selectedSize] * (1 - (productData.discount / 100)) 
    : null;

  const availableStock = selectedSize && selectedColor && productData.countInStock[selectedColor][selectedSize]
    ? productData.countInStock[selectedColor][selectedSize]
    : 0;

  return (
    <Row justify="space-between">
      <Col xs={24} sm={24} md={12} lg={8} className="product-detail-img" style={{ borderRight: '1px solid #D9D9D9' }}>
        <ProductDetailImg src={productData.productImg} alt={productData.productName} />
      </Col>
      <Col xs={24} sm={24} md={12} lg={16} className="product-detail-general">
        <div style={{ margin: '12px 24px' }}>
          <ProductName>{productData.productName}</ProductName>
          <Flex gap="large" style={{ margin: '1% 0' }}>
            {sale && <ProductSale className="pro-sale">{sale.toLocaleString()} đ</ProductSale>}
            {selectedSize && productData.productPrice[selectedSize] && <del className="pro-price" style={{ margin: 'auto 0' }}>{productData.productPrice[selectedSize].toLocaleString()} đ</del>}
            {productData.discount !== 0 && <ProductDiscount className="pro-discount">-{productData.discount}%</ProductDiscount>}
          </Flex>
          <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', marginTop: '24px' }}>
            <div style={{ width: '100px', fontSize: '16px' }}>Kích thước:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {Object.keys(productData.productPrice).map(size => (
                <StyledButton
                  key={size}
                  type="default"
                  selected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  style={{ marginRight: '10px' }}
                >
                  {size}
                </StyledButton>
              ))}
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
            <div style={{ width: '100px', fontSize: '16px' }}>Màu sắc:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {productData.description.Color.map(color => (
                <StyledButton
                  key={color}
                  type="default"
                  selected={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </StyledButton>
              ))}
            </div>
          </div>
          {productData.description.Material && (
            <>
              <Divider />
              <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                <div style={{ width: '100px', fontSize: '16px' }}>Chất liệu:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {productData.description.Material.map(material => (
                    <StyledButton
                      key={material}
                      type="default"
                      selected={selectedMaterial === material}
                      onClick={() => setSelectedMaterial(material)}
                    >
                      {material}
                    </StyledButton>
                  ))}
                </div>
              </div>
            </>
          )}
          <Divider />
          <div>
            <p>Kho: {availableStock}</p>
            <InputNumber
              addonBefore={<label>Số lượng:</label>}
              min={1}
              max={availableStock}
              value={quantity}
              onChange={setQuantity}
            />
          </div>
          <ProductDetailBtn type="submit" className="buy-now-btn" onClick={() => handleBuyNow()}>
            THÊM GIỎ HÀNG
          </ProductDetailBtn>
          <Divider />
          <WrapperEnsure>
            <Ensure><span style={{ color: '#ccc', fontSize: '20px' }}> <ProductOutlined /></span>Cam kết 100% chính hãng</Ensure>
            <Ensure><span style={{ color: '#ccc', fontSize: '20px' }}> <TruckOutlined /> </span>Miễn phí giao hàng tại TPHCM</Ensure>
            <Ensure><span style={{ color: '#ccc', fontSize: '20px' }}> <PhoneOutlined /> </span>Hỗ trợ 24/7</Ensure>
            <Ensure><span style={{ color: '#1A93FF', fontSize: '16px' }}> <SafetyOutlined /></span>An toàn với trẻ em</Ensure>
            <Ensure><span style={{ color: '#1A93FF', fontSize: '16px' }}> <LikeOutlined /> </span>Mở hộp kiểm tra nhận hàng</Ensure>
            <Ensure><span style={{ color: '#1A93FF', fontSize: '16px' }}> <RetweetOutlined /></span>Đổi trả trong 7 ngày</Ensure>
          </WrapperEnsure>
        </div>
      </Col>
    </Row>
  );
};

export default Info;



