export const RoomListing = ({ rooms }) => {
    if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
        return <div>Loading hotel information...</div>;
    } else {
        return (
            <div className="room-listing-container">
                {rooms.map((room, index) => (
                    <div className="room-listing-container__item" key={index}>
                        <p>{room.type}</p>
                        <p>{`${room.price}$`}</p>
                    </div>
                ))}
            </div>
        );
    }
};
