import { Link } from 'react-router-dom';
import { cancelReservation } from '../../api/cancelReservation.js';

export const ReservationCards = ({ reservations, handleChange }) => {
    const handleCancel = async (resarvationId) => {
        await cancelReservation(resarvationId);
        handleChange();
    };

    return (
        <div className="reservation-card-container">
            {reservations.map((reservation, index) => (
                <div className="reservation-card-container__card" key={index}>
                    <Link to={`/hotel/${reservation.hotelId}`}>
                        <h4>{reservation.hotelName}</h4>
                    </Link>
                    <div className="reservation-card-container__card__dates">
                        <h4>Arrival: {reservation.checkIn}</h4>
                        <h4>Departure: {reservation.checkOut}</h4>
                    </div>
                    {reservation.rooms.map((room, index) => (
                        <div
                            className="reservation-card-container__card__rooms__item"
                            key={index}
                        >
                            <h4>{`${room.number} ${room.type}`}</h4>
                        </div>
                    ))}
                    <button onClick={() => handleCancel(reservation._id)}>Cancel</button>
                </div>
            ))}
        </div>
    );
};
