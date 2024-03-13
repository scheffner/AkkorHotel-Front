import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UpdateUser } from '../../api/updateUser.js';

export const FormUpdateUser = ({ userData, closeWindow }) => {
    const [updatedData, setupdatedData] = useState(userData);

    const handleRoleChange = (e) => {
        setupdatedData({ ...updatedData, role: e.target.value });
    };

    const handleSubmit = async () => {
        await UpdateUser(updatedData, userData._id);
        closeWindow();
    };
    return (
        <div className="update-form-container">
            <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ position: 'absolute', top: 'O', left: '3rem' }}
                onClick={closeWindow}
            />
            <div className="update-form-container__inputs">
                <h2>{`${userData.username}'s profile`}</h2>
                <label>Username</label>
                <input
                    type="text"
                    required
                    value={updatedData.username}
                    onChange={(e) =>
                        setupdatedData({ ...updatedData, username: e.target.value })
                    }
                />
                <label>Email</label>
                <input
                    type="text"
                    required
                    value={updatedData.email}
                    onChange={(e) =>
                        setupdatedData({ ...updatedData, email: e.target.value })
                    }
                />
                <div className="update-form-container__inputs__roles">
                    <p>
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={updatedData.role === 'user'}
                            onChange={handleRoleChange}
                        />
            User
                    </p>
                    <p>
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={updatedData.role === 'admin'}
                            onChange={handleRoleChange}
                        />
            Admin
                    </p>
                </div>
            </div>
            <button onClick={handleSubmit}>Modify</button>
        </div>
    );
};
