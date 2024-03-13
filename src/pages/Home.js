import homePageImage from '../public/homePage.png';
import { useState, useEffect } from 'react';
import { getAllHotels } from '../api/getAllHotels.js';
import { Link } from 'react-router-dom';

function Home() {
    const [hotels, setHotels] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const filteredItems = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const fetchData = async () => {
        try {
            const hotels = await getAllHotels();
            console.log(hotels[0]);
            setHotels(hotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    useEffect(() => {
        if (searchInput === '') {
            fetchData();
        } else {
            setHotels(filteredItems);
        }
    }, [searchInput]);

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="home-page-container">
            <img src={homePageImage} alt="homePageImage" />
            <div className="home-page-container__first-section">
                <div className="home-page-container__first-section__subtitle">
                    <h2>Dream</h2>
                    <h2>Search</h2>
                    <h2>Book</h2>
                </div>
                <h1>Akkor Hotels</h1>
                <div className="home-page-container__booking">
                    <div className="home-page-container__booking__container">
                        <input
                            type="text"
                            placeholder="Location"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                        <button>Search</button>
                    </div>
                </div>
            </div>
            <div className="home-page-container__results">
                <div className="home-page-container__results__title">
                    <h2>Our best hotels</h2>
                </div>
                <div className="home-page-container__results__hotels">
                    {hotels.length === 0 ? (
                        <h2>No hotel available yet !</h2>
                    ) : (
                        hotels.map((hotel, index) => {
                            return (
                                <div
                                    key={index}
                                    className="home-page-container__results__hotels__card"
                                >
                                    <h3>{hotel.name}</h3>
                                    <div className="home-page-container__results__hotels__card__image">
                                        <img
                                            src={`http://localhost:3001/images/${hotel.images[0]}`}
                                            alt={`${hotel.name} alt-image`}
                                            to="/hotels"
                                        />
                                    </div>
                                    <Link to={`/hotel/${hotel._id}`}>
                                        <button>See more</button>
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
