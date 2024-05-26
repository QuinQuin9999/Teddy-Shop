import {
  Button,
  Col,
  Input,
  Radio,
  Row,
  Select,
  Space,
  message
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/LoadingComponent/Loading";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { toSlug } from "../../../utils";
import * as UserService from "../../../services/UserService";
import { addShippingAddressUser, saveTempShipAddr, saveTempShipAddrNone } from "../../../redux/slices/userSlice";


export const ShippingAddress = (props) => {
  const stateUserDetails = props.stateUserDetails;
  const handleOnchangeDetails = props.handleOnchangeDetails;
  const form = props.form;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpenAddAddress, setIsOpenAddAddress] = useState(false);
  const handleAdd = () => {
    setIsOpenAddAddress(true);
  };
  const onChange = (e) => {
    console.log("radio address checked: ", e.target.value);
    setValue(e.target.value);
  };
  const handleCloseAddAddress = () => {
    setIsOpenAddAddress(false);
  };
  return (
    <ModalComponent //cap nhat thong tin giao hang
      title={props?.title}
      open={props?.open}
      onCancel={props?.onCancel}
      footer={[
        <Button key="close" loading={loading} onClick={props?.onCancel}>
          Đóng
        </Button>,
        <Button
          key="select"
          type="primary"
          loading={loading}
          onClick={() => {
            dispatch(saveTempShipAddr(value))
            props?.onOk(value)}
          }
        >
          Chọn
        </Button>,
        <Button
          key="add"
          type="primary"
          loading={loading}
          onClick={handleAdd}
        >
          Thêm
        </Button>,
      ]}
    >
      <Loading isLoading={props.isLoading}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
          {user?.shippingAddress?.map((item, index) => (
              <ShippingAddressItem
                key={index}
                item={item}
                value={value}
                index={index}
              ></ShippingAddressItem>
            ))}
          </Space>
        </Radio.Group>
      </Loading>
      <AddShippingAddress
        title={"Thêm địa chỉ giao hàng"}
        isOpenAddAddress={isOpenAddAddress}
        setIsOpenAddAddress={setIsOpenAddAddress}
      ></AddShippingAddress>
    </ModalComponent>
  );
};

const ShippingAddressItem = ({item, value, index}) => {
  return (
    <div
      style={{
        height: "fit-content",
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #77bfff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "8px",
        margin: "12px 0px",
        backgroundColor: value === index ? "#b2dbff" : "transparent",
      }}
    >
      <Radio value={index}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <span style={{ fontWeight: "700" }}>{item?.addressName}</span> -{" "}
            {item?.addressPhone}
          </div>
          <div style={{ color: "#444" }}>
            {item?.addressNumber}, {item?.addressWard}, {item?.addressDistrict},{" "}
            {item?.addressProvince}
          </div>
        </div>
      </Radio>
    </div>
  );
};
export const AddShippingAddress = (props) => {
  const user = useSelector((state) => state?.user)
  const dispatch = useDispatch()
  const [addressName, setAddressName] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [addressAddress, setAddressAddress] = useState("");
  const [provincesData, setProvincesData] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(-1);
  const [districtsData, setDistrictsData] = useState([]);
  const [districtsSelected, setDistrictsSelected] = useState(-1);
  const [wardsData, setWardsData] = useState([]);
  const [wardSelected, setWardSelected] = useState(-1);
  const fetchProvinceInfo = async () => {
    const res = await axios.get("https://vapi.vnappmob.com/api/province/");
    return res;
  };
  const fetchDistrictInfo = async (id) => {
    const res = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${id}`
    );
    return res;
  };
  const fetchWardInfo = async (id) => {
    const res = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${id}`
    );
    return res;
  };
  useEffect(() => {
    if (props?.isOpenAddAddress) {

      const getProvinceData = async () => {
        const res = await fetchProvinceInfo();
        let temp = [];
        temp.push({
          value: -1,
          slug: "none",
          label: "None",
        });
        console.log(res.data);
        res.data.results.forEach((item) => {
          let t = item;
          let sl = toSlug(item?.province_name);
          temp.push({
            value: t.province_id,
            slug: sl,
            label: t.province_name,
          });
        });
        setProvincesData(temp);
        console.log(temp);
      };
      getProvinceData();
    }
  }, [props?.isOpenAddAddress]);
  useEffect(() => {
    if (provinceSelected != -1) {
      const getDistrictData = async () => {
        const res = await fetchDistrictInfo(provinceSelected);
        let temp = [];
        temp.push({
          value: -1,
          slug: "none",
          label: "None",
        });
        console.log(res.data);
        res.data.results.forEach((item) => {
          let t = item;
          let sl = toSlug(item?.district_name);
          temp.push({
            value: t.district_id,
            slug: sl,
            label: t.district_name,
          });
        });
        setDistrictsData(temp);
        console.log(temp);
      };
      getDistrictData();
    }
  }, [provinceSelected]);
  useEffect(() => {
    if (districtsSelected != -1) {
      const getWardData = async () => {
        const res = await fetchWardInfo(districtsSelected);
        let temp = [];
        temp.push({
          value: -1,
          slug: "none",
          label: "None",
        });
        console.log(res.data);
        res.data.results.forEach((item) => {
          let t = item;
          let sl = toSlug(item?.ward_name);
          temp.push({
            value: t.ward_id,
            slug: sl,
            label: t.ward_name,
          });
        });
        setWardsData(temp);
        console.log(temp);
      };
      getWardData();
    }
  }, [districtsSelected]);
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = () => {};
  const onChangeSelectProvince = (e) => {
    setProvinceSelected(e);
  };
  const onChangeSelectDistrict = (e) => {
    setDistrictsSelected(e);
  };
  const onChangeSelectWard = (e) => {
    setWardSelected(e);
  };
  const handleSendAddress = async () => {
    if (
      !addressName ||
      !addressPhone ||
      provinceSelected == -1 ||
      districtsSelected == -1 ||
      wardSelected == -1 ||
      !addressAddress
    ) {
      message.error("Cần điền đủ thông tin");
    }
    // let check = false;
    // user?.shippingAddress.forEach((item) => {
    //   let b = toSlug(item.addressName);
    //   let c = toSlug(addressName);
    //   if (b == c) {
    //     check = true;
    //     return;
    //   }
    // });
    // if (check && user?.id != '') {
    //   message.error("địa chỉ giao hàng này đã tồn tại");
    //   return;
    // }
    const sa = {
      addressName: addressName,
      addressPhone: addressPhone,
      addressProvince: provincesData.filter(
        (item) => item.value === provinceSelected
      )[0]?.label,
      addressDistrict: districtsData.filter(
        (item) => item.value === districtsSelected
      )[0]?.label,
      addressWard: wardsData.filter((item) => item.value === wardSelected)[0]?.label,
      addressNumber: addressAddress,
    };
    // dispatch(addShippingAddressUser(sa));
    // props?.setShippingAddressNoneUser(sa)
    if (user?.id != '') {
      dispatch(addShippingAddressUser(sa));
      const addShippingUser = await UserService.addShippingAddress(user.id, sa, user.accessToken)
    } else {
      dispatch(saveTempShipAddrNone(sa))
    }
    props?.setIsOpenAddAddress(false);
  }
  return (
    <ModalComponent
      title={props?.title}
      open={props?.isOpenAddAddress}
      onCancel={() => props?.setIsOpenAddAddress(false)}
      onOk={handleSendAddress}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row>
          <Col span={24}>
            <Input
              placeholder="Tên"
              value={addressName}
              onClick={(e) => {setAddressName(e.target.value)}}
              onChange={(e) => {
                setAddressName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={12}>
            <Input
              placeholder="Số điện thoại"
              value={addressPhone}
              onChange={(e) => {
                setAddressPhone(e.target.value);
              }}
            />
          </Col>
          <Col span={12}>
            <Select
              showSearch
              placeholder="Tỉnh"
              optionFilterProp="children"
              onChange={onChangeSelectProvince}
              onSearch={onSearch}
              filterOption={filterOption}
              disabled={false}
              style={{ width: "100%" }}
              options={provincesData}
            />
          </Col>
        </Row>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={12}>
            <Select
              showSearch
              placeholder="Huyện/Thị xã"
              optionFilterProp="children"
              onChange={onChangeSelectDistrict}
              onSearch={onSearch}
              filterOption={filterOption}
              disabled={false}
              style={{ width: "100%" }}
              options={districtsData}
            />
          </Col>
          <Col span={12}>
            <Select
              showSearch
              placeholder="Xã/Phường"
              optionFilterProp="children"
              onChange={onChangeSelectWard}
              onSearch={onSearch}
              filterOption={filterOption}
              disabled={false}
              style={{ width: "100%" }}
              options={wardsData}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Input
              placeholder="Địa chỉ"
              value={addressAddress}
              onChange={(e) => {
                setAddressAddress(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Space>
    </ModalComponent>
  );
};
