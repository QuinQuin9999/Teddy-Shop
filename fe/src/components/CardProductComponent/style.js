import { Card } from "antd";
import { Button } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
    ShoppingCartOutlined,
  } from "@ant-design/icons";

export const WrapperCard = styled(Card)`
    && {
        width: 200px;
        height: 350px
    }
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.p`
    color: red;
    font-weight: bold;
    font-size: 12px;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 14px;
    font-weight: 500;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`

export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; 
`;

export const DiscountTag = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: red;
  color: white;
  padding: 4px 6px;
  font-size: 12px;
  border-radius: 3px;
`;

export const ShoppingCart = styled(ShoppingCartOutlined)`
    font-size: 24px;
    color: #BF8B70;
`
export const ButtonShow = styled(Button)`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  color: #BF8B70 !important; 
  border-color: #fff !important;

  &:hover {
    color: red !important; 
    border-color: red !important;
    font-weight: 600;
  }
  &:hover ${ShoppingCart} {
    color: red;
  }
`;