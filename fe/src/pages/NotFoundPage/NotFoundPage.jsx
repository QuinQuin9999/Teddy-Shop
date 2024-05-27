import React, { useEffect } from "react";
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="page_404">
      <div>
        <h1>Không tìm thấy trang</h1>
        <p>
          Xin lỗi, Trang này đã không còn hoạt động hoặc không tồn tại.<br />
          Trang sẽ tự động chuyển về trang chủ sau <span className="highlight">3 giây</span>
        </p>
        <button className="link_404" onClick={() => navigate('/')}>Trở về trang chủ</button>
      </div>
    </section>
  );
};

export default NotFoundPage;
