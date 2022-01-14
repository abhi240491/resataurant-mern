//api to add/create new category of food items and push it to server
import axios from 'axios';
export const createCategory = async (categoryData) => {
    const config = {
        'Content-Type': 'application/json'
    }

    const response = await axios.post('/api/category',categoryData,config);
    return response;
}
//Now we are using api generated in redux folder.

export const getCategories = async () => {
    
   const response = await axios.get('/api/category');
    return response;
}