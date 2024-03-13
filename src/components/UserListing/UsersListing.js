import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function UserListing({ usersList, dataToParent }) {
    const transmitUser = (user) => {
        dataToParent(user);
    };

    return (
        <div className="list-container">
            <div className="list-container__legend">
                <p>Username</p>
                <p>Email</p>
                <p>Role</p>
                <p>Edit</p>
            </div>
            {Array.isArray(usersList) ? (
                usersList.map((user, index) => (
                    <div className="list-container__item" key={index}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            onClick={() => transmitUser(user)}
                        />
                    </div>
                ))
            ) : (
                <p>No users available</p>
            )}
        </div>
    );
}

export default UserListing;
