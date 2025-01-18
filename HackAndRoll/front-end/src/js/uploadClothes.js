import axios from 'axios';

const addClothingItem = async ({ id, type, name, color, formal, temperatureRange, lastWorn, imagebase64 }) => {
    const data = new FormData();
    data.append('id', id);
    data.append('type', type);
    data.append('name', name);
    data.append('color', color);
    data.append('formal', formal);
    data.append('temperatureRange', temperatureRange);
    data.append('lastWorn', lastWorn);
    data.append('imagebase64', imagebase64);
  
    try {
      const response = await axios.post('http://localhost:3000/api/clothingitems', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to add clothing item.');
    }
  };
  
  export default addClothingItem;