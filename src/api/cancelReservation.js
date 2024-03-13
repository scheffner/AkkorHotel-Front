import { retrieveToken } from '../cookies/cookies-logic.js';

import axios from 'axios';

export const cancelReservation = async (reservationId) => {
    const token = await retrieveToken();
    try {
        const response = await axios.delete(
            `http://localhost:5001/reservations/${reservationId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
    } catch (error) {
        console.error('Error cancelling reservation:', error);
    }
};
