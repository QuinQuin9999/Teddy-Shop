import { Col } from 'antd';
import styled from 'styled-components';

export const ProductDetailPart = styled(Col)`
    background-color: white;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    margin: 20px 0;

`

export const ProductDetailContainer = styled.div`
    margin: 0 5%;
`

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-between;

    @media (max-width: 838px) {
        flex-direction: column; 
    }
`

export const WrapperProducts = styled.div`
  display: grid;
  gap: 8px;
  padding: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1280px)
  {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 1024px)
  {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px)
  {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px)
  {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const ReviewContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  margin-right: 10px; 
`;

export const RelatedProductsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  flex: 1;
`;