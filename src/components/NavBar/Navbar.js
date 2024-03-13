import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { deleteCookie, retrieveCookie } from '../../cookies/cookies-logic.js';
import { useNavigate } from 'react-router-dom';
import ProfilePage from '../../pages/ProfilePage.js';

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    if (
        location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/admin-center'
    ) {
        return null;
    }

    const userInfos = retrieveCookie('userInfos');

    const handleDisconnect = () => {
        deleteCookie('userInfos');
        deleteCookie('Token');
        navigate('/');
    };

    return (
        <div className="navbar-container">
            <h2>Akkor Hotels</h2>
            {userInfos ? (
                <div className="navbar-container__actions">
                    <Link to={`/profile/${userInfos.id}`} element={<ProfilePage />}>
                        <FontAwesomeIcon icon={faUser} style={{ color: '#ff5e6c' }} />
                    </Link>
                    <button onClick={handleDisconnect}>Disconnect</button>
                    {userInfos.role === 'admin' && (
                        <button>
                            <Link style={{ color: 'white' }} to="/admin-center">
                Admin Center
                            </Link>
                        </button>
                    )}
                </div>
            ) : (
                <div className="navbar-container__actions">
                    <Link to="/register">Register</Link>
                    <button>
                        <Link to="/login">Sign In</Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default NavBar;
