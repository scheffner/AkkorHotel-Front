import axios from 'axios';
import Cookies from 'js-cookie';

export const loginCall = async (userData) => {
    try {
        const formDataEncoded = new URLSearchParams();
        formDataEncoded.append('username', userData.username);
        formDataEncoded.append('password', userData.password);

        const response = await axios.post(
            'http://localhost:5001/users/login',
            formDataEncoded,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        const userInfos = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
        };
        Cookies.set('Token', response.data.token, { expires: 7 });
        Cookies.set('userInfos', JSON.stringify(userInfos), {
            expires: 7,
        });
        return 'success';
    } catch (error) {
    // Handle error
        //console.error('Error:', error);
        return error;
    }
};
