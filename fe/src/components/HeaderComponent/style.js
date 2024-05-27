import styled from "styled-components";

export const WrapperHeader = styled.div`
  background: #F0DACD;
  padding: 10px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.img`
  width: 200px;
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
      color: #CC7A33;
    }
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  padding: 10px 0px;
  z-index: 10;
  flex-direction: row;
`;

export const DropdownItem = styled.div`
  padding: 4px 8px;
  white-space: nowrap;
`;

export const SubCategoryMenu = styled.div`
  padding-left: 16px;
  font-size: 14px;
`;

export const WrapperContentPopup = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;