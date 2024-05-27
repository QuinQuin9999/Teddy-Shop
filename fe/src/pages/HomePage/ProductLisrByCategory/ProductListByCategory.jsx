import React from 'react';
import { Row, Col, Button } from 'antd';
import CardProductComponent from '../../../components/CardProductComponent/CardProductComponent';
import { ButtonTag, WrapperProducts } from '../style';

const ProductListByCategory = ({ category, products, onViewMore }) => (
  <div style={{ textAlign: 'center', padding: '10px' }}>
    <ButtonTag>{category}</ButtonTag>
    <WrapperProducts>
      {products.slice(0, 5).map((product) => (
          <CardProductComponent {...product} />
      ))}
    </WrapperProducts>
    <Button type="primary" onClick={() => onViewMore(category)}>
      Xem thêm
    </Button>
  </div>
);

export default ProductListByCategory;