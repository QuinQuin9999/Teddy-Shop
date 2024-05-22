import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Row, Col, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchMaterial } from '../../redux/slices/productSlice';
import { ButtonCustom, MaterialButtonContainer, MaterialMenu, MaterialButton} from './style';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const SelectMaterialComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchMaterial = useSelector((state) => state.product.searchMaterial);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchAllMaterials = async () => {
    const response = await axios.get(`http://localhost:8083/api/v1/product/getAllMaterials`);
    return response.data;
  };

  const { data: materials, isLoading, isError, error } = useQuery({
    queryKey: ['materials'],
    queryFn: fetchAllMaterials,
    staleTime: 100,
});

const sortedMaterials = materials?.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));


  const handleSelectMaterial = (material) => {
    const newMaterial = material.toLowerCase() === searchMaterial.toLowerCase() ? '' : material;
    dispatch(setSearchMaterial(newMaterial));

    const searchParams = new URLSearchParams(location.search);
    if (newMaterial) {
      searchParams.set('material', newMaterial);
    } else {
      searchParams.delete('material');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    setDropdownVisible(false);
  };

    const menu = (
    <MaterialMenu>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <MaterialButtonContainer>
          {sortedMaterials?.map((material, index) => (
            <MaterialButton key={index} onClick={() => handleSelectMaterial(material)}>
              {material}
            </MaterialButton>
          ))}
        </MaterialButtonContainer>
      )}
    </MaterialMenu>
  );
    return (
        <Dropdown overlay={menu} trigger={['click']} visible={dropdownVisible} onVisibleChange={setDropdownVisible}>
          <ButtonCustom>
            {searchMaterial || 'Chất liệu'} <DownOutlined />
          </ButtonCustom>
        </Dropdown>
      );
};

export default SelectMaterialComponent;
