import axios from 'axios';
import { retrieveToken } from '../cookies/cookies-logic.js';

export const UpdateUser = async (newUser, id) => {
    console.log(newUser);
    const token = retrieveToken();
    try {
        const response = await axios.put(
            `http://localhost:5001/users/${id}`,
            newUser,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
};
