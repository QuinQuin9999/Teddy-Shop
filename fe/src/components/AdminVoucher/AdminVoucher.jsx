import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Tooltip,
} from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";

const AdminVoucher = () => {
  const initialVoucher = () => ({
    _id: "",
    code: "",
    name: "",
    percent: 0,
    minPriceOrder: 0,
    maxPrice: 0,
    type: 1,
    quantity: 0,
    description: "",
    fromDate: new Date(),
    toDate: new Date(),
  });
  const [stateVoucher, setStateVoucher] = useState(initialVoucher());
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [vouchers, setVouchers] = useState([]);
  const searchInput = useRef(null);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setStateVoucher({ ...stateVoucher, [name]: value });
  };

  const fetchVouchers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8083/api/v1/voucher/getAll`
      );
      setVouchers(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách voucher!");
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(stateVoucher);
    } else {
      form.resetFields();
    }
  }, [isModalOpen, stateVoucher, form]);

  const handleModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  }

  const handleSubmit = async (values) => {
    try {
      if (stateVoucher._id) {
        await axios.put(
          `http://localhost:8083/api/v1/voucher/update/${stateVoucher._id}`,
          values
        );
        message.success("Cập nhật voucher thành công!");
      } else {
        await axios.post(`http://localhost:8083/api/v1/voucher/save`, values);
        message.success("Thêm voucher thành công!");
      }
      setIsModalOpen(false);
      setIsDrawerOpen(false);
      form.resetFields();
      setStateVoucher(initialVoucher());
      fetchVouchers();
    } catch (error) {
      message.error("Lỗi khi xử lý voucher!");
    }
  };

  const handleDeleteVoucher = async () => {
    try {
      await axios.delete(
        `http://localhost:8083/api/v1/voucher/delete/${voucherToDelete}`
      );
      // message.success("Xóa voucher thành công!");
      fetchVouchers();
      setVoucherToDelete(null);
      setIsModalOpenDelete(false);
    } catch (error) {
      message.error("Lỗi khi xóa voucher!");
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
    setVoucherToDelete(null);
  };

  const showDrawer = (voucher) => {
    setIsDrawerOpen(true);
    setStateVoucher(voucher);
    form.setFieldsValue(voucher);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Nhập ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      ellipsis: true,
      sorter: (a, b) => a._id.length - b._id.length,
      ...getColumnSearchProps("_id"),
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ display: "block", marginBottom: "5px" }}>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Mã voucher",
      dataIndex: "code",
      sorter: (a, b) => a.code.length - b.code.length,
      ...getColumnSearchProps("code"),
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "percent",
      sorter: (a, b) => a.percent - b.percent,
      filters: [
        { text: "<=25%", value: "<=25" },
        { text: "25%-50%", value: "25-50" },
        { text: "50%-75%", value: "50-75" },
        { text: ">=75%", value: ">=75" },
      ],
      onFilter: (value, record) => {
        if (value === "<=25") {
          return record.percent <= 25;
        } else if (value === "25-50") {
          return record.percent >= 25 && record.percent <= 50;
        } else if (value === "50-75") {
          return record.percent >= 50 && record.percent <= 75;
        } else {
          return record.percent >= 75;
        }
      },
      // ...getColumnSearchProps("percent"),
    },
    {
      title: "Giá đơn hàng tối thiểu",
      dataIndex: "minPriceOrder",
      render: (price) =>
        price ? `${price.toLocaleString()} VND` : "Không giới hạn",
      sorter: (a, b) => (a.minPriceOrder || 0) - (b.minPriceOrder || 0),
      ...getColumnSearchProps("minPriceOrder"),
    },
    {
      title: "Giá giảm tối đa",
      dataIndex: "maxPrice",
      render: (price) =>
        price ? `${price.toLocaleString()} VND` : "Không giới hạn",
      sorter: (a, b) => (a.maxPrice || 0) - (b.maxPrice || 0),
      ...getColumnSearchProps("maxPrice"),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Loại",
      dataIndex: "type",
      filters: [
        { text: "Product", value: 1 },
        { text: "Ship", value: 2 },
      ],
      onFilter: (value, record) => record.type === value,
      render: (type) => {
        if (type === undefined || type === null) {
          return 0;
        }
        return type === 1
          ? "Dành cho sản phẩm"
          : type === 2
          ? "Dành cho phí ship"
          : "Khác";
      },
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ display: "block", marginBottom: "5px" }}>{text}</span>
        </Tooltip>
      ),
      sorter: (a, b) => a.description.length - b.description.length,
      ...getColumnSearchProps("description"),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "fromDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.fromDate) - new Date(b.fromDate),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "toDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.toDate) - new Date(b.toDate),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div style={{ display: "flex", alignContent: "space-between" }}>
          <EditOutlined
            style={{ color: "orange", fontSize: "20px", cursor: "pointer" }}
            onClick={() => {
              showDrawer(record);
            }}
          />
          <DeleteOutlined
            style={{
              color: "red",
              fontSize: "20px",
              cursor: "pointer",
              marginLeft: "8px",
            }}
            onClick={() => {
              setVoucherToDelete(record._id);
              setIsModalOpenDelete(true);
            }}
          />
        </div>
      ),
    },
  ];
  const dataTable = vouchers?.map((voucher) => ({
    ...voucher,
    key: voucher._id,
  }));

  console.log("values", stateVoucher);
  console.log(
    "valuesdate",
    new Date(stateVoucher.toDate).toISOString().split("T")[0]
  );
  return (
    <div style={{ margin: "4px" }}>
      <div>
        <h3>Quản lý Voucher</h3>
        <div style={{ marginTop: "10px" }}>
          <Button
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "6px",
              borderStyle: "dashed",
            }}
            onClick={handleModal}
          >
            <PlusOutlined style={{ fontSize: "20px" }} />
          </Button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <TableComponent
            columns={columns}
            data={dataTable}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </div>
        <ModalComponent
          title="Thêm Voucher"
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={form.submit}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={initialVoucher()}
          >
            <Form.Item
              label="Mã Voucher"
              name="code"
              rules={[{ required: true, message: "Vui lòng nhập mã voucher!" }]}
            >
              <Input onChange={handleOnchange} name="code" />
            </Form.Item>
            <Form.Item
              label="Tên Voucher"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên voucher!" },
              ]}
            >
              <Input onChange={handleOnchange} name="name" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Giá đơn hàng tối thiểu"
                  name="minPriceOrder"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Giá đơn hàng tối thiểu!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    step={5000}
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, minPriceOrder: value })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giá giảm tối đa"
                  name="maxPrice"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá giảm tối đa!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    step={5000}
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, maxPrice: value })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Giảm giá (%)"
                  name="percent"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Giảm giá (%)!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, percent: value })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số lượng"
                  name="quantity"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng!" },
                  ]}
                >
                  <InputNumber
                    min={0}
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, quantity: value })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Form.Item
              label="Loại"
              name="type"
              rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
            >
              <Select
                value={stateVoucher.type}
                onChange={(value) =>
                  setStateVoucher({ ...stateVoucher, type: value })
                }
              >
                <Select.Option value={1}>Dành cho sản phẩm</Select.Option>
                <Select.Option value={2}>Dành cho phí ship</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Chi tiết"
              name="description"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả chi tiết!" },
              ]}
            >
              <Input onChange={handleOnchange} name="description" />
            </Form.Item>
            <Form.Item label="Ngày bắt đầu" name="fromDate">
              <Input type="date" onChange={handleOnchange} name="fromDate" />
            </Form.Item>
            <Form.Item label="Ngày kết thúc" name="toDate">
              <Input type="date" onChange={handleOnchange} name="toDate" />
            </Form.Item>
          </Form>
        </ModalComponent>
        <DrawerComponent
          title="Chỉnh sửa Voucher"
          width="30%"
          onClose={() => {
            setIsDrawerOpen(false);
            setStateVoucher(initialVoucher);
            form.resetFields();
          }}
          open={isDrawerOpen}
        >
          <Form
            form={form}
            initialValues={stateVoucher}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Mã Voucher"
              name="code"
              rules={[{ required: true, message: "Vui lòng nhập mã voucher!" }]}
            >
              <Input name="code" onChange={handleOnchange} />
            </Form.Item>
            <Form.Item
              label="Tên Voucher"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên voucher!" },
              ]}
            >
              <Input name="name" onChange={handleOnchange} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Giá đơn hàng tối thiểu"
                  name="minPriceOrder"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Giá đơn hàng tối thiểu!",
                    },
                  ]}
                >
                  <InputNumber
                    name="minPriceOrder"
                    min={0}
                    step={5000}
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, minPriceOrder: value })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giá giảm tối đa"
                  name="maxPrice"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá giảm tối đa!",
                    },
                  ]}
                >
                  <InputNumber
                    name="maxPrice"
                    min={0}
                    step={5000}
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, maxPrice: value })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Giảm giá (%)"
                  name="percent"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Giảm giá (%)!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    name="percent"
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, percent: value })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số lượng"
                  name="quantity"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng!" },
                  ]}
                >
                  <InputNumber
                    name="quantity"
                    min={0}
                    max={100}
                    onChange={(value) =>
                      setStateVoucher({ ...stateVoucher, quantity: value })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Loại"
              name="type"
              rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
            >
              <Select
                value={stateVoucher.type}
                onChange={(value) =>
                  setStateVoucher({ ...stateVoucher, type: value })
                }
              >
                <Select.Option value={1}>Dành cho sản phẩm</Select.Option>
                <Select.Option value={2}>Dành cho phí ship</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Chi tiết"
              name="description"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả chi tiết!" },
              ]}
            >
              <Input name="description" onChange={handleOnchange} />
            </Form.Item>
            <Form.Item label="Ngày bắt đầu" name="fromDate">
              <div>
                <Input
                  type="date"
                  value={
                    new Date(stateVoucher.fromDate).toISOString().split("T")[0]
                  }
                  onChange={handleOnchange}
                  name="fromDate"
                />
              </div>
            </Form.Item>
            <Form.Item label="Ngày kết thúc" name="toDate">
              <div>
                <Input
                  type="date"
                  value={
                    new Date(stateVoucher.toDate).toISOString().split("T")[0]
                  }
                  onChange={handleOnchange}
                  name="toDate"
                />
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </DrawerComponent>
        <ModalComponent
          title="Xóa sản phẩm"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteVoucher}
        >
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </ModalComponent>
      </div>
    </div>
  );
};

export default AdminVoucher;
