import React, { useState } from "react";
import { Card, Button, Space, Modal } from "antd";

const VoucherComponent = ({ voucher, onSave, onUse, disabledSaveBtn, functionBtn }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showVoucherDetails = () => {
    // setvoucher(voucher);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    // setvoucher(null);
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {voucher &&
          (<h3 style={{ padding: "12px", textAlign: "center", color: "#994C00" }}>Thông Tin Voucher {voucher.code}</h3>)
        }
        {voucher && (
          <div>
            <p><strong>Mã voucher:</strong> {voucher.code}</p>
            <p><strong>Tên voucher:</strong> {voucher.name}</p>
            <p><strong>Ưu đãi:</strong> {voucher.percent}%</p>
            <p><strong>Giá trị đơn hàng tối thiểu:</strong> {voucher.minPriceOrder ? `${voucher.minPriceOrder.toLocaleString()} VNĐ` : "Không yêu cầu"}</p>
            <p><strong>Giá trị giảm tối đa:</strong> {voucher.maxPrice ? `${voucher.maxPrice.toLocaleString()} VNĐ` : "Không giới hạn"}</p>
            <p><strong>Loại:</strong> {voucher.type === 1 ? "Dành cho sản phẩm" : "Dành cho phí ship"}</p>
            <p><strong>Ngày bắt đầu:</strong> {new Date(voucher.fromDate).toLocaleDateString()}</p>
            <p><strong>Ngày kết thúc:</strong> {new Date(voucher.toDate).toLocaleDateString()}</p>
            <p><strong>Xem chi tiết:</strong> {voucher.description}</p>
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
        onClick={showVoucherDetails}
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

          {functionBtn && (<div>
            <Space direction="vertical">
              <Button
                type={disabledSaveBtn ? "default" : "primary"}
                disabled={disabledSaveBtn}
                style={{
                  width: 100,
                  borderColor: "#ddd",
                  // color: "#555",
                  transition: "all 0.3s",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(voucher);
                }}
              >
                Lưu
              </Button>
              <Button
                type="primary"
                style={{ width: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onUse(voucher);
                }}
              >
                Dùng Ngay
              </Button>
            </Space>
          </div>)}
        </div>
      </Card>
    </>
  );
};

export default VoucherComponent;