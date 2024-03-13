import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RegisteCall } from '../api/register-call.js';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const response = await RegisteCall(userData);
        if (response.message === 'Request failed with status code 500') {
            document.querySelector('.error-message').innerHTML =
                'Username already exists or invalid email';
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="full-page-container">
            <div className="login-container">
                <Link to="/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <h1>Register</h1>
                <div className="error-message"></div><br/>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                />
                <div className="login-container__actions">
                    <button onClick={handleSubmit}>Register</button>
                    <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
