import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function HotelListing({ hotelsList, dataToParent }) {
    const transmitHotel = (hotel) => {
        dataToParent(hotel);
    };

    return (
        <div className="hotel-list-container">
            <div className="hotel-list-container__legend">
                <p>Name</p>
                <p>Location</p>
                <p>Edit</p>
            </div>
            {Array.isArray(hotelsList) ? (
                hotelsList.map((hotel, index) => (
                    <div className="hotel-list-container__item" key={index}>
                        <p>{hotel.name}</p>
                        <p>{hotel.location}</p>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            onClick={() => transmitHotel(hotel)}
                        />
                    </div>
                ))
            ) : (
                <p>No hotels added on the plateform</p>
            )}
        </div>
    );
}

export default HotelListing;
