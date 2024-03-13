import axios from 'axios';
import { retrieveToken } from '../cookies/cookies-logic.js';

export const retrieveUserReservations = async () => {
    const token = retrieveToken();
    try {
        const response = await axios.get(
            'http://localhost:5001/reservations/reservationsByUser',
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving reservations:', error);
    }
};
