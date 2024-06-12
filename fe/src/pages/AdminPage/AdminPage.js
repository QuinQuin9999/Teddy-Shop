import { Carousel, Menu, message } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { FormOutlined, ProductOutlined, FileImageOutlined, DeliveredProcedureOutlined, UserOutlined, MenuOutlined, GroupOutlined, WechatOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import AdminReview from "../../components/AdminReview/AdminReview";
// import AdminProduct from "../../components/AdminProduct/AdminProduct";
// import AdminCarousel from "../../components/AdminCarousel/AdminCarousel";
import CustomizedContent from "./components/CustomizedContent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminCollectionPage from "../../components/AdminCollection/AdminCollectionComponent/AdminCollectionComponent";
// import CategoryManager from "../../components/CategoryManager/CategoryManager";
import AdminChatBox from "../../components/AdminChatbox/AdminChatBox";
import OrderHistory from "../../components/AdminOrder/OrderHistory"; 
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminReview from "../../components/AdminReview/AdminReview";
import AdminCategory from "../../components/AdminCategory/AdminCategory";
import AdminCarousel from "../../components/AdminCarousel/AdminCarousel";

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");

  const items = [
    getItem("Quản lý đơn hàng", "orders", <ShoppingCartOutlined />), 
    getItem("Sản phẩm", "products", <ProductOutlined />),
    getItem("User", "users",<UserOutlined />),
    getItem("Đánh giá", "reviews", <FormOutlined />),
    getItem("Carousel", "carousels",<DeliveredProcedureOutlined />),
    getItem("Danh mục", "categories",<MenuOutlined />),
    getItem("Collection", "collections",<GroupOutlined />),
    getItem("Chatbox", "chat", <WechatOutlined />)
  ];

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "reviews":
        return <AdminReview />;
      case "products":
        return <AdminProduct />;
      case "users":
        return <AdminUser />;
      case "carousels":
        return <AdminCarousel/>
      case "collections": 
        return <AdminCollectionPage />;
      case "categories": 
        return <AdminCategory/>;
      case "orders":
        return <OrderHistory />; 
      case "chat":
        return <AdminChatBox/>;
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ display: "flex", overflowX: "hidden" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          selectedKeys={[keySelected]}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: "15px 0 15px 15px" }}>
          {!keySelected && (
            <CustomizedContent data={items} setKeySelected={setKeySelected} />
          )}
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
