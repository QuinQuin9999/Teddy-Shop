// import { axiosJWT } from "./UserService";
import axios from "axios"

export const createOrder = async(userId, data) => {
  console.log("userId ", userId)
  const res = await axios.post(`http://localhost:8083/api/order/createOrder/${userId}`, data)
  return res.data
}