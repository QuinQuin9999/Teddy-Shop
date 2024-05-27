import React, {useState} from 'react'
import { Button, Form, message} from 'antd';
import { StyleInput, StyleInputPassword, StyleContainer, StyleLeftCon, StyleRightCon} from './style';
import { Link } from 'react-router-dom';
import * as CartService from '../../services/CartService'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
      });
      const [passwordMatch, setPasswordMatch] = useState(true);
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
      const [validatePass, setValidatePass] = useState(true);
      const [emailExistError, setEmailExistError] = useState(true); 
      const [usernameExistError, setUsernameExistError] = useState(true);
      const [validateEmail, setValidateEmail] = useState(true);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRegex.test(formData.password)) {
          //message.error('Mật khẩu phải chứa ít nhất 8 kí tự bao gồm kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt');
          setValidatePass(false);
          setUsernameExistError(true); 
          setEmailExistError(true);
          setValidateEmail(true)
          setPasswordMatch(true);
          return;
        }
        try {
          console.log("sign-up")
          const response = await fetch('http://localhost:8083/api/user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          
          if (response.ok) {
            if (data.status === 'ERR' && data.message === 'The username is already') {
                setUsernameExistError(false); 
                setEmailExistError(true);
                setPasswordMatch(true);
                setValidatePass(true);
                setValidateEmail(true)
            }else if (data.status === 'ERR' && data.message === 'The email is already'){
                setEmailExistError(false);
                setUsernameExistError(true); 
                setPasswordMatch(true);
                setValidatePass(true);
                setValidateEmail(true)
            }else if(data.status === 'ERR' && data.message === 'The password is not match confirmPassword'){
              setPasswordMatch(false);
              setEmailExistError(true);
              setUsernameExistError(true); 
              setValidatePass(true);
              setValidateEmail(true)
            } else if(data.status === 'ERR' && data.message === 'The email is invalid') {
              setValidateEmail(false)
              setEmailExistError(true);
              setUsernameExistError(true); 
              setPasswordMatch(true);
              setValidatePass(true);
            } else {
            //message.success('Đăng ký thành công');
            const cart = await CartService.createCart(data.data.id);
            setFormData({
              username: '',
              email: '',
              phone: '',
              address: '',
              password: '',
              confirmPassword: '',
            });
            // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
            window.location.href = '/SignIn';
          } 
        }else {
            message.error(data.message || 'Đã có lỗi xảy ra');
          }
        } catch (error) {
          console.error(error); 
        }
      };    
  return (
    <StyleContainer>
      <StyleRightCon>
      <h4 style={{display:'flex', alignItems: 'center', justifyContent:'center', color: '#CC7A33'}}>Đăng ký</h4>
      <Form>
        <Form.Item
            label="Tên tài khoản"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <>
              <StyleInput name="username" value={formData.username} onChange={handleChange}/>
              {!usernameExistError && <p style={{ color: 'red', margin: '5px 0 0 0' }}>tài khoản đã tồn tại</p>}
            </>
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                required: true,
                message: 'Please input your email!',
                },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <>
              <StyleInput name="email" value={formData.email} onChange={handleChange}/>
              {!emailExistError && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Email đã tồn tại</p>}
              {!validateEmail && <p style={{ color:'red', margin: '5px 0 0 0' }}>Email không hợp lệ</p>}
            </>
        </Form.Item>
        
        <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
                {
                required: true,
                message: 'Please input your phone!',
                },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
              <StyleInput name="phone" value={formData.phone} onChange={handleChange}/>
        </Form.Item>

        <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
                {
                required: true,
                message: 'Please input your address!',
                },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>      
              <StyleInput name="address" value={formData.address} onChange={handleChange} />
        </Form.Item>

        <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <>
              <StyleInputPassword name="password" value={formData.password} onChange={handleChange}/>
              {!validatePass && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Mật khẩu phải chứa ít nhất 8 kí tự bao gồm kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt</p>}
            </>
        </Form.Item>
        <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            rules={[
                {
                required: true,
                message: 'Please input your confirm pasword!',
                },
            ]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16}}>
            <>
              <StyleInputPassword name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              {!passwordMatch && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Mật khẩu xác nhận không khớp</p>}
            </>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 10,span: 14}}>
            <div onClick={handleSubmit}><Button type="primary" htmlType="submit">Đăng ký</Button></div>
        </Form.Item>
        <p style={{textAlign: 'center'}}>Đã có tài khoản? <Link to="/SignIn">Đăng nhập</Link></p>
    </Form>
    </StyleRightCon>
    </StyleContainer>
    
    
  )
}

export default Register