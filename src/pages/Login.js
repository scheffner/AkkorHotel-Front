import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { loginCall } from '../api/login-call.js';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const response = await loginCall(userData);
        if (response.message === 'Request failed with status code 401') {
            document.querySelector('.error-message').innerHTML =
                'Invalid username or password';
        } else {
            navigate('/');
        }
    };
    return (
        <div className="full-page-container">
            <div className="register-container">
                <Link to="/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <h1>Login</h1>
                <div className="error-message"></div><br/>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    required
                    placeholder="Username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    required
                    placeholder="Password"
                    onChange={handleChange}
                />
                <div className="register-container__actions">
                    <button onClick={handleSubmit}>Log in</button>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
