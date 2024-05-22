import React, { useState, useEffect} from 'react';
import { Button, Form, message} from 'antd';
import { StyleContainer, StyleLeftCon, StyleRightCon, StyleInput} from './style';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [checkemail, setCheckemail] = useState(false);
    useEffect(() => {
        // Xóa trạng thái lỗi email khi người dùng thay đổi giá trị email
        setCheckemail(false);
    }, [form.getFieldValue('email')]);
    const handleSendEmail = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            const response = await fetch('http://localhost:8083/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email }),
            });
            const data = await response.json();
            setLoading(false);
            if (data.status === 'OK') {
                //message.success(data.message);
                navigate('/SignIn');
            } else {
                //message.error(data.message);
                setCheckemail(true);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            //message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
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
            <h4 style={{ display: 'flex',color: '#1A93FF', textAlign: 'center' }}>Vui lòng nhập email đã đăng ký để lấy lại mật khẩu</h4>
            <Form form={form}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email đã đăng ký!',
                        },
                    ]}
                    labelCol={{ span: 4}}
                    wrapperCol={{ span: 20 }}
                    validateStatus={checkemail ? 'error' : ''} 
                    help={checkemail && 'Email chưa được đăng ký'}>
                    <StyleInput />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                    <Button type="primary" onClick={handleSendEmail} loading={loading}>
                        Gửi
                    </Button>
                </Form.Item>

                <p style={{textAlign: 'center'}}>Chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
            </Form>
        </StyleRightCon>
        </StyleContainer>
        
    );
};

export default ForgotPassword;
