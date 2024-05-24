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

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Input, Badge, Popover } from "antd";
import { WrapperHeader, Logo, Nav, DropdownMenu, DropdownItem, WrapperContentPopup } from "./style"; // Thêm các styled-components
import { DownOutlined, ShoppingCartOutlined, ShoppingTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetUser } from "../../redux/slices/userSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import * as UserService from "../../services/UserService";
import { FaUserCircle } from "react-icons/fa";


const HeaderComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState("");
  const [search, setSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      setUserName(user?.name);
      setAvatar(user?.avatar);
      setLoading(false);
    }
  }, [user?.name, user?.avatar]);

  // Navigate to cart page
  const goToCart = () => {
    navigate("/cart", { state: location.pathname });
  };

  const handleNavigateLogin = () => {
    console.log(location);
    navigate("/signin", { state: location.pathname });
  };

  const handleClickNavigate = (type) => {
    if (type === "UserPage") {
      navigate("/UserPage");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    // await UserService.logoutUser()
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(resetUser());
    dispatch(resetCart());
    setLoading(false);
    navigate("/");
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("UserPage")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

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
        {/* <ShoppingCartOutlined style={{fontSize: '36px', color: '#994C00'}}/> */}
        {/* <ShoppingTwoTone  twoToneColor= "#994C00" style={{fontSize: '36px'}}/> */}
        <Badge count={cart?.orderItems?.length} size="small">
          <ShoppingCartOutlined
            style={{ fontSize: "36px", color: "#fff" }}
            onClick={goToCart}
          />
        </Badge>
        {user?.access_token ? (
          <>
            {console.log("is admin? : ", user?.isAdmin)}
            <Popover content={content} trigger="click" open={isOpenPopup}>
              <div
                style={{
                  cursor: "pointer",
                  maxWidth: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                }}
                onClick={() => setIsOpenPopup((prev) => !prev)}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    objectFit: "cover",
                    marginRight: "16px",
                    borderRadius: "50%",
                  }}
                >
                  {user?.avatar ? (
                    <img src={user?.avatar} alt="" />
                  ) : (
                    <FaUserCircle
                      style={{
                        width: "inherit",
                        height: "inherit",
                        color: "#fff",
                      }}
                    />
                  )}
                </div>
                <span style={{ color: "#fff" }}>
                  {userName?.length ? userName : user?.email}
                </span>
              </div>
            </Popover>
          </>
        ) : (
          <div
            style={{
              cursor: "pointer",
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "8px 16px",
              backgroundColor: "#fff",
              maxHeight: 36,
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleNavigateLogin}
          >
            <span style={{ color: "#000" }}>Đăng nhập</span>
          </div>
        )}
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
