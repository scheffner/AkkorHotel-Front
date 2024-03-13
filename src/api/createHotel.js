import axios from 'axios';
import { retrieveToken } from '../cookies/cookies-logic.js';

export const CreateHotel = async (formData) => {
    const token = retrieveToken();
    console.log(formData);
    try {
        const response = await axios.post(
            'http://localhost:5001/hotels',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log(response);
    } catch (error) {
        console.log('Error ' + error);
    }
};
