import axios from 'axios';
import { retrieveToken } from '../cookies/cookies-logic.js';

export const UpdateHotel = (hotelData, id) => {
    const token = retrieveToken();
    try {
        const response = axios.put(
            `http://localhost:5001/hotels/${id}`,
            hotelData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        return console.log('Error ' + error);
    }
};
