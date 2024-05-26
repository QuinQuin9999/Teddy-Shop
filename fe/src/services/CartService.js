import axios from "axios"

export const createCart = async ( userId) => {
  const response = await axios.post(`http://localhost:8083/api/cart/create/${userId}`)
  return response.data
}

export const getCart = async (id) => {
  const response = await axios.get(`http://localhost:8083/api/cart/getCart/${id}`)
  return response.data
}

export const updateCart = async (id, updateData) => {
  const response = await axios.put(`http://localhost:8083/api/cart/update/${id}`, {
    cartItems: updateData
  })
  return response.data
}

