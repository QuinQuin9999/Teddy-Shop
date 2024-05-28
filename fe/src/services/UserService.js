import axios from "axios"
import * as CartService from './CartService'
export const axiosJWT = axios.create()

// export const loginUser = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
//     return res.data
// }

// export const signupUser = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
//     return res.data
// }

export const getDetailsUser = async (id, accessToken) => {
    const res = await axiosJWT.get(`http://localhost:8083/api/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    },)
    return res.data
}

// export const deleteUser = async (id, accessToken, data) => {
//     const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, {
//         headers: {
//             token: `Bearer ${accessToken}`,
//         }
//     },)
//     return res.data
// }

export const getAllUsers = async (accessToken) => {
    const res = await axiosJWT.get(`http://localhost:8083/api/user/getAllUsers`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    },)
    return res.data
}

// export const refreshToken = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
//         withCredentials: true
//     })
//     return res.data
// }

// export const refreshToken = async (refreshToken) => {
//     console.log('refreshToken', refreshToken)
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {} , {
//         headers: {
//             token: `Bearer ${refreshToken}`,
//         }
//     })
//     return res.data
// }

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
// export const deleteManyUser = async (data, accessToken) => {
//     const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
//         headers: {
//             token: `Bearer ${accessToken}`,
//         }
//     })
//     return res.data
// }
