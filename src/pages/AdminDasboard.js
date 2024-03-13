import { useState, useEffect } from 'react';
import { getAllUsers } from '../api/getAllUsers.js';
import UserListing from '../components/UserListing/UsersListing.js';
import { getAllHotels } from '../api/getAllHotels.js';
import HotelListing from '../components/HotelListing/HotelListing.js';
import { FormUpdateUser } from '../components/FormUpdateUser/FormUpdateUser.js';
import { FormHotel } from '../components/FormHotel/FormHotel.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [updateWindow, setUpdateWindow] = useState(false);
    const [createWindow, setCreateWindow] = useState(false);
    const [data, setData] = useState({});
    const [activeFilter, setActiveFilter] = useState(1);
    const [transmitedData, setTransmitedData] = useState({});

    const changeFilters = (index) => {
        setActiveFilter(index === activeFilter ? null : index);
    };

    const dataFromChild = (data) => {
        setTransmitedData(data);
        setUpdateWindow(true);
    };

    const closeWindow = () => {
        setUpdateWindow(false);
        setCreateWindow(false);
    };

    const openCreateWindow = () => {
        setCreateWindow(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getAllUsers();
                const hotels = await getAllHotels();
                const data = {
                    users: users,
                    hotels: hotels,
                };
                setData(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, [updateWindow === false]);

    return (
        <div className="admindashboard-container">
            <Link to="/" className="admindashboard-container__back">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="admindashboard-container__back__icon"
                />
            </Link>
            <h1>Admin Center</h1>
            <div className="admindashboard-container__filters">
                <button onClick={() => openCreateWindow()}>Add hotel</button>
                {createWindow === true ? (
                    <div className="modify-popup">
                        <FormHotel hotelData={{}} closeWindow={closeWindow} role="Create" />
                    </div>
                ) : null}
                <span
                    onClick={() => changeFilters(1)}
                    className={`admindashboard-container__filters__item ${
                        activeFilter === 1 ? 'active' : ''
                    }`}
                >
          Users
                </span>
                <span
                    onClick={() => changeFilters(2)}
                    className={`admindashboard-container__filters__item ${
                        activeFilter === 2 ? 'active' : ''
                    }`}
                >
          Hotels
                </span>
            </div>
            <div>
                {activeFilter === 1 ? (
                    <div>
                        <UserListing usersList={data.users} dataToParent={dataFromChild} />
                        {updateWindow === true ? (
                            <div className="modify-popup">
                                <FormUpdateUser
                                    userData={transmitedData}
                                    closeWindow={closeWindow}
                                />
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div>
                        <HotelListing
                            hotelsList={data.hotels}
                            dataToParent={dataFromChild}
                        />
                        {updateWindow === true ? (
                            <div className="modify-popup">
                                <FormHotel
                                    hotelData={transmitedData}
                                    closeWindow={closeWindow}
                                    role="Update"
                                />
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
export default AdminDashboard;
