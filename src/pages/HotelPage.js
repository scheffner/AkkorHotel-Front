import { useEffect, useRef, useState } from 'react';
import { getHotelInfos } from '../api/getHotel.js';
import { useParams } from 'react-router-dom';
import { Carousel } from '../components/Carrousel/Carrousel.js';
import { Characteristic } from '../components/Characteristic/Characteristic.js';
import { RoomListing } from '../components/RoomListing/RoomListing.js';
import { LinkBackIcon } from '../components/LinkBackIcon/LinkBackIcon.js';
import { createReservation } from '../api/createReservation.js';

function HotelPage() {
    const slideOutDivRef = useRef(null);
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState({ images: [], rooms: [] });
    const [isVisible, setIsVisible] = useState(false);
    const [roomSelections, setRoomSelections] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleRoomSelectionChange = (roomIndex, roomPrice, event) => {
        const selectedNumber = parseInt(event.target.value);
        // Update the room selection
        setRoomSelections((prevSelections) => ({
            ...prevSelections,
            [roomIndex]: selectedNumber,
        }));
    };

    const calculateDifferenceInDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays;
    };

    const handleReservation = async () => {
        let finalObject = {
            hotelId: hotelId,
            hotelName: hotel.name,
            rooms: [],
            price: totalPrice,
            checkIn: startDate,
            checkOut: endDate,
        };
        for (let i = 0; i < hotel.rooms.length; i++) {
            if (roomSelections[i] != 0) {
                finalObject.rooms.push({
                    type: hotel.rooms[i].type,
                    number: roomSelections[i],
                });
            }
        }
        await createReservation(finalObject);
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getHotelInfos(hotelId);
                setHotel(response);
                const initialRoomSelections = response.rooms.reduce(
                    (acc, room, index) => {
                        acc[index] = 0;
                        return acc;
                    },
                    {}
                );
                setRoomSelections(initialRoomSelections);
            } catch (error) {
                console.error('Error fetching hotel:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                slideOutDivRef.current &&
        !slideOutDivRef.current.contains(event.target)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const newTotalPrice = hotel.rooms.reduce((acc, room, index) => {
            return acc + room.price * (roomSelections[index] || 0);
        }, 0);
        setTotalPrice(
            startDate
                ? newTotalPrice * calculateDifferenceInDays(startDate, endDate)
                : newTotalPrice
        );
    }, [roomSelections, hotel.rooms]);

    if (!hotel) {
        return <div>Loading hotel information...</div>;
    } else {
        return (
            <div className="hotel-page-container">
                <div
                    className={`slide-out-div ${isVisible ? 'visible' : ''}`}
                    ref={slideOutDivRef}
                >
                    <div className="slide-out-div__infos">
                        <h3>Arrival</h3>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            required
                        />
                        <h3>Departure</h3>
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            min={startDate}
                            required
                        />
                        <h3>Rooms</h3>
                        {hotel.rooms.map((room, index) => (
                            <div className="slide-out-div__infos__rooms" key={index}>
                                <p>{room.type}</p>
                                <select
                                    id={`number-dd-${index}`}
                                    name="number"
                                    value={roomSelections[index] || 0}
                                    onChange={(e) =>
                                        handleRoomSelectionChange(index, room.price, e)
                                    }
                                >
                                    <option value="0">Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        ))}
                        <div className="slide-out-div__infos__actions">
                            <button onClick={handleReservation}>Confirm</button>
                            <p>Total: {totalPrice}</p>
                        </div>
                    </div>
                </div>
                <LinkBackIcon to="/" />
                <div className="hotel-page-container__infos">
                    <div className="hotel-page-container__infos__heading">
                        <h1>{hotel.name}</h1>
                        <button onClick={toggleVisibility}>Book</button>
                    </div>
                    {hotel.images.length > 1 ? (
                        <Carousel images={hotel.images} />
                    ) : (
                        <img
                            src={`http://localhost:3001/images/${hotel.images[0]}`}
                            alt={`${hotel.name} alt-image`}
                        />
                    )}
                    <div>
                        <Characteristic hotelData={hotel.characteristics} />
                    </div>
                    <div className="hotel-page-container__bottom-section">
                        <div className="hotel-page-container__bottom-section__description">
                            <h2>Description</h2>
                            <h3>{hotel.description}</h3>
                        </div>
                        <div className="hotel-page-container__bottom-section__rooms">
                            <h2>Our Rooms</h2>
                            <RoomListing rooms={hotel.rooms} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default HotelPage;
