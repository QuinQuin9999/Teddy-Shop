import axios from "axios"
import * as CartService from './CartService'
export const axiosJWT = axios.create()


export const getDetailsUser = async (id, accessToken) => {
    const res = await axiosJWT.get(`http://localhost:8083/api/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    },)
    return res.data
}

export const getAllUsers = async (accessToken) => {
    const res = await axiosJWT.get(`http://localhost:8083/api/user/getAllUsers`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    },)
    return res.data
}

export const logoutUser = async (id, cartItems) => {
    localStorage.clear();
    const updateCartResponse = await CartService.updateCart(id, cartItems)
    return updateCartResponse.data
}

export const updateUser = async (id, data, accessToken) => {
    console.log("update user service: ", id)
    const res = await axiosJWT.put(`http://localhost:8083/api/user/updateUser/${id}`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const deleteUser = async (id) => {
    const res = await axiosJWT.delete(`http://localhost:8083/api/user/deleteUser/${id}`)
    return res.data
}

export const addShippingAddress = async (id, addData, accessToken) => {
    // console.log("add shipping address service: ", body);
    const res = await axiosJWT.post(`http://localhost:8083/api/user/shipping-address/${id}`,addData,{
        headers: {
            token: `Bearer ${accessToken}`,
        }
    });
    return res.data;
}
export const getShippingAddress = async (id, accessToken) => {
    // console.log("get shipping address serviec: ", body.userId);
    const res = await axiosJWT.get(`http://localhost:8083/api/user/shipping-address/${id}`,{
        headers: {
            token: `Bearer ${accessToken}`,
        }
    });
    return res.data;
}

