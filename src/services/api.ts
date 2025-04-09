import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (productId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};
