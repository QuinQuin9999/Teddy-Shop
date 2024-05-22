// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Row, Col, Input, Select } from "antd";
// import { WrapperHeader, Logo, Nav, PhoneNumber } from "./style";
// import { DownOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { useQuery } from "@tanstack/react-query";

// const HeaderComponent = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const onChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const onSearch = (value) => {
//     if (!value.trim()) return;
//     navigate(`/search?name=${encodeURIComponent(value)}`);
//   };

//   const fetchAllCategories = async () => {
//     const response = await axios.get(`http://localhost:8083/api/v1/category/getAllCategories`);
//     return response.data;
//   };

//   const { data: categories , isLoading, isError, error } = useQuery({
//     queryKey: ['categories '],
//     queryFn: fetchAllCategories ,
//     staleTime: 100,
// });


//   return (
//     <WrapperHeader>
//       <Row align="middle" justify="space-between" style={{ width: '100%' }}>
//         <Col span={6} style={{ textAlign: 'center' }}>
//           <Link to="/#">
//             <Logo src="/logo.jpg" alt="Logo"/>
//           </Link>
//         </Col>
//         <Col span={12}>
//           <Input.Search
//             placeholder="Nhập sản phẩm cần tìm"
//             value={search}
//             onChange={onChange}
//             onSearch={onSearch}
//             enterButton
//           />
//         </Col>
//         <Col span={6} style={{ textAlign: 'right' }}>
          
//         </Col>
//       </Row>
//       <Nav>
//         <Link to="/">TRANG CHỦ</Link>
//         <Link to="/gau-teddy">DANH MỤC<DownOutlined style={{fontSize: '10px', marginLeft: '4px'}}/></Link>
//         <Select
//             value={categories}
//             style={{ width: 175 }}>
//             {categories.map(option => (
//             <Select.Option key={option.id} value={option.value}>
//                 {option.text}
//             </Select.Option>
//         ))}
//         </Select>
//         <Link to="/search">TẤT CẢ SẢN PHẨM</Link>
//       </Nav>
//     </WrapperHeader>
//   );
// };

// export default HeaderComponent;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Input } from "antd";
import { WrapperHeader, Logo, Nav, DropdownMenu, DropdownItem } from "./style"; // Thêm các styled-components
import { DownOutlined, ShoppingCartOutlined, ShoppingTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (value) => {
    if (!value.trim()) return;
    navigate(`/search?name=${encodeURIComponent(value)}`);
  };

  const fetchAllCategories = async () => {
    const response = await axios.get(`http://localhost:8083/api/v1/category/getAll`);
    return response.data;
  };

  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
    staleTime: 100,
  });

  console.log(categories)

  const handleCategoryClick = (categoryHref) => {
    setIsHovered(false); 
    navigate(`/category/${categoryHref}`, { replace: true });
    window.location.reload(); 
  };

  return (
    <WrapperHeader>
      <Row align="middle" justify="space-between" style={{ width: '100%' }}>
        <Col span={6} style={{ textAlign: 'center' }}>
          <Link to="/#">
            <Logo src="/logo.jpg" alt="Logo" />
          </Link>
        </Col>
        <Col span={12}>
          <Input.Search
            placeholder="Nhập sản phẩm cần tìm"
            value={search}
            onChange={onChange}
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={6} style={{ textAlign: 'center' }}>
        <ShoppingCartOutlined style={{fontSize: '36px', color: '#994C00'}}/>
        {/* <ShoppingTwoTone  twoToneColor= "#994C00" style={{fontSize: '36px'}}/> */}
        </Col>
      </Row>
      <Nav>
        <Link to="/">TRANG CHỦ</Link>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ display: 'inline-block', position: 'relative' }}
        >
          <Link>DANH MỤC<DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} /></Link>
          {isHovered && categories && (
            <DropdownMenu>
              {categories.map((category) => (
                <DropdownItem key={category.id}>
                  <Link onClick={() => handleCategoryClick(category.href)}>{category.categoryName}</Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </div>
        <Link to="/search">TẤT CẢ SẢN PHẨM</Link>
      </Nav>
    </WrapperHeader>
  );
};

export default HeaderComponent;
