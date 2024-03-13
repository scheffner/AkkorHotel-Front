import { useState, useEffect } from 'react';
import { getUserInfos } from '../api/getUserInfos.js';
import { useParams } from 'react-router-dom';
import { UpdateUser } from '../api/updateUser.js';
import { LinkBackIcon } from '../components/LinkBackIcon/LinkBackIcon.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { retrieveUserReservations } from '../api/retrieveUserReservations.js';
import { ReservationCards } from '../components/ReservationCards/ReservationCards.js';

function ProfilePage() {
    const { userId } = useParams();
    const [userData, setUserData] = useState({ createdAt: '' });
    const [reservations, setReservations] = useState([]);

    const handleSubmit = async () => {
        await UpdateUser(userData, userId);
    };
    const fetchData = async () => {
        try {
            const user = await getUserInfos(userId);
            const reservationsData = await retrieveUserReservations();
            setUserData(user);
            setReservations(reservationsData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const reservationsData = await retrieveUserReservations();
            setReservations(reservationsData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const handleChange = async () => {
        fetchReservations();
    };

    useEffect(() => {
        fetchData();
        fetchReservations();
    }, [userId]);

    return (
        <div className="profile-page-container">
            <LinkBackIcon to="/" />
            <div className="profile-page-container__user">
                <div className="profile-page-container__user__heading">
                    <h1>Profile</h1>
                    <span>
                        <FontAwesomeIcon icon={faPenNib} onClick={handleSubmit} />
                    </span>
                </div>
                <h3>Username</h3>
                <input
                    type="text"
                    required
                    value={userData.username}
                    placeholder={userData.username}
                    onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                    }
                />
                <h3>Email</h3>
                <input
                    type="text"
                    required
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <h3>Password</h3>
                <input
                    type="password"
                    required
                    value={userData.password}
                    onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                    }
                />
                <h4>{`User since ${userData.createdAt.substring(0, 10)}`}</h4>
            </div>
            <div className="profilepage-container__actions">
                <h1>Your reservations</h1>
                <ReservationCards
                    reservations={reservations}
                    handleChange={handleChange}
                />
            </div>
        </div>
    );
}

export default ProfilePage;
