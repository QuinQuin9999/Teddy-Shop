import axios from "axios"
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

export const getAllUser = async (accessToken) => {
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

export const logoutUser = async () => {
    localStorage.clear();
    //return res.data
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

export const addShippingAddress = async (body) => {
    console.log("add shipping address serviec: ", body);
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/shipping-address`,body,{
        headers: {
            token: `Bearer ${body.accessToken}`,
        }
    });
    return res.data;
}
export const getShippingAddress = async (body) => {
    console.log("get shipping address serviec: ", body.userId);
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/shipping-address`,body.userId,{
        headers: {
            token: `Bearer ${body.accessToken}`,
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
