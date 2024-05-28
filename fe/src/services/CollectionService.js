import axios from "axios";

export const getAllCollections = async () => {
    const response = await axios.get('http://localhost:8083/api/collection/get_all')
    return response.data;
}

export const createCollection = async (id, productList) => {
    const response = await axios.post('http://localhost:8083/api/collection/create', {
        id: id,
        productList: productList
    })
    return response.data;
}

export const deleteCollection = async (id) => {
    const response = await axios.delete(`http://localhost:8083/api/collection/delete/${id}`)
    return response.data;
}

export const removeProducts = async (id, updateData) => {
    const response = await axios.put(`http://localhost:8083/api/collection/remove_products/${id}`, updateData)
    return response.data;
}

export const addProducts = async (id, addData) => {
    const response = await axios.put(`http://localhost:8083/api/collection/add_products/${id}`, addData)
    return response.data;
}

// export const reidCollection = async (id, newId) => {
//     const response = await axios.put(`http://localhost:8083/api/collection/reid/${id}`, {
//         newId: newId
//     })
//     return response.data;
// }

export const getById = async (id) => {
    const response = await axios.get(`http://localhost:8083/api/collection/get_by_id/${id}`)
    return response.data;
}