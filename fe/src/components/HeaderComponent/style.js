// import {Row } from 'antd';
// import styled from 'styled-components';

// export const WrapperHeader = styled(Row)`
//   padding: 10px 20px;
//   background-color: #F0DACD;
// `

import styled from "styled-components";

export const WrapperHeader = styled.div`
  width: 100%;
  background-color: #F0DACD;
  padding: 10px 20px;
  box-shadow: 0 2px 8px #f0f1f2;
`;

export const Logo = styled.img`
  height: 50px;
`;

export const LogoName = styled.h2`
  color: #BF8B70;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    margin: 0 15px;
    text-decoration: none;
    color: #994C00;
    font-weight: bold;

    &:hover {
      color: #7a3e01;
    }
  }
`;

export const PhoneNumber = styled.a`
  color: #6b2f90;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    color: #d4006b;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  padding: 0px 0px;
  width: fit-content;
  min-width: 210px;
`;

export const DropdownItem = styled.div`
  padding: 12px 8px;
  background-color: #F7F2EC;
  border-radius: 4px;
  &:hover {
    color: #7a3e01;
    background-color: #F0DACD;
  }
  a {
    text-decoration: none;
    color: #994C00;
    display: block;
  }
`;
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
