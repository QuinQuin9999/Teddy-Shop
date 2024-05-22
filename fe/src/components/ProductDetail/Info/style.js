
import { Button } from 'antd';
import styled from 'styled-components';

export const ProductDetailImg = styled.img`
    width: 100%;
    height: auto;
`

export const ProductSale = styled.span`
    font-weight: bold;
    color: #BF8B70;
    font-size: 20px;

    @media (min-width: 375) {
        font-size: 16px;
    }
    @media (min-width: 460px) {
        font-size: 16px;
    }
    @media (min-width: 768px) {
        font-size: 18px;
    }
    @media (min-width: 1024px) {
        font-size: 20px;
    }
`

export const ProductDiscount = styled.span`
    color: #BF8B70;
    border: 1px solid #BF8B70;
    border-radius: 3px;
    margin: auto 0;
    line-height: 20px;
    padding: 3px;
`

export const ProductDetailBtn = styled.button`
    color: white;
    background-color: #BF8B70;
    width: 265px;
    height: 40px;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    padding: 5px;
    margin-top: 1.2rem;
    font-weight: bold;
    &:hover{
        background-color: #994C00;
    }
`
export const ProductName = styled.h2`
    margin: 1rem 0;

    font-size: 24px;

    color: #BF8B70;

    @media (max-width: 375) {
        font-size: 16px;
    }
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 1024px) {
        font-size: 20px;
    }
`

export const WrapperEnsure = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Ensure = styled.div`
  flex: 1 1 30%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  @media (max-width: 1024px) {
    flex: 1 1 100%;
  }
`

export const StyledButton = styled(Button)`
    margin-right: 8px;
    border-color: ${props => props.selected ? "#BF8B70" : ""};
    color: ${props => props.selected ? "#BF8B70" : "#000"};
    position: relative;
    &:hover {
        color:  #BF8B70 !important;
        border-color: #BF8B70 !important;
    }
`;