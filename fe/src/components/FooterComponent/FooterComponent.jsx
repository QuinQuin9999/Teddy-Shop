import React from "react";
import { Col, Layout, Row } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
  RightOutlined,  
} from "@ant-design/icons";
import { FooterContainer, FooterInfo, FooterTitle, Info, InfoDetail, Logo, Social } from "./style";


const FooterComponent = () => (
  <>
    <FooterContainer>
      <FooterInfo>
        <FooterTitle><Logo src="/logo.jpg" alt="Logo" /></FooterTitle>
        <p>Chuyên cung cấp Gấu Bông & Thú Nhồi Bông chính hãng.</p>
        <Info>
          <PhoneOutlined style = {{color: '#BF8B70', marginRight: '4px'}} />
          <span>HCM: 037 804 2260</span>
        </Info>
        <Info>
          <MailOutlined style = {{color: '#BF8B70', marginRight: '4px'}} />
          <span>babybearshop@gmail.com</span>
        </Info>
      </FooterInfo>
      <FooterInfo>
        <FooterTitle>CHÍNH SÁCH</FooterTitle>
        <InfoDetail href="#"><RightOutlined style={{marginRight: '4px'}} />Tìm kiếm</InfoDetail>
        <InfoDetail href="#"><RightOutlined style={{marginRight: '4px'}}/>Liên hệ</InfoDetail>
        <InfoDetail href="#"><RightOutlined style={{marginRight: '4px'}}/>Trung tâm bảo hành</InfoDetail>
      </FooterInfo>
      <FooterInfo>
        <FooterTitle>HƯỚNG DẪN</FooterTitle>
        <InfoDetail href="#"><RightOutlined style={{marginRight: '4px'}}/>Hướng dẫn thanh toán</InfoDetail>
        <InfoDetail href="#"><RightOutlined style={{marginRight: '4px'}}/>Hướng dẫn sử dụng</InfoDetail>
        <InfoDetail href="#"><RightOutlined style={{marginRight: '4px'}}/>Tra cứu bảo hành</InfoDetail>
      </FooterInfo>

      <FooterInfo>
        <FooterTitle>KẾT NỐI VỚI CHÚNG TÔI</FooterTitle>
        <Social>
          <InfoDetail href="#" target="_blank" rel="noopener noreferrer">
            <FacebookFilled style={{ color: '#BF8B70', fontSize: "24px" }}/>
          </InfoDetail>
          <InfoDetail href="#" target="_blank" rel="noopener noreferrer">
            <TwitterCircleFilled style={{ color: '#BF8B70', fontSize: "24px" }} />
          </InfoDetail>
          <InfoDetail href="#" target="_blank" rel="noopener noreferrer">
            <YoutubeFilled style={{ color: '#BF8B70', fontSize: "24px" }} />
          </InfoDetail>
          <InfoDetail href="#" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined style={{ color: '#BF8B70', fontSize: "24px" }} />
          </InfoDetail>
        </Social>
        
      </FooterInfo>
      <Row style={{ width: '100%' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <p>&copy; 2024 BABY BEAR. All rights reserved.</p>
        </Col>
      </Row>
    </FooterContainer>
  </>
);

export default FooterComponent;
