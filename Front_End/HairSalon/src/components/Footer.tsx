import React from "react";
import { Row, Col, Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Row gutter={[16, 16]} justify="space-around">
          <Col xs={24} md={8}>
            <h3 className="footer-title">Địa Chỉ HAIR SALON</h3>
            <p>
              <EnvironmentOutlined /> FPT University
            </p>
            <p>
              <PhoneOutlined /> +(84)0123456789
            </p>
            <p>
              <PhoneOutlined /> +(84)9876543210
            </p>
            <p>
              <MailOutlined /> HairSalon@gmail.com
            </p>
          </Col>
          <Col xs={24} md={8}>
            <h3 className="footer-title">Các Trang Liên Kết Hair Salon</h3>
            <ul className="footer-links">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Google Plus</li>
              <li>LinkedIn</li>
              <li>YouTube</li>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="footer-bottom">
        <p>© HAIR SALON 2024 | ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
