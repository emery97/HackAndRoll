import axios from 'axios';

const getClothing = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/get-clothes');

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to get clothing item.');
  }
};

export default getClothing;
