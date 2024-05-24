import React, {useState} from 'react'
import { Button, Form, message} from 'antd';
import { StyleInput, StyleInputPassword, StyleContainer, StyleLeftCon, StyleRightCon} from './style';
import { Link } from 'react-router-dom';
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
      const [validatePass, setvalidatePass] = useState(true);
      const [emailExistError, setEmailExistError] = useState(true); 
      const [usernameExistError, setUsernameExistError] = useState(true);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        // if (formData.password !== formData.confirmPassword) {
        //   //message.error('Mật khẩu xác nhận không khớp');
        //   //alert("not match")
        //   setPasswordMatch(false);
        //   return;
        // }
        if (!passwordRegex.test(formData.password)) {
          //message.error('Mật khẩu phải chứa ít nhất 8 kí tự bao gồm kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt');
          setvalidatePass(false);
          setUsernameExistError(true); 
          setEmailExistError(true);
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
          console.log(data); 
          if (response.ok) {
            if (data.status === 'ERR' && data.message === 'The username is already') {
                setUsernameExistError(false); 
                setEmailExistError(true);
                setPasswordMatch(true);
                setvalidatePass(true);
            }else if (data.status === 'ERR' && data.message === 'The email is already'){
                setEmailExistError(false);
                setUsernameExistError(true); 
                setPasswordMatch(true);
                setvalidatePass(true);
            }else if(data.status === 'ERR' && data.message === 'The password is not match confirmPassword'){
              setPasswordMatch(false);
              setEmailExistError(true);
                setUsernameExistError(true); 
                setvalidatePass(true);
            } else {
            //message.success('Đăng ký thành công');
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
      <StyleLeftCon>
        <img src='https://i.pinimg.com/564x/64/c3/6b/64c36b10d3e8904e6a23fc59ed3ca060.jpg' alt='gear'
        style={{width:'300px', height:'300px', borderRadius: '50%'}}/>
        <h4 style={{textAlign:'center', color: '#1677FF'}}>Chào mừng đến với GearShop</h4>
        <h6 style={{textAlign:'center', margin: '0', color: '#1677FF'}}>Chất lượng tốt, giá thành tốt, ưu đãi cực vui</h6>
      </StyleLeftCon>
      <StyleRightCon>
      <h4 style={{display:'flex', alignItems: 'center', justifyContent:'center', color: '#1A93FF'}}>Đăng ký</h4>
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}>
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}>
            <>
              <StyleInput name="email" value={formData.email} onChange={handleChange}/>
              {!emailExistError && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Email đã tồn tại</p>}
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}>
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}>      
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}>
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17}}>
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