import React, { useState, useEffect } from "react";
import { Button, message, Row, Col, Input, Select, Divider, Modal } from "antd";
import axios from "axios";
import VoucherComponent from "../../components/VoucherComponent/VoucherComponent";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const saveVouchersToCookie = (vouchers) => {
  Cookies.set("savedVouchers", JSON.stringify(vouchers), { expires: 7 });
};

const getVouchersFromCookie = () => {
  const saved = Cookies.get("savedVouchers");
  return saved ? JSON.parse(saved) : [];
};
const validateSavedVouchers = (allVouchers, savedVouchers) => {
  const validVoucherIds = allVouchers.map((voucher) => voucher._id);
  const updatedSavedVouchers = savedVouchers.filter((voucher) =>
    validVoucherIds.includes(voucher._id)
  );

  if (updatedSavedVouchers.length < savedVouchers.length) {
    message.info("Một số mã giảm giá đã bị xóa khỏi danh sách vì không còn hợp lệ.");
  }

  saveVouchersToCookie(updatedSavedVouchers);
  return updatedSavedVouchers;
};

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedVouchers, setSavedVouchers] = useState(getVouchersFromCookie());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visibleProductVouchers, setVisibleProductVouchers] = useState(2);
  const [visibleShipVouchers, setVisibleShipVouchers] = useState(2);

  const [visibleSavedVouchers, setVisibleSavedVouchers] = useState(2);

  const navigate = useNavigate();

  const showVoucherDetails = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedVoucher(null);
    setIsModalVisible(false);
  };


  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8083/api/v1/voucher/getAll");
      setVouchers(response.data);

      const updatedSavedVouchers = validateSavedVouchers(response.data, savedVouchers);
      setSavedVouchers(updatedSavedVouchers);
    } catch (error) {
      message.error("Không thể tải danh sách voucher!");
    } finally {
      setLoading(false);
    }
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
  const handleLoadMoreSaved = () => {
    if (visibleSavedVouchers + 4 >= savedVouchers.length) {
      setVisibleSavedVouchers(savedVouchers.length);
    } else {
      setVisibleSavedVouchers(visibleSavedVouchers + 4);
    }
  };
  const handleLoadMoreProduct = () => {
    if (visibleProductVouchers + 4 >= filteredVouchers.filter(v => v.type === 1).length) {
      setVisibleProductVouchers(filteredVouchers.filter(v => v.type === 1).length);
    } else {
      setVisibleProductVouchers(visibleProductVouchers + 4);
    }
  };

  const handleLoadMoreShip = () => {
    if (visibleShipVouchers + 4 >= filteredVouchers.filter(v => v.type === 2).length) {
      setVisibleShipVouchers(filteredVouchers.filter(v => v.type === 2).length);
    } else {
      setVisibleShipVouchers(visibleShipVouchers + 4);
    }
  };

  const handleUse = (voucher) => {
    console.log("Dùng ngay voucher:", voucher);

    navigate("/search");
  };

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
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
  const hasMoreProductVouchers = filteredVouchers.filter(v => v.type === 1).length > 2;
  const hasMoreShipVouchers = filteredVouchers.filter(v => v.type === 2).length > 2;
  return (
    <div>
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
            <p><strong>Giá trị đơn hàng tối thiểu:</strong> {selectedVoucher.minPriceOrder ? `${selectedVoucher.minPriceOrder} VNĐ` : "Không yêu cầu"}</p>
            <p><strong>Giá trị giảm tối đa:</strong> {selectedVoucher.maxPrice ? `${selectedVoucher.maxPrice} VNĐ` : "Không giới hạn"}</p>
            <p><strong>Loại:</strong> {selectedVoucher.type === 1 ? "Dành cho sản phẩm" : "Dành cho phí ship"}</p>
            <p><strong>Ngày bắt đầu:</strong> {new Date(selectedVoucher.fromDate).toLocaleDateString()}</p>
            <p><strong>Ngày kết thúc:</strong> {new Date(selectedVoucher.toDate).toLocaleDateString()}</p>
            <p><strong>Xem chi tiết:</strong> {selectedVoucher.description}</p>
          </div>
        )}
      </Modal>

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2 style={{ color: "#994C00" }}>Khám Phá Ưu Đãi Hấp Dẫn!</h2>
        <p>"Nhận ngay các mã giảm giá mới nhất và tiết kiệm nhiều hơn khi mua sắm các sản phẩm đáng yêu tại BABYBEAR!🎁"</p>
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

      </div>


      <h3 style={{ textAlign: "center", marginTop: "20px", color: "#994C00" }}>Ưu Đãi Dành Cho Sản Phẩm</h3>
      <p style={{ textAlign: "center", margin: "10px 15% 10px 15%" }}>"Tại BABYBEAR, chúng tôi luôn mang đến những ưu đãi đặc biệt cho các sản phẩm độc đáo của mình! Hãy nhanh tay sở hữu các món đồ siêu dễ thương với mức giá vô cùng ưu đãi. Giảm ngay lên đến 50% cho các sản phẩm yêu thích! 😍"</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <img
          src="https://res.cloudinary.com/dyokn9ass/image/upload/v1732726682/Bigsale_test_hicxp9.png"
          alt="Product Voucher"
          style={{ width: "70%" }}
        />
      </div>
      <p style={{ textAlign: "center", margin: "10px 15% 10px 15%" }}>"Chỉ với một cú click, bạn đã có thể tiết kiệm ngay cho những sản phẩm đáng yêu này. Đừng bỏ lỡ!!!🌟"</p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <Row gutter={[16, 16]} justify="center">
            {filteredVouchers.filter(voucher => voucher.type === 1).slice(0, visibleProductVouchers).map((voucher) => (
              <Col key={voucher._id} span={12}>
                <VoucherComponent
                  voucher={voucher}
                  onSave={handleSave}
                  onUse={handleUse}
                  onClick={() => showVoucherDetails(voucher)}
                />
              </Col>
            ))}
          </Row>
          {hasMoreProductVouchers && visibleProductVouchers < filteredVouchers.filter(v => v.type === 1).length && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button type="primary" onClick={handleLoadMoreProduct}>
                Xem thêm
              </Button>
            </div>
          )}
        </div>
      </div>



      <h3 style={{ textAlign: "center", marginTop: "20px", color: "#994C00" }}>Ưu Đãi Dành Cho Phí Vận Chuyển</h3>
      <p style={{ textAlign: "center", margin: "10px 15% 10px 15%" }}>"Chúng tôi hiểu rằng phí ship đôi khi là một nỗi lo, nhưng đừng lo! Hãy tận dụng ưu đãi vận chuyển miễn phí hoặc giảm giá để tiết kiệm hơn mỗi lần mua sắm tại BABYBEAR! 🚚✨"</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <img
          src="https://res.cloudinary.com/dyokn9ass/image/upload/v1732728424/Big_sale_a7hdc0.png"
          alt="Ship Voucher"
          style={{ width: "70%" }}
        />
      </div>
      <p style={{ textAlign: "center", margin: "10px 15% 10px 15%" }}>"Nhận ngay ưu đãi giao hàng miễn phí cho các đơn hàng đủ điều kiện. Đừng để phí ship cản trở niềm vui mua sắm của bạn!💖"</p>


      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <Row gutter={[16, 16]} justify="center">
            {filteredVouchers.filter(voucher => voucher.type === 2).slice(0, visibleShipVouchers).map((voucher) => (
              <Col key={voucher._id} span={12}>
                <VoucherComponent
                  voucher={voucher}
                  onSave={handleSave}
                  onUse={handleUse}
                  onClick={() => showVoucherDetails(voucher)}
                />
              </Col>
            ))}
          </Row>
          {hasMoreShipVouchers && visibleShipVouchers < filteredVouchers.filter(v => v.type === 2).length && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button type="primary" onClick={handleLoadMoreShip}>
                Xem thêm
              </Button>
            </div>
          )}
        </div>
      </div>



      <h3 style={{ marginTop: "20px", textAlign: "center", color: "#994C00" }}>Danh sách mã giảm giá đã lưu</h3>
      <p style={{ textAlign: "center", margin: "10px 15% 10px 15%" }}>"Cùng khám phá lại những ưu đãi hấp dẫn mà bạn không thể bỏ lỡ. Tất cả những mã giảm giá yêu thích của bạn đang chờ đợi để giúp bạn tiết kiệm ngay hôm nay!📲 "</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <img
          src="https://res.cloudinary.com/dyokn9ass/image/upload/v1732730051/Big_sale_1_vd2mhs.png"
          alt="Your Voucher"
          style={{ width: "70%" }}
        />
      </div>
      <p style={{ textAlign: "center", margin: "10px 15% 10px 15%" }}>"Đừng để bất kỳ ưu đãi nào vuột mất! Tìm lại những mã giảm giá đã lưu và áp dụng ngay cho các đơn hàng tiếp theo để nhận thêm nhiều ưu đãi hấp dẫn!🎉"</p>



      <div>
        {savedVouchers.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: "800px", width: "100%" }}>
              <Row gutter={[16, 16]} justify="center">
                {savedVouchers.slice(0, visibleSavedVouchers).map((voucher) => (
                  <Col key={voucher._id} span={12}>
                    <VoucherComponent
                      voucher={voucher}
                      onSave={handleSave}
                      onUse={handleUse}
                    />
                  </Col>
                ))}
              </Row>
              {visibleSavedVouchers < savedVouchers.length && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <Button type="primary" onClick={handleLoadMoreSaved}>
                    Xem thêm
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Bạn chưa lưu mã giảm giá nào!</p>
        )}
      </div>
      <p style={{ textAlign: "center", margin: "10px 15% 10px 15%" }}>"Với BABYBEAR, mỗi lần mua sắm đều là một cuộc phiêu lưu đầy hấp dẫn! Khám phá những mã giảm giá siêu hấp dẫn cho sản phẩm yêu thích, ưu đãi miễn phí vận chuyển và các ưu đãi đặc biệt chỉ dành riêng cho bạn. Hãy lưu lại ngay các voucher hấp dẫn này và không bao giờ bỏ lỡ một cơ hội tuyệt vời nào!"</p>


    </div>

  );
};

export default VoucherPage;
