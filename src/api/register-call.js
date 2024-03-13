import axios from 'axios';
import Cookies from 'js-cookie';

export const RegisteCall = async (userData) => {
    try {
        const formDataEncoded = new URLSearchParams();
        formDataEncoded.append('username', userData.username);
        formDataEncoded.append('email', userData.email);
        formDataEncoded.append('password', userData.password);

        const response = await axios.post(
            'http://localhost:5001/users',
            formDataEncoded,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        Cookies.set('token', response.data.user, { expires: 7 });
        return 'success';
    } catch (error) {
        // Si l'email n'est pas valide j'envoie ça depuis le back throw new InternalServerErrorException('Invalid email');
        // Si le username existe déjà j'envoie ça depuis le back throw new BadRequestException('Username already exists');
        // Comment j'envoie l'erreur ici?
        return error;
    }
};
