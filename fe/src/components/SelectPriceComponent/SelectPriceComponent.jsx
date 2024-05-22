import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, InputNumber, Slider, Dropdown, Row, Col, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchPriceRange } from '../../redux/slices/productSlice';
import { ButtonCustom, InputPrice, SliderPrice } from './style';

const pricePresets = [
    { label: 'Dưới 100.000', value: [0, 100000] },
    { label: '100.000 - 250.000', value: [100000, 250000] },
    { label: '250.000 - 500.000', value: [250000, 500000] },
    { label: 'Trên 500.000', value: [500000, 10000000] },
];

const SelectPriceComponent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [priceRange, setPriceRange] = useState([0, 10000000]);  
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const applyFilters = () => {
        const params = new URLSearchParams(location.search);
        params.set('minPrice', priceRange[0]);
        params.set('maxPrice', priceRange[1]);
        navigate(`?${params.toString()}`, { replace: true });
        dispatch(setSearchPriceRange(priceRange));
        setDropdownVisible(false);
    };

    const handlePresetSelect = (value) => {
        setPriceRange(value);
    };

    const resetFilters = () => {
        setPriceRange([0, 1000000000]);
        navigate('?', { replace: true });
        dispatch(setSearchPriceRange([0, 1000000000]));
    };

    const menu = (
        <div style={{ padding: '10px', width: 'fit-content', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 10px rgba(0, 0, 0, .5)'}}>
            <Row wrap={false} gutter={[8, 8]}>
                {pricePresets.map(preset => (
                    <Col key={preset.label}>
                        <ButtonCustom onClick={() => handlePresetSelect(preset.value)}>
                            {preset.label}
                        </ButtonCustom>
                    </Col>
                ))}
            </Row>
            <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Col span={11}>
                    <InputPrice
                        min={0}
                        step={50000}
                        value={priceRange[0]}
                        onChange={value => setPriceRange([value, priceRange[1]])}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col span={11}>
                    <InputPrice
                        min={0}
                        step={50000}
                        value={priceRange[1]}
                        onChange={value => setPriceRange([priceRange[0], value])}
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>
            <SliderPrice
                range
                step={50000}
                min={0}
                max={10000000}
                onChange={setPriceRange}
                value={priceRange}
                style={{ marginTop: '10px' }}
            />
            <Row justify="space-between" style={{ marginTop: '10px' }}>
                <ButtonCustom onClick={resetFilters}>Bỏ chọn</ButtonCustom>
                <Button type="primary" onClick={applyFilters}>Xem kết quả</Button>
            </Row>
        </div>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']} visible={dropdownVisible} onVisibleChange={setDropdownVisible}>
            <ButtonCustom>Giá <DownOutlined /></ButtonCustom>
        </Dropdown>
    );
};

export default SelectPriceComponent;
