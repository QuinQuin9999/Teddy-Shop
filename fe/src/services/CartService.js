import axios from "axios"

export const getProduct = async ( data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_CART}?all=true`, data)
  return res.data
}