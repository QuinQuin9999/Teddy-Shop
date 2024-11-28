import React, { useState, useEffect } from "react";
import { Card, Button, Space } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";

const saveVouchersToCookie = (vouchers) => {
  Cookies.set("savedVouchers", JSON.stringify(vouchers), { expires: 7 });
};

const getVouchersFromCookie = () => {
  const saved = Cookies.get("savedVouchers");
  return saved ? JSON.parse(saved) : [];
};
const VoucherComponent = ({ voucher }) => {

  const [savedVouchers, setSavedVouchers] = useState(getVouchersFromCookie());
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();  // Khai báo hook useNavigate

  const showVoucherDetails = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalVisible(true);
  };

  const handleSave = (voucher) => {
    if (savedVouchers.some((v) => v._id === voucher._id)) {
      message.warning("Voucher này đã được lưu!");
    } else {
      const updatedVouchers = [...savedVouchers, voucher];
      setSavedVouchers(updatedVouchers);
      saveVouchersToCookie(updatedVouchers);
      message.success(`Đã lưu mã giảm giá ${voucher.name}!`);
    }
  };

  const handleUse = (voucher) => {
    console.log("Dùng ngay voucher:", voucher);

    navigate("/search");
  };

  const closeModal = () => {
    setSelectedVoucher(null);
    setIsModalVisible(false);
  };

  return (
    <>
    <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedVoucher &&
          (<h3 style={{ padding: "12px", textAlign: "center", color: "#994C00" }}>Thông Tin Voucher {selectedVoucher.code}</h3>)
        }
        {selectedVoucher && (
          <div>
            <p><strong>Mã voucher:</strong> {selectedVoucher.code}</p>
            <p><strong>Tên voucher:</strong> {selectedVoucher.name}</p>
            <p><strong>Ưu đãi:</strong> {selectedVoucher.percent}%</p>
            <p><strong>Giá trị đơn hàng tối thiểu:</strong> {selectedVoucher.minPriceOrder ? `${selectedVoucher.minPriceOrder.toLocaleString()} VNĐ` : "Không yêu cầu"}</p>
            <p><strong>Giá trị giảm tối đa:</strong> {selectedVoucher.maxPrice ? `${selectedVoucher.maxPrice.toLocaleString()} VNĐ` : "Không giới hạn"}</p>
            <p><strong>Loại:</strong> {selectedVoucher.type === 1 ? "Dành cho sản phẩm" : "Dành cho phí ship"}</p>
            <p><strong>Ngày bắt đầu:</strong> {new Date(selectedVoucher.fromDate).toLocaleDateString()}</p>
            <p><strong>Ngày kết thúc:</strong> {new Date(selectedVoucher.toDate).toLocaleDateString()}</p>
            <p><strong>Xem chi tiết:</strong> {selectedVoucher.description}</p>
          </div>
        )}
    </Modal>
    <Card
      bordered
      style={{
        width: 400,
        marginBottom: 16,
        padding: 10,
        borderRadius: 8,
        // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
      // onClick={onClick}
      onClick={() => showVoucherDetails(voucher)}
      hoverable
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "20px",
          backgroundColor: "#F7F2EC",
          clipPath: `polygon(
            0% 0%, 50% 5%, 0% 10%, 50% 15%, 
            0% 20%, 50% 25%, 0% 30%, 50% 35%, 
            0% 40%, 50% 45%, 0% 50%, 50% 55%, 
            0% 60%, 50% 65%, 0% 70%, 50% 75%, 
            0% 80%, 50% 85%, 0% 90%, 50% 95%, 
            0% 100%
          )`,
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 20,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ flex: 1, paddingRight: 10 }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: "bold" }}>{voucher.name}</p>
          <p style={{ margin: "4px 0", fontSize: 14, color: "#555" }}>Giảm giá: {voucher.percent}%</p>
          <p style={{ margin: 0, fontSize: 11, color: "#888" }}>
            Ngày kết thúc: {new Date(voucher.toDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <Space direction="vertical">
            <Button
              type= {(savedVouchers.some((v) => v._id === voucher._id)) ? "default" : "primary"}
              disabled = {(savedVouchers.some((v) => v._id === voucher._id)) ? true : false}
              style={{
                width: 100,
                borderColor: "#ddd",
                // color: "#FBFBFB",
                // transition: "all 0.3s",
              }}
              // onMouseEnter={(e) => {
              //   e.target.style.borderColor = "#994C00";
              //   e.target.style.color = "#994C00";
              // }}
              // onMouseLeave={(e) => {
              //   e.target.style.borderColor = "#ddd";
              //   e.target.style.color = "#555";
              // }}
              onClick={(e) => {
                e.stopPropagation();
                // onSave(voucher);
                handleSave(voucher);
              }}
            >
              {(savedVouchers.some((v) => v._id === voucher._id)) ? "Đã lưu" : "Lưu"}
            </Button>
            <Button
              type="primary"
              style={{ width: 100 }}
              onClick={(e) => {
                e.stopPropagation();
                // onUse(voucher);
                handleUse(voucher);
              }}
            >
              Dùng Ngay
            </Button>
          </Space>
        </div>
      </div>
    </Card>
    </>
    
  );
};

export default VoucherComponent;
