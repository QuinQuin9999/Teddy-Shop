import React from "react";
import { Card, Button, Space } from "antd";

const VoucherComponent = ({ voucher, onSave, onUse, onClick }) => {
  return (
    <Card
      bordered
      style={{
        width: 400,
        marginBottom: 16,
        padding: 10,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={onClick}
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
              type="default"
              style={{
                width: 100,
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
        </div>
      </div>
    </Card>
  );
};

export default VoucherComponent;
