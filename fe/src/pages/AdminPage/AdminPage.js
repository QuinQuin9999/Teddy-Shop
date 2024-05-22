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
import OrderHistory from "../../components/OrderHistory"; 

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");

  const items = [
    getItem("Đánh giá", "reviews", <FormOutlined />),
    getItem("Sản phẩm", "products", <ProductOutlined />),
    getItem("Media", "medias", <FileImageOutlined />),
    getItem("Carousel", "carousels",<DeliveredProcedureOutlined />),
    getItem("User", "users",<UserOutlined />),
    getItem("Danh mục", "categories",<MenuOutlined />),
    getItem("Collection", "collections",<GroupOutlined />),
    getItem("Chatbox", "chat" ,<WechatOutlined />),
    getItem("Quản lý đơn hàng", "orders", <ShoppingCartOutlined />), 
  ];

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const renderPage = (key) => {
    switch (key) {
      // case "reviews":
      //   return <AdminReview />;
      // case "products":
      //   return <AdminProduct />;
      // case "carousels":
      //   return <AdminCarousel />;
      case "users":
        return <AdminUser />;
      case "collections": 
        return <AdminCollectionPage />;
      // case "categories": 
      //   return <CategoryManager/>;
      case "chat": 
        return <AdminChatBox/>;
      case "orders":
        return <OrderHistory />; 
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
