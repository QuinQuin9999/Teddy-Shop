// style.js
import styled from 'styled-components';
import { Input, Button } from 'antd';

export const StyleContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const StyleRightCon = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;

  h4 {
    color: #CC7A33;
    text-align: center;
  }
`;

export const StyleInput = styled(Input)`
  border-radius: 5px;
  height: 40px;
`;

export const StyleInputPassword = styled(Input.Password)`
  border-radius: 5px;
  height: 40px;
`;

export const CustomButton = styled(Button)`
  width: 100%;
  border-radius: 5px;
  height: 40px;
  background-color: #CC7A33;
  border: none;

  &:hover {
    background-color: #bb6930;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0 0 0;
`;
