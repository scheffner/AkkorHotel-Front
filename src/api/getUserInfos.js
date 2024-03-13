import axios from 'axios';
import { retrieveToken } from '../cookies/cookies-logic.js';

export const getUserInfos = async (username) => {
    const token = retrieveToken();
    try {
        const response = await axios.get(
            `http://localhost:5001/users/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
    // Handle error
        console.error('Error:', error);
    }
};
