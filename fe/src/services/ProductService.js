import axios from 'axios';

const BASE_URL = 'http://localhost:8083/api/v1/product';

export const getAllCollections = async () => {
    const response = await axios.get('http://localhost:8083/api/collection/get_all')
    return response.data;
}

export const saveOrUpdate = async (product) => {
    try {
      const response = await axios.post(`${BASE_URL}/saveOrUpdate`, product);
      return response.data;
    } catch (error) {
      console.error("Error saving or updating product:", error);
      throw error;
    }
}

export const listAll = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/listAll`);
      return response.data;
    } catch (error) {
      console.error("Error listing all products:", error);
      throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
}

export const getProductByID = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting product by ID:", error);
      throw error;
    }
}

export const getProductsByType = async (type) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchByType?productType=${type}`);
      return response.data;
    } catch (error) {
      console.error("Error getting products by type:", error);
      throw error;
    }
}

export const getProductsByName = async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchByName?name=${name}`);
      return response.data;
    } catch (error) {
      console.error("Error getting products by name:", error);
      throw error;
    }
}

export const getProductsByPriceRange = async (minPrice, maxPrice) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchByPriceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      return response.data;
    } catch (error) {
      console.error("Error getting products by price range:", error);
      throw error;
    }
}

export const getProductsBySize = async (size) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchBySize?size=${size}`);
      return response.data;
    } catch (error) {
      console.error("Error getting products by size:", error);
      throw error;
    }
}

export const getAllSizes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sizes`);
      return response.data;
    } catch (error) {
      console.error("Error getting all sizes:", error);
      throw error;
    }
}

export const getAllColors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/colors`);
      return response.data;
    } catch (error) {
      console.error("Error getting all colors:", error);
      throw error;
    }
}

export const getAllMaterials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/materials`);
      return response.data;
    } catch (error) {
      console.error("Error getting all materials:", error);
      throw error;
    }
}

export const searchProducts = async (searchParams) => {
    const { productName, minPrice, maxPrice, size, color, material } = searchParams;
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: { productName, minPrice, maxPrice, size, color, material }
      });
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
}
