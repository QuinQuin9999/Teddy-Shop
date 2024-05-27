import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { WrapperContainer, StyleInputPassword} from './style';
import bcrypt from 'bcryptjs';
import { useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import { resetCart } from "../../redux/slices/cartSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const userId = useSelector(state => state.user.id);

  //console.log(user); 
  console.log(userId);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
  };
  const handleLogout = async () => {
    try {
      const logout = await UserService.logoutUser(userId, cart.orderItems)
      dispatch(resetUser());
      dispatch(resetCart());
      window.location.href = '/SignIn';
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      message.error('Mật khẩu mới và nhập lại mật khẩu mới không khớp.');
      return;
    }
    
    try {
       

      
      const hashedNewPassword = await bcrypt.hash(newPassword, 10); 
      // Cập nhật mật khẩu mới
      const updateUser = {
        ...user,
        password: hashedNewPassword,
      };

      // Gửi request PUT để cập nhật mật khẩu mới
       await fetch(`http://localhost:8083/api/user/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      });

      message.success('Cập nhật mật khẩu thành công.');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      handleLogout();
    } catch (error) {
      //console.error(error);
      message.error('Đã xảy ra lỗi khi cập nhật mật khẩu.');
    }
  };

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', fontSize: '32px' }}>Chỉnh sửa mật khẩu</h1>
      <WrapperContainer>
        <Form onSubmit={handleSubmit} name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}}>
          <Form.Item label="Mật khẩu cũ" >
            <StyleInputPassword type="password" name="oldPassword" value={oldPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Mật khẩu mới" >
            <StyleInputPassword type="password" name="newPassword" value={newPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Nhập lại mật khẩu mới" >
            <StyleInputPassword type="password" name="confirmNewPassword" value={confirmNewPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div onClick={handleSubmit}><Button type="primary" htmlType="submit">Cập nhật mật khẩu</Button></div>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </div>
  );
};

export default ChangePassword;