import React, { useState, useEffect} from 'react';
import { Button, Form, message} from 'antd';
import { StyleContainer, StyleRightCon, StyleInput} from './style';
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
            <StyleRightCon>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CC7A33', marginBottom: '32px' }}>Vui lòng điền địa chỉ Email đã đăng ký</h4>
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
                    wrapperCol={{ span: 18 }}
                    validateStatus={checkemail ? 'error' : ''} 
                    help={checkemail && 'Địa chỉ Email chưa chính xác'}>
                    <StyleInput />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={handleSendEmail} loading={loading}>
                        Gửi mật khẩu mới
                    </Button>
                </Form.Item>

                <p style={{textAlign: 'center'}}>Chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
            </Form>
        </StyleRightCon>
        </StyleContainer>
        
    );
};

export default ForgotPassword;
