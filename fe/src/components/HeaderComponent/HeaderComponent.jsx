import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Input, Badge, Popover } from "antd";
import { WrapperHeader, Logo, Nav, DropdownMenu, DropdownItem, WrapperContentPopup, SubCategoryMenu, CategorySection } from "./style"; // Thêm các styled-components
import { DownOutlined, ShoppingCartOutlined, ShoppingTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetUser } from "../../redux/slices/userSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import * as CartService from "../../services/CartService";
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
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      setUserName(user?.username);
      setAvatar(user?.avatar);
      setLoading(false);
    }
  }, [user?.username, user?.avatar]);

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
          token: user?.accessToken,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const logout  = await UserService.logoutUser(user.id, cart.orderItems)
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

  const handleCategoryClick = (href) => {
    setIsHovered(false); 
    navigate(`/collection/${href}`, { replace: true });
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
        <Col span={4} style={{ textAlign: 'right' }}>
          {user?.accessToken ? (
            <Popover content={content} trigger="click" open={isOpenPopup}>
              <div
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  marginRight: '32px',
                  border: '2px solid #CC7A33',
                  borderRadius: '25px',
                  paddingRight: '25px'
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
                    <img src={user?.avatar} alt="" style={{ width: '100%', borderRadius: '50%' }} />
                  ) : (
                    <FaUserCircle
                      style={{
                        width: "inherit",
                        height: "inherit",
                        color: "#CC7A33",
                        marginBottom: '16px'
                      }}
                    />
                  )}
                </div>
                <span style={{ color: "#CC7A33", fontWeight: "bold"}}>
                  {userName?.length ? userName : user?.email}
                </span>
              </div>
            </Popover>
          ) : (
            <div
              style={{
                cursor: "pointer",
                padding: "8px 16px",
                backgroundColor: "#CC7A33",
                borderRadius: "8px",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: '16px',
              }}
              onClick={handleNavigateLogin}
            >
              <span style={{ color: "#fff" , fontWeight: '600'}}>Đăng nhập</span>
            </div>
          )}
        </Col>
        <Col span={2}>
        <Badge count={cart?.orderItems?.length} size="small" style={{marginTop: '4px', marginLeft: '16px'}}>
            <ShoppingCartOutlined
              style={{fontSize: "36px", color: "#994C00", cursor: 'pointer', marginLeft: '16px' }}
              onClick={goToCart}
            />
          </Badge>
        </Col>
      </Row>
      <Nav>
        <Link to="/">TRANG CHỦ</Link>
        <div
          onMouseEnter={() => setHoveredCategory(true)}
          onMouseLeave={() => setHoveredCategory(false)}
          style={{ display: "inline-block", position: "relative" }}
        >
          <Link to="#">
            DANH MỤC
            <DownOutlined style={{ fontSize: "10px", marginLeft: "4px" }} />
          </Link>
          {hoveredCategory && (
            <DropdownMenu>
              {categories && categories.map((category) => (
                <CategorySection key={category.id}>
                  <DropdownItem>
                    <Link to="#" onClick={() => handleCategoryClick(category.categoryName)}>
                      {category.categoryName.toUpperCase()}
                    </Link>
                  </DropdownItem>
                  {category.subCategories.map((subCategory) => (
                    <SubCategoryMenu key={subCategory.id}>
                      <DropdownItem>
                        <Link to="#" onClick={() => handleCategoryClick(subCategory.subCategoryName)}>
                          {subCategory.subCategoryName}
                        </Link>
                      </DropdownItem>
                    </SubCategoryMenu>
                  ))}
                </CategorySection>
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
