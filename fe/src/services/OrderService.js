import { axiosJWT } from "./UserService";
import axios from "axios"

export const createOrder = async(data, access_token) => {
  if(access_token != "none"){
    const res = await axiosJWT.post(`http://localhost:8083/api/OrderDetail/createOrder/${data.user}`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      }
    });
    console.log("Order service return(with user): ", res.data)
    return res.data
  }
  else{
    const res = await axios.post(`http://localhost:8083/api/OrderDetail/createOrder/${data.user}`, data);
    console.log("Order service return(without user): ", res.data)
    return res.data
  }
}