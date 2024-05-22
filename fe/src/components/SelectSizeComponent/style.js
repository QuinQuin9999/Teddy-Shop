import { Button } from "antd";
import styled from "styled-components";

export const ButtonCustom = styled(Button)`
    &:hover {
        border-color: #BF8B70 !important;
        color: #BF8B70 !important;
    }
`
export const SizeMenu = styled.div`
  padding: 10px;
  width: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

export const SizeButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Khoảng cách giữa các button */
`;

export const SizeButton = styled(Button)`
    &:hover {
        border-color: #BF8B70 !important;
        color: #BF8B70 !important;
    }   
    width: 75px;
`