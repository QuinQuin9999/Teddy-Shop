import axios from "axios";
import { axiosJWT } from "./UserService";

export const createOrder = async(data, accessToken) => {
  if(accessToken != "none"){
    const res = await axiosJWT.post(`http://localhost:8083/api/OrderDetail/createOrder/${data.user}`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
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