import axios from 'axios';
import { retrieveToken } from '../cookies/cookies-logic.js';

export const createReservation = async (data) => {
    const token = await retrieveToken();
    try {
        const response = await axios.post(
            'http://localhost:5001/reservations',
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response;
    } catch (error) {
        console.error('Error creating reservation:', error);
    }
};
