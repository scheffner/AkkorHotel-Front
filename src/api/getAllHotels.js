import axios from 'axios';

export const getAllHotels = async () => {
    try {
        const response = await axios.get('http://localhost:5001/hotels/findAll');
        return response.data;
    } catch (error) {
        console.log('Error ' + error);
    }
};
