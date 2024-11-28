import {
  CheckCircleFilled,
  DeleteOutlined,
  InboxOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Select, Form, message, Radio, Space, Modal, List } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import StepComponent from "../../components/StepConponent/StepComponent";
import VoucherComponent from "../../components/VoucherComponent/VoucherComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import {
  decreaseProductAmount,
  deleteTempChecklist,
  deleteTempOther,
  increaseProductAmount,
  removeCartProduct,
  removeItems,
  saveTempChecklist,
  saveTempOther
} from "../../redux/slices/cartSlice";
import { deleteTempShipAddr, resetUser, saveTempShipAddr, saveTempShipAddrNone } from "../../redux/slices/userSlice";
import * as OrderService from "../../services/OrderService";
import * as UserService from "../../services/UserService";
import { convertPrice } from "../../utils";
import {
  AddShippingAddress,
  ShippingAddress,
} from "./component/ShippingAddress";
import {
  CustomCheckbox,
  WrapperCountOrder,
  WrapperInfo,
  WrapperInputNumber,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperTotal,
} from "./style";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [processState, setProcessState] = useState(0);
  // const [getAtStore, setGetAtStore] = useState(false);
  const [shipAddressIndex, setShipAddressIndex] = useState(-1);
  const [shippingAddressNoneUser, setShippingAddressNoneUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [shipmentMethod, setShipmentMethod] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isOpenInputShipment, setIsOpenInputShipment] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()
  const [bank, setBank] = useState('NCB')
  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVoucher1, setSelectedVoucher1] = useState(null);
  const [selectedVoucher2, setSelectedVoucher2] = useState(null);

  const handleVoucher1Change = (e) => {
    // console.log(selectedVoucher)
    const selected1 = vouchers.find(voucher => voucher._id === e.target.value);
    setSelectedVoucher1(selected1);
  };

  const handleVoucher2Change = (e) => {
    console.log("Hi")
    const selected2 = vouchers.find(voucher => voucher._id === e.target.value);
    setSelectedVoucher2(selected2);
  };

  const resetVoucher = () => {
    setSelectedVoucher1(null)
    setSelectedVoucher2(null)
  }

  // const [shipAddress, setShipAddress] = useState(user?.shippingAddress[user?.tempShipAddr])
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

  const showVoucherList = async () => {
    fetchVouchers();
    setIsVoucherModalVisible(true)
  }
  const closeVoucherModal = () => {
    // setSelectedVoucher(null);
    setIsVoucherModalVisible(false);
  };

  const mutationAddOrder = useMutationHook((data) => {
    console.log("data from mutation order: ", data)
    // const { id, ...rest } = data;
    const res = OrderService.createOrder(user.id === ''? ('000000000000000000000000'): (user.id), data);
    return res;
  });

  const onChange = (e) => {
    console.log("checked: ", e.target.checked, " - ", e.target.value)
    if (e.target.checked) {
      setListChecked([...listChecked, e.target.value]);
    } else {
      let temp = listChecked.filter((item) => item != e.target.value);
      setListChecked(temp);
    }
  };
  // console.log("list checked: ", listChecked)
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseProductAmount({ idProduct }));
      }
    }
    if (type == "decrease") {
      if (!limited) {
        dispatch(decreaseProductAmount({ idProduct }));
      }
    }
  };
  const delay = async (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeCartProduct({ idProduct }));
    setListChecked(listChecked.filter((item) => item != idProduct))
  };
  const handleRemoveAllOrder = () => {
    dispatch(removeCartProduct({ idProduct: -1 }));
    setListChecked([]);
  };
  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      let temp = [];
      cart?.orderItems.forEach((item) => temp.push(item?.id));
      setListChecked(temp);
    } else {
      setListChecked([]);
    }
  };
  const onShipmentMethodChange = (e) => {
    console.log("radio ship checked", e.target.value);
    setShipmentMethod(e.target.value);
    // if (e.target.value == 4) {
    //   setGetAtStore(true);
    // } else {
    //   setGetAtStore(false);
    // }
  };
  const onPaymentMethodChange = (e) => {
    console.log("radio pay checked", e.target.value);
    setPaymentMethod(e.target.value);
  };
  const onBankChange = (value) => {
    setBank(value)
  }
  useEffect(() => {
    if (orderSuccess) {
      const a = async () => {
        await delay(5000);
        // dispatch(removeItems(listChecked));
        setListChecked([]);
        setProcessState(0);
        setOrderSuccess(false);
      };
      a();
    }
  }, [orderSuccess]);
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    let params = new URL(document.location.toString()).searchParams;
    console.log("cart", cart);
    console.log("user", user);
    console.log("queryParameters: ",queryParameters.get("vnp_ResponseCode"))
    console.log("useSearchParms: ",searchParams.get("vnp_ResponseCode"))
    console.log("Parms: ",params.toString())
    if(queryParameters.get("vnp_ResponseCode") == '00'){
      console.log("create order after payment");
      createOrder(true);
    }
  }, [])
  useEffect(() => {
    // dispatch(selectedOrder({listChecked}))
  }, [listChecked]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      console.log(user.username);
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    if (user?.id) {
      setIsOpenModalUpdateInfo(true);
    } else {
      setIsOpenInputShipment(true);
    }
  };

  const priceMemo = useMemo(() => {
    const result = cart.orderItems.reduce((total, cur) => {
      //console.log("cur: ", cur)
      if (listChecked.includes(cur.id)) {
        return total + cur.price * cur.amount;
      }
      return total;
    }, 0);
    //console.log("result: ", result)
    if (!result) return 0;
    return result;
  }, [cart, listChecked]);

  const priceDiscountMemo = useMemo(() => {
    //console.log("use memo reduce: ", cart?.orderItems);
    const result = cart?.orderItems.reduce((total, cur) => {
      //console.log("check condition: ", listChecked.includes(cur?.id));
      if (listChecked.includes(cur?.id)) {
        return total + (cur?.price * cur?.amount * cur?.discount) / 100;
      }
      return total
    }, 0);
    if (!result) return 0;
    return result;
  }, [cart, listChecked]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 1000000 || listChecked.length === 0) {
      return 0;
    } else if (priceMemo > 500000) {
      return 12000;
    } else {
      return 30000;
    }
  }, [priceMemo, listChecked]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

  const shipDiscount = useMemo(() => {
    if (!selectedVoucher2) return 0;
    const discount = (deliveryPriceMemo * selectedVoucher2.percent) / 100;
    return Math.min(discount, selectedVoucher2.maxPrice);
  }, [selectedVoucher2, deliveryPriceMemo]);
  
  const productDiscount = useMemo(() => {
    if (!selectedVoucher1) return 0;
    const discount = (totalPriceMemo * selectedVoucher1.percent) / 100;
    return Math.min(discount, selectedVoucher1.maxPrice);
  }, [selectedVoucher1, totalPriceMemo]);

  const totalPriceOrder = useMemo(() => {
    return Number(totalPriceMemo) - Number(shipDiscount) - Number(productDiscount)
  }, [totalPriceMemo, shipDiscount, productDiscount])

  // const fetchPay = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/payment/create_payment_url`,{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body:JSON.stringify({
  //         "amount": totalPriceMemo,
  //         "bankCode": "VNBANK",
  //         "orderDescription": "Thanh toán đơn hàng",
  //         "orderType": "other", 
  //         "language": "vn",
  //       }),
  //   });
  //     const data = await response.json()
  //     return data.redirectLink;
  //   } catch (error) {
  //     console.error('Error call vnpay api:', error);
  //   }
  // };
  const fetchPay = async (bankCode) => {
    try {
      const response = await fetch(`http://localhost:8083/api/vnpay/create_payment?amount=${totalPriceOrder}&bankCode=${bankCode}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    });
      const data = await response.json()
      // return data.redirectLink;
      return data.data;
    } catch (error) {
      console.error('Error call vnpay api:', error);
    }
  };

  const checkAndCreateOrder = async () => {
    if(paymentMethod == 2){
      console.log("pay through vnpay");
      setIsPaying(true);
      let link = await fetchPay(bank);
      console.log("redirect link: ", link);
      window.open(link, "_self");
      return
    }
    console.log("create order without payment vnpay")
    createOrder(false);
  };
  const createOrder = async (isPaid) => {
    if (selectedVoucher1 !== null) {
      let newSelectedVoucher1 = {...selectedVoucher1, quantity: selectedVoucher1.quantity - 1};
      const updateVoucher1 = await axios.put(`http://localhost:8083/api/v1/voucher/update/${selectedVoucher1._id}`, newSelectedVoucher1);
    }
    if (selectedVoucher2 !== null) {
      let newSelectedVoucher2 = {...selectedVoucher2, quantity: selectedVoucher2.quantity - 1};
      const updateVoucher2 = await axios.put(`http://localhost:8083/api/v1/voucher/update/${selectedVoucher2._id}`, newSelectedVoucher2);
    }
    const savedListCheck = cart?.tempChecklist;
    console.log("after get from saved ship address: ", user?.tempShipAddr, "  -  ", shipAddressIndex)    
    console.log("saved temp other: ", cart?.tempOther.paymentMethod ,"  -  ", cart?.tempOther.shipmentMethod,"  -  ", cart?.tempOther.priceMemo,"  -  ", cart?.tempOther.deliveryPriceMemo,"  -  ", cart?.tempOther.totalPriceOrder);
    if (
      user?.accessToken &&
      cart?.orderItems.filter((item) => savedListCheck.includes(item.id))
    ) {
      if (user?.shippingAddress.length > 0) {

        console.log("check pass(with user) ");

        const addr = user?.shippingAddress[user?.tempShipAddr];
        console.log("user?.tempShipAddr  ", user?.tempShipAddr)
        console.log("shippingAddress: ", user?.shippingAddress)
        console.log("selected address: ", addr)
        mutationAddOrder.mutate(
          {
            // orderItems: cart?.orderItems.filter((item) =>
            //   listChecked.includes(item.id)
            // ),
            orderItems: cart?.orderItems.filter((item) =>
              cart?.tempChecklist.includes(item.id)
            ),
            fullName: addr.addressName,
            address: addr.addressNumber + ", " + addr.addressWard + ", " + addr.addressDistrict + ", " + addr.addressProvince,
            phone: addr.addressPhone,
            // city: user?.city,
            paymentMethod:
              // paymentMethod == 1 ? "COD" : "Vnpay",
              cart?.tempOther.paymentMethod == 1 ? "COD" : "Vnpay",
            shipmentMethod:
              // shipmentMethod == 1
              //   ? "standard"
              //   : shipmentMethod == 2
              //   ? "fast"
              //   : shipmentMethod == 3
              //   ? "inTPHCM"
              //   : "store",
              cart?.tempOther.shipmentMethod == 1
                ? "standard"
                : cart?.tempOther.shipmentMethod == 2
                ? "fast"
                : "inTPHCM",
            // itemsPrice: priceMemo,
            // shippingPrice: deliveryPriceMemo,
            // totalPrice: totalPriceMemo,
            itemsPrice: cart?.tempOther.priceMemo,
            shippingPrice: cart?.tempOther.deliveryPriceMemo,
            totalPrice: cart?.tempOther.totalPriceOrder,
            isPaid: isPaid,
          },
          {
            onSuccess: (data) => {
              setOrderSuccess(true);
              setProcessState(2);
              setIsPaying(false);
              setShipAddressIndex(-1);
              dispatch(removeItems(cart?.tempChecklist))
              dispatch(deleteTempChecklist());
              dispatch(deleteTempOther());
              dispatch(deleteTempShipAddr());
              navigate('/cart')
      
            },
          }
        );
      } else {
        message.error("Vui lòng cung cấp địa chỉ giao hàng")
      }
    } else if (!user?.id) {
      console.log("check pass(without user) ");
      const noUserAddress = user?.tempShipAddrNone
      console.log("noUserAddress ", noUserAddress)
      mutationAddOrder.mutate(
        {
          // orderItems: cart?.orderItems.filter((item) =>
          //   listChecked.includes(item.id)
          // ),
          // fullName: noUserAddress.addressName,
          // address: noUserAddress.addressNumber + ", " + noUserAddress.addressWard + ", " + noUserAddress.addressDistrict + ", " + noUserAddress.addressProvince,
          // phone: noUserAddress.addressPhone,
          // paymentMethod:
          //   paymentMethod == 1 ? "COD" : "Vnpay",
          // shipmentMethod:
          //   shipmentMethod == 1
          //     ? "standard"
          //     : shipmentMethod == 2
          //     ? "fast"
          //     : shipmentMethod == 3
          //     ? "inTPHCM"
          //     : "store",
          // itemsPrice: priceMemo,
          // shippingPrice: deliveryPriceMemo,
          // totalPrice: totalPriceMemo,
          // isPaid: isPaid,

          orderItems: cart?.orderItems.filter((item) =>
            cart?.tempChecklist.includes(item.id)
          ),
          fullName: noUserAddress.addressName,
          address: noUserAddress.addressNumber + ", " + noUserAddress.addressWard + ", " + noUserAddress.addressDistrict + ", " + noUserAddress.addressProvince,
          phone: noUserAddress.addressPhone,
          paymentMethod:
            cart?.tempOther.paymentMethod == 1 ? "COD" : "Vnpay",
          shipmentMethod:
            cart?.tempOther.shipmentMethod == 1
              ? "standard"
              : cart?.tempOther.shipmentMethod == 2
              ? "fast"
              : "inTPHCM",
          itemsPrice: cart?.tempOther.priceMemo,
          shippingPrice: cart?.tempOther.deliveryPriceMemo,
          totalPrice: cart?.tempOther.totalPriceOrder,
          isPaid: isPaid,
        },
        {
          onSuccess: (data) => {
            setOrderSuccess(true);
            setProcessState(2);
            setIsPaying(false);
            dispatch(removeItems(cart?.tempChecklist))
            dispatch(resetUser());
            dispatch(deleteTempChecklist());
            dispatch(deleteTempOther());
            dispatch(deleteTempShipAddr());
            navigate('/cart')
          },
        }
      );
      
    } else message.error("Vui lòng điền đầy đủ thông tin");
  }
  const handleAddCard = () => {
    if (listChecked.length == 0) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (processState == 1) {
      console.log("state: ",user?.id," - ",shipmentMethod," - ",shipAddressIndex);
      dispatch(saveTempChecklist(listChecked));
      // dispatch(saveTempShipAddr(shipAddress));
      dispatch(saveTempOther({paymentMethod, shipmentMethod, priceMemo, deliveryPriceMemo, totalPriceOrder}));

      if (user?.id === '') {
        // khong co user
        
        // if (shipmentMethod != 4) {
        //   if (user?.tempShipAddrNone) {
        //     checkAndCreateOrder();
        //   }
        //   else {
        //     setIsOpenInputShipment(true);
        //   }
        // } else {
        //   checkAndCreateOrder();
        // }
        if (user?.tempShipAddrNone) {
          checkAndCreateOrder();
        }
        else {
          setIsOpenInputShipment(true);
        }
      } else {
        // if (shipmentMethod != 4) {
        //   if (shipAddressIndex == -1) setIsOpenModalUpdateInfo(true);
        //   else checkAndCreateOrder();
        // } else {
        //   checkAndCreateOrder();
        // }
        if (shipAddressIndex == -1) setIsOpenModalUpdateInfo(true);
        else checkAndCreateOrder();
      }
    } else {
      setProcessState(1);
    }
  };

  const onBack = () => {
    setProcessState(0);
  };

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading = false, data } = mutationUpdate;

  const handleUpdateShipAddress = (val) => {
    console.log("index ship selected: ", val);
    setShipAddressIndex(val);
    setIsOpenModalUpdateInfo(false);
  };

  const itemsDelivery = [
    {
      title: "Giỏ hàng",
    },
    {
      title: "Thanh toán",
    },
  ];

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div
        style={{
          height: "100%",
          width: "1270px",
          margin: "0 auto",
          padding: "16px 0px",
        }}
      >
        <h3 style={{ fontWeight: "bold", margin: "16px 0px" }}>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <StepComponent items={itemsDelivery} current={processState} />
            </WrapperStyleHeaderDelivery>
            {processState == 0 ? (
              <>
                <WrapperStyleHeader>
                  <span style={{ display: "inline-block", width: "390px" }}>
                    <CustomCheckbox
                      onChange={handleOnchangeCheckAll}
                      checked={listChecked?.length === cart?.orderItems?.length}
                    ></CustomCheckbox>
                    <span> Tất cả ({cart?.orderItems?.length} sản phẩm)</span>
                  </span>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                    <DeleteOutlined
                      style={{ cursor: "pointer" }}
                      onClick={handleRemoveAllOrder}
                    />
                  </div>
                </WrapperStyleHeader>
                <WrapperListOrder>
                  {cart?.orderItems?.length === 0 ? (
                    <div
                      style={{
                        width: "100%",
                        height: "fit-content",
                        padding: "60px 60px",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "24px",
                      }}
                    >
                      <InboxOutlined
                        style={{
                          fontSize: "100px",
                          fontWeight: "400",
                          color: "#aaa",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "500",
                          color: "#aaa",
                        }}
                      >
                        Chưa có sản phẩm trong giỏ hàng
                      </span>
                    </div>
                  ) : (
                    <>
                      {cart?.orderItems?.map((order) => {
                        return (
                          <WrapperItemOrder key={order?.id}>
                            <div
                              style={{
                                width: "390px",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <CustomCheckbox
                                onChange={onChange}
                                value={order?.id}
                                checked={listChecked.includes(order?.id)}
                              ></CustomCheckbox>
                              <img
                                src={order?.productImg}
                                style={{
                                  width: "77px",
                                  height: "79px",
                                  objectFit: "cover",
                                }}
                              />
                              <div
                                style={{
                                  width: 260,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {order?.productName}
                              </div>
                            </div>
                            <div
                              style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>
                                <span
                                  style={{ fontSize: "13px", color: "#242424" }}
                                >
                                  {convertPrice(order?.price)}
                                </span>
                              </span>
                              <WrapperCountOrder>
                                <button
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleChangeCount(
                                      "decrease",
                                      order?.id,
                                      order?.amount === 1
                                    )
                                  }
                                >
                                  <MinusOutlined
                                    style={{ color: "#000", fontSize: "10px" }}
                                  />
                                </button>
                                <WrapperInputNumber
                                  defaultValue={order?.amount}
                                  value={order?.amount}
                                  size="small"
                                  min={1}
                                  max={order?.countInstock}
                                />
                                <button
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleChangeCount(
                                      "increase",
                                      order?.id,
                                      order?.amount === order.countInstock,
                                      order?.amount === 1
                                    )
                                  }
                                >
                                  <PlusOutlined
                                    style={{ color: "#000", fontSize: "10px" }}
                                  />
                                </button>
                              </WrapperCountOrder>
                              <span
                                style={{
                                  color: "rgb(255, 66, 78)",
                                  fontSize: "13px",
                                  fontWeight: 500,
                                }}
                              >
                                {convertPrice(order?.price * order?.amount)}
                              </span>
                              <DeleteOutlined
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDeleteOrder(order?.id)}
                              />
                            </div>
                          </WrapperItemOrder>
                        );
                      })}
                    </>
                  )}
                </WrapperListOrder>
              </>
            ) : processState === 1 ? (
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  padding: "24px 16px",
                  background: "#fff",
                }}
              >
                <WrapperInfo>Lựa chọn phương thức giao hàng</WrapperInfo>
                <Radio.Group
                  onChange={onShipmentMethodChange}
                  value={shipmentMethod}
                  defaultValue={1}
                >
                  <Space direction="vertical">
                    <Radio value={1}>Giao hàng tiêu chuẩn</Radio>
                    <Radio value={2}>Giao hàng nhanh</Radio>
                    <Radio value={3}>Ship now (Nội ô TP.HCM)</Radio>
                    {/* <Radio value={4}>Nhận tại cửa hàng</Radio> */}
                  </Space>
                </Radio.Group>
                <WrapperInfo>Lựa chọn phương thức thanh toán</WrapperInfo>
                <Radio.Group
                  onChange={onPaymentMethodChange}
                  value={paymentMethod}
                  defaultValue={1}
                >
                  <Space direction="vertical">
                    <Radio value={1}>Thanh toán COD</Radio>
                    {/* <Radio value={2}>Thanh toán qua ngân hàng</Radio> */}
                    <Radio value={2}>Thanh toán qua VNPay</Radio>
                    {
                      paymentMethod === 2 && (
                        <div style={{ display: "flex" }}>
                          <Button style={{ width: 200, border:"none" }}>Ngân hàng thanh toán: </Button>
                          <Select
                            defaultValue="NCB"
                            style={{ width: 500 }}
                            onChange={onBankChange}
                            value={bank}
                            options={[
                              { label: "Ngân hàng Quốc Dân (NCB)", value: "NCB" },
                              { label: "Ngân hàng Nông nghiệp và phát triển nông thôn (AGRIBANK)", value: "Agribank" },
                              { label: "Ngân hàng TMCP Á Châu (ACB)", value: "ACB" },
                              { label: "Ngân hàng TMCP Bắc Á (BACABANK)", value: "BacABank" },
                              { label: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)", value: "BIDV" },
                              { label: "Ngân hàng TMCP Xuất nhập khẩu Việt Nam (EXIMBANK)", value: "Eximbank" },
                              { label: "Ngân hàng TMCP Quân đội (MBBANK)", value: "MBBank" },
                              { label: "Ngân hàng TMCP Nam Á (NAMABANK)", value: "NamABank" },
                              { label: "Ngân hàng TMCP Phương Đông (OCB)", value: "OCB" },
                              { label: "Ngân hàng TNHH MTV Đại Dương (OCEANBANK)", value: "OceanBank" },
                              { label: "Ngân hàng TMCP Đại chúng Việt Nam (PVCOMBANK)", value: "PVcomBank" },
                              { label: "Ngân hàng TMCP Sài Gòn Công thương (SAIGONBANK)", value: "SaigonBank" },
                              { label: "Ngân hàng TMCP Thương tín (SACOMBANK)", value: "Sacombank" },
                              { label: "Ngân hàng TMCP Sài Gòn (SCB)", value: "SCB" },
                              { label: "Ngân hàng TMCP Sài Gòn-Hà Nội (SHB)", value: "SHB" },
                              { label: "Ngân hàng TMCP Đông Nam Á (SEABANK)", value: "SeaBank" },
                              { label: "Ngân hàng TMCP Tiên Phong (TPBANK)", value: "TPBank" },
                              { label: "Ngân hàng TMCP Quốc tế Việt Nam (VIB)", value: "VIB" },
                              { label: "Ngân hàng TMCP Ngoại thương Việt Nam (VIETCOMBANK)", value: "Vietcombank" },
                              { label: "Ngân hàng TMCP Công thương Việt Nam (VIETINBANK)", value: "Vietinbank" },
                              { label: "Ngân hàng Việt Nam Thịnh Vượng (VPBANK)", value: "VPBank" },
                              { label: "Ngân hàng TMCP Kỹ Thương Việt Nam (TECHCOMBANK)", value: "Techcombank" },
                              { label: "Ngân hàng TMCP Hàng Hải Việt Nam (MSB)", value: "MSB" },
                              { label: "Ngân hàng TMCP An Bình (ABBANK)", value: "ABBank" },
                              { label: "Ngân hàng TMCP Đông Á (DONGABANK)", value: "DongABank" }
                            ]}
                          ></Select>
                        </div>
                      )
                    }
                  </Space>
                </Radio.Group>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  padding: "60px 60px",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "48px",
                }}
              >
                <CheckCircleFilled
                  style={{
                    background: "#fff",
                    color: "#5dbb63",
                    fontSize: "100px",
                  }}
                />
                <span style={{ fontSize: "32px", fontWeight: "500" }}>
                  Đặt hàng thành công
                </span>
              </div>
            )}
          </WrapperLeft>
          {processState !==2 && (
              <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    {processState === 0 ? (
                      <></>
                    ) : (
                      <>
                        <span style={{ fontWeight: "bold" }}>
                          {/* {`${user?.address}`}{" "} */}
                          {/* {
                            const address = user?.shippingAddress[user?.tempShipAddr]
                            return `${address.addressNumber}, ${address.addressWard}, ${address.addressDistrict}, ${address.addressProvince},`
                          }{" "} */}
                          {user?.id !== ''? 
                            (user?.shippingAddress[user?.tempShipAddr]?.addressNumber + ", " + user?.shippingAddress[user?.tempShipAddr]?.addressWard + ", " + user?.shippingAddress[user?.tempShipAddr]?.addressDistrict + ", " + user?.shippingAddress[user?.tempShipAddr]?.addressProvince) 
                            : (user?.tempShipAddrNone?.addressNumber + ", " + user?.tempShipAddrNone?.addressWard + ", " + user?.tempShipAddrNone?.addressDistrict + ", " + user?.tempShipAddrNone?.addressProvince)}
                        </span>
                        <span
                          onClick={handleChangeAddress}
                          style={{
                            color: "#9255FD",
                            cursor: "pointer",
                          }}
                        >
                          Thay đổi
                        </span>
                      </>
                    )}
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(deliveryPriceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Giảm giá</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      - {convertPrice(priceDiscountMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <span style={{color: "red"}}>Voucher</span>
                    <Button icon={<PlusOutlined />} danger type="text" onClick={showVoucherList}></Button>
                  </div>
                  <Modal
                    open={isVoucherModalVisible}
                    onCancel={closeVoucherModal}
                    footer={[
                      <Button onClick={resetVoucher}>Đặt lại</Button>,
                      <Button onClick={closeVoucherModal}>Áp dụng</Button>,
                    ]
                    }
                  >
                    <h4>Ưu đãi phí giao hàng</h4>
                    <Radio.Group onChange={handleVoucher2Change} value={selectedVoucher2?._id}>
                      {vouchers.map((voucher) => (
                        voucher.type === 2 
                        &&
                        <Radio disabled={(totalPriceMemo >= voucher.minPriceOrder)? false : true} key={voucher._id} value={voucher._id} >
                          <VoucherComponent voucher={voucher} />
                        </Radio>
                      ))}
                    </Radio.Group>
                    <h4>Ưu đãi sản phẩm</h4>
                    <Radio.Group onChange={handleVoucher1Change} value={selectedVoucher1?._id}>
                      {vouchers.map((voucher) => (
                        voucher.type === 1 
                        &&
                        <Radio disabled={(totalPriceMemo >= voucher.minPriceOrder)? false : true} key={voucher._id} value={voucher._id}>
                          <VoucherComponent voucher={voucher} />
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Modal>
                  <div>
                    {selectedVoucher2 && (
                      <span style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                        float: "right"
                      }}>- {convertPrice(shipDiscount)}</span>
                    )}
                  </div>
                  <br />
                  <div>
                    {selectedVoucher1 && (
                      <span style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                        float: "right"
                      }}>- {convertPrice(productDiscount)}</span>
                    )}
                  </div>
                </WrapperInfo>
                <br />
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(totalPriceOrder)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (Đã bao gồm VAT nếu có)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              {processState == 1 && (
                <ButtonComponent
                  onClick={() => onBack()}
                  size={40}
                  styleButton={{
                    background: "rgb(100, 100, 100)",
                    height: "48px",
                    width: "320px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  textButton={"Trở lại"}
                  styleTextButton={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                ></ButtonComponent>
              )}
              <ButtonComponent
                isLoading = {isPaying}
                onClick={() => handleAddCard()}
                size={40}
                styleButton={{
                  background: "rgb(255, 57, 69)",
                  height: "48px",
                  width: "320px",
                  border: "none",
                  borderRadius: "4px",
                }}
                textButton={processState == 0 ? "Tiếp theo" : "Mua hàng"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
            </WrapperRight>
            )
          }
        </div>
      </div>
      <ShippingAddress
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onOk={handleUpdateShipAddress}
        onCancel={() => setIsOpenModalUpdateInfo(false)}
        isLoading={isLoading}
        form={form}
      />
      <AddShippingAddress
        title={"Thêm địa chỉ giao hàng"}
        isOpenAddAddress={isOpenInputShipment}
        setIsOpenAddAddress={setIsOpenInputShipment}
        setShippingAddressNoneUser={setShippingAddressNoneUser}
      />
    </div>
  );
};
export default CartPage;
