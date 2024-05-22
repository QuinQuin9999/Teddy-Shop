import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Row, Col, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchSize } from '../../redux/slices/productSlice';
import { ButtonCustom, SizeButtonContainer, SizeMenu, SizeButton} from './style';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const SelectSizeComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchSize = useSelector((state) => state.product.searchSize);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchAllSizes = async () => {
    const response = await axios.get(`http://localhost:8083/api/v1/product/getAllSizes`);
    return response.data;
  };

  const { data: sizes, isLoading, isError, error } = useQuery({
    queryKey: ['sizes'],
    queryFn: fetchAllSizes,
    staleTime: 100,
});

const sortedSizes = sizes?.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log('Sizes:', sizes); // Check if data is fetched correctly
console.log('Loading:', isLoading); // Check loading state
console.log('Error:', error); // Check error state

  const handleSelectSize = (size) => {
    const newSize = size.toLowerCase() === searchSize.toLowerCase() ? '' : size;
    dispatch(setSearchSize(newSize));

    const searchParams = new URLSearchParams(location.search);
    if (newSize) {
      searchParams.set('size', newSize);
    } else {
      searchParams.delete('size');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    setDropdownVisible(false);
  };

    const menu = (
    <SizeMenu>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <SizeButtonContainer>
          {sortedSizes?.map((size, index) => (
            <SizeButton key={index} onClick={() => handleSelectSize(size)}>
              {size}
            </SizeButton>
          ))}
        </SizeButtonContainer>
      )}
    </SizeMenu>
  );
    return (
        <Dropdown overlay={menu} trigger={['click']} visible={dropdownVisible} onVisibleChange={setDropdownVisible}>
          <ButtonCustom>
            {searchSize || 'Kích thước'} <DownOutlined />
          </ButtonCustom>
        </Dropdown>
      );
};

export default SelectSizeComponent;
