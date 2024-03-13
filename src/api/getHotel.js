import axios from 'axios';

export const getHotelInfos = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/hotels/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};
