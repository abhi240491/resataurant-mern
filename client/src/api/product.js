//api to add/create new category of food items and push it to server
import axios from 'axios';
export const createProduct = async (productData) => {
    const response = await axios.post('/api/product',productData);
    return response;
}