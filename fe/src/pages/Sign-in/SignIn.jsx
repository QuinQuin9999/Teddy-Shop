import React, { useState, useEffect } from 'react';
import { Button, Form, message, Checkbox } from 'antd';
import { StyleContainer, StyleLeftCon, StyleRightCon, StyleInput, StyleInputPassword } from './style';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
const SignIn = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user)
    const [check, setCheck] = useState(false);
    useEffect(() => {
        // Xóa trạng thái lỗi email khi người dùng thay đổi giá trị email
        setCheck(false);
    }, [form.getFieldValue('email')]);
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const values = await form.validateFields();
            const { email, password } = values;
            //console.log("before call api: ", values);
            const response = await fetch('http://localhost:8083/api/user/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            // console.log("data received: ", data)
            if (data.status === 'OK') {
                //setCheck(true);
                message.success('Login success');
                const { access_token, refresh_token, _id } = data.data;
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                //setCheck(true);
                //const { _id } = data.data; // Lấy _id từ dữ liệu trả về
                //localStorage.setItem('userID', _id);
                if (rememberMe) { // Kiểm tra trạng thái của checkbox
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('email', email); // Lưu lại thông tin đăng nhập nếu được chọn
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('email'); // Xóa thông tin đăng nhập nếu không được chọn
                }
                if (_id === "665077eba8c8ec39d663256b"){
                    data.data.isAdmin = true;
                }
                console.log(data.data);
                dispatch(updateUser(data))
                console.log(location?.state)
                if(location?.state){
                    navigate(location?.state);
                }
                else navigate('/')
            } else {
                if (data.status === 'ERR' && data.message === 'The password or user is incorrect') {
                    setCheck(true);
                    //message.error(data.message || 'Login fail');
                } else {
                    setCheck(true)
                    //message.error('Login fail');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            //message.error('Đã xảy ra lỗi, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };
    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked); // Cập nhật state khi người dùng thay đổi checkbox
    };
    useEffect(() => {
        const rememberMeEnabled = localStorage.getItem('rememberMe') === 'true';
        if (rememberMeEnabled) {
            const rememberedUsername = localStorage.getItem('email');
            if (rememberedUsername) {
                form.setFieldsValue({ email: rememberedUsername }); // Tự động điền tên đăng nhập vào trường nhập liệu
                setRememberMe(true);
            }
        }
    }, []);
    return (
        <StyleContainer>
            <StyleLeftCon>
            <img src='https://i.pinimg.com/564x/64/c3/6b/64c36b10d3e8904e6a23fc59ed3ca060.jpg' alt='gear'
            style={{width:'300px', height:'300px', borderRadius: '50%'}}/>
            <h4 style={{textAlign:'center', color: '#1677FF'}}>Chào mừng đến với GearShop</h4>
            <h6 style={{textAlign:'center', margin: '0', color: '#1677FF'}}>Chất lượng tốt, giá thành tốt, ưu đãi cực vui</h6>
            </StyleLeftCon>
            <StyleRightCon>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A93FF' }}>Đăng nhập</h4>
            <Form form={form}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên tài khoản!',
                        },
                    ]}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}>
                    <StyleInput />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    validateStatus={check ? 'error' : ''} 
                    help={check && 'Tài khoản hoặc mật khẩu không chính xác'}>
                    <StyleInputPassword />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox checked={rememberMe} onChange={handleCheckboxChange}>Ghi nhớ thông tin đăng nhập</Checkbox>
                    <p><Link to="/ForgotPassword">Quên mật khẩu?</Link></p>
                </Form.Item>
                
                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                    <Button type="primary" onClick={handleSignIn} loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>

                <p style={{textAlign: 'center'}}>Chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
            </Form>
        </StyleRightCon>
        </StyleContainer>
        
    );
};

export default SignIn;
