import axios from 'axios';
import { retrieveToken } from '../cookies/cookies-logic.js';

export const getAllUsers = async () => {
    const token = retrieveToken();
    try {
        const response = await axios.get('http://localhost:5001/users/findAll', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log('Error ' + error);
    }
};
