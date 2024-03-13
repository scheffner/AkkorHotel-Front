import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWifi,
    faClock,
    faSquareParking,
    faBanSmoking,
    faPaw,
    faSolarPanel,
    faSpa,
    faUtensils,
    faMartiniGlass,
    faDumbbell,
    faPersonSwimming,
} from '@fortawesome/free-solid-svg-icons';

export const Characteristic = ({ hotelData }) => {
    const Characteristic_list = [
        {
            icon: faWifi,
            text: 'Wifi',
        },
        {
            icon: faClock,
            text: 'Open 24h/24',
        },
        {
            icon: faSquareParking,
            text: 'Parking',
        },
        {
            icon: faBanSmoking,
            text: 'Non-Smoking Rooms',
        },
        {
            icon: faPaw,
            text: 'Animal Friendly',
        },
        {
            icon: faSolarPanel,
            text: 'Terrace',
        },
        {
            icon: faSpa,
            text: 'Spa and Well-Being Center',
        },
        {
            icon: faUtensils,
            text: 'Restaurant',
        },
        {
            icon: faMartiniGlass,
            text: 'Bar',
        },
        {
            icon: faDumbbell,
            text: 'Gym',
        },
        {
            icon: faPersonSwimming,
            text: 'Swimming Pool',
        },
        {
            icon: faPersonSwimming,
            text: 'Accessible',
        },
    ];

    if (!hotelData || !Array.isArray(hotelData) || hotelData.length === 0) {
        return <div>Loading hotel information...</div>;
    } else {
        return (
            <div className="characteristic-container">
                {Characteristic_list.map((characteristic, index) =>
                    hotelData[index] === true ? (
                        <div className="characteristic-container__item" key={index}>
                            <FontAwesomeIcon icon={characteristic.icon} />
                            <p>{characteristic.text}</p>
                        </div>
                    ) : null
                )}
            </div>
        );
    }
};
