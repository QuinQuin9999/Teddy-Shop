import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Row, Col, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchColor } from '../../redux/slices/productSlice';
import { ButtonCustom, ColorButtonContainer, ColorMenu, ColorButton} from './style';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const SelectColorComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchColor = useSelector((state) => state.product.searchColor);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchAllColors = async () => {
    const response = await axios.get(`http://localhost:8083/api/v1/product/getAllColors`);
    return response.data;
  };

  const { data: colors, isLoading, isError, error } = useQuery({
    queryKey: ['colors'],
    queryFn: fetchAllColors,
    staleTime: 100,
});

const sortedColors = colors?.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const handleSelectColor = (color) => {
    const newColor = color.toLowerCase() === searchColor.toLowerCase() ? '' : color;
    dispatch(setSearchColor(newColor));

    const searchParams = new URLSearchParams(location.search);
    if (newColor) {
      searchParams.set('color', newColor);
    } else {
      searchParams.delete('color');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    setDropdownVisible(false);
  };

    const menu = (
    <ColorMenu>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <ColorButtonContainer>
          {sortedColors?.map((color, index) => (
            <ColorButton key={index} onClick={() => handleSelectColor(color)}>
              {color}
            </ColorButton>
          ))}
        </ColorButtonContainer>
      )}
    </ColorMenu>
  );
    return (
        <Dropdown overlay={menu} trigger={['click']} visible={dropdownVisible} onVisibleChange={setDropdownVisible}>
          <ButtonCustom>
            {searchColor || 'Màu'} <DownOutlined />
          </ButtonCustom>
        </Dropdown>
      ); 
};

export default SelectColorComponent;
