import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Row, Col, Input, Select, Divider, Modal } from "antd";
import axios from "axios";
import VoucherComponent from "../../components/VoucherComponent/VoucherComponent";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";  // Thêm import này

const { Search } = Input;
const { Option } = Select;

// const saveVouchersToCookie = (vouchers) => {
//   Cookies.set("savedVouchers", JSON.stringify(vouchers), { expires: 7 });
// };

const getVouchersFromCookie = () => {
  const saved = Cookies.get("savedVouchers");
  return saved ? JSON.parse(saved) : [];
};

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedVouchers, setSavedVouchers] = useState(getVouchersFromCookie());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  // const [selectedVoucher, setSelectedVoucher] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const navigate = useNavigate();  // Khai báo hook useNavigate

  // const showVoucherDetails = (voucher) => {
  //   setSelectedVoucher(voucher);
  //   setIsModalVisible(true);
  // };

  // const closeModal = () => {
  //   setSelectedVoucher(null);
  //   setIsModalVisible(false);
  // };

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8083/api/v1/voucher/getAll");
      setVouchers(response.data.filter(item => new Date(item.toDate) >= new Date() && item.quantity > 0));
    } catch (error) {
      message.error("Không thể tải danh sách voucher!");
    } finally {
      setLoading(false);
    }
  };

  // const handleSave = (voucher) => {
  //   if (savedVouchers.some((v) => v._id === voucher._id)) {
  //     message.warning("Voucher này đã được lưu!");
  //   } else {
  //     const updatedVouchers = [...savedVouchers, voucher];
  //     setSavedVouchers(updatedVouchers);
  //     saveVouchersToCookie(updatedVouchers);
  //     message.success(`Đã lưu mã giảm giá ${voucher.name}!`);
  //   }
  // };

  // const handleUse = (voucher) => {
  //   console.log("Dùng ngay voucher:", voucher);

  //   navigate("/search");
  // };

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleFilter = (value) => {
    setFilterCategory(value);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.name.toLowerCase().includes(searchTerm) &&
      (filterCategory
        ? (filterCategory === "product" && voucher.type === 1) ||
          (filterCategory === "ship" && voucher.type === 2)
        : true)
  );

  return (
    <div>
      {/* <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <h3 style={{ padding: "12px", textAlign: "center" }}>Thông Tin Voucher</h3>
        {selectedVoucher && (
          <div>
            <p><strong>Mã voucher:</strong> {selectedVoucher.code}</p>
            <p><strong>Tên voucher:</strong> {selectedVoucher.name}</p>
            <p><strong>Ưu đãi:</strong> {selectedVoucher.percent}%</p>
            <p><strong>Giá trị đơn hàng tối thiểu:</strong> {selectedVoucher.minPriceOrder ? `${selectedVoucher.minPriceOrder} VNĐ` : "Không yêu cầu"}</p>
            <p><strong>Giá trị giảm tối đa:</strong> {selectedVoucher.maxPrice ? `${selectedVoucher.minPriceOrder} VNĐ` : "Không giới hạn"}</p>
            <p><strong>Loại:</strong> {selectedVoucher.type === 1 ? "Dành cho sản phẩm" : "Dành cho phí ship"}</p>
            <p><strong>Ngày bắt đầu:</strong> {new Date(selectedVoucher.fromDate).toLocaleDateString()}</p>
            <p><strong>Ngày kết thúc:</strong> {new Date(selectedVoucher.toDate).toLocaleDateString()}</p>
            <p><strong>Xem chi tiết:</strong> {selectedVoucher.description}</p>
          </div>
        )}
      </Modal> */}

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Khám phá Ưu đãi Hấp dẫn!</h2>
        <p>Nhận ngay các mã giảm giá mới nhất và tiết kiệm nhiều hơn khi mua sắm.</p>
      </div>

      <div style={{ padding: "20px 0", display: "flex", gap: "10px", justifyContent: "center" }}>
        <Search
          placeholder="Tìm kiếm voucher..."
          allowClear
          onSearch={handleSearch}
          style={{
            width: 300,
            borderColor: "#ddd",
            color: "#555",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#994C00";
            e.target.style.color = "#994C00";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#ddd";
            e.target.style.color = "#555";
          }}
        />
        
        <Select
          placeholder="Chọn danh mục"
          allowClear
          onChange={handleFilter}
          style={{
            width: 200,
            borderColor: "#ddd",
            color: "#555",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#994C00";
            e.target.style.color = "#994C00";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#ddd";
            e.target.style.color = "#555";
          }}
        >
          <Option value="product">Dành cho sản phẩm</Option>
          <Option value="ship">Dành cho phí ship</Option>
        </Select>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <Row gutter={[16, 16]} justify="center">
            {filteredVouchers.map((voucher) => (
              <Col key={voucher._id} span={12}>
                {/* <VoucherComponent voucher={voucher} onSave={handleSave} onUse={handleUse} onClick={() => showVoucherDetails(voucher)} /> */}
                <VoucherComponent voucher={voucher} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <Divider />

      <div>
        <h3 style={{ padding: "20px", textAlign: "center" }}>Danh sách mã giảm giá đã lưu</h3>
        {savedVouchers.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: "800px", width: "100%" }}>
              <Row gutter={[16, 16]} justify="center">
                {savedVouchers.map((voucher) => (
                  <Col key={voucher._id} span={12}>
                    {/* <VoucherComponent voucher={voucher} onSave={handleSave} onUse={handleUse} /> */}
                    <VoucherComponent voucher={voucher} />

                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Bạn chưa lưu mã giảm giá nào!</p>
        )}
      </div>
    </div>
  );
};

export default VoucherPage;
