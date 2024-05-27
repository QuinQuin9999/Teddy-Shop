import React, { useState } from 'react';
import UserInfo from '../../components/UserInfor/UserInfor';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import OrderHis from '../../components/OrderHis/OrderHis';
import './styles.css'; // Import the CSS file

const UserPage = () => {
  const [selectedTab, setSelectedTab] = useState('userInfo');
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const tabContent = () => {
    switch (selectedTab) {
      case 'userInfo':
        return <UserInfo />;
      case 'changePassword':
        return <ChangePassword />;
      case 'orderHistory':
        return <OrderHis />;
      default:
        return <UserInfo />;
    }
  };

  if (!isLoggedIn) {
    return window.location.href = '/SignIn';
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className={`sidebar-item ${selectedTab === 'userInfo' ? 'active' : ''}`} onClick={() => handleTabChange('userInfo')}>
          Thông tin cá nhân
        </div>
        <div className={`sidebar-item ${selectedTab === 'changePassword' ? 'active' : ''}`} onClick={() => handleTabChange('changePassword')}>
          Thay đổi mật khẩu
        </div>
        <div className={`sidebar-item ${selectedTab === 'orderHistory' ? 'active' : ''}`} onClick={() => handleTabChange('orderHistory')}>
          Lịch sử đơn hàng
        </div>
      </div>
      <div className="content">
        {tabContent()}
      </div>
    </div>
  );
};

export default UserPage;
