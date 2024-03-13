import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UpdateHotel } from '../../api/updateHotel.js';
import { CreateHotel } from '../../api/createHotel.js';

export const FormHotel = ({ hotelData, closeWindow, role }) => {
    const [updatedData, setupdatedData] = useState(
        hotelData
            ? hotelData
            : { name: '', location: '', description: '', images: [] }
    );
    const [files, setFiles] = useState([]);

    const handleUpdateSubmit = async () => {
        UpdateHotel(updatedData, hotelData._id);
        closeWindow();
    };
    const handleCreateSubmit = async () => {
        const formData = new FormData();

        for (const file of files) {
            formData.append('images', file);
        }

        formData.append('hotelData', JSON.stringify(updatedData));

        CreateHotel(formData);
        closeWindow();
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFiles((prevImages) => [...prevImages, ...files]);
    };

    const handleDeleteImage = (index) => {
        setFiles((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    return (
        <div className="update-form-container">
            <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ position: 'absolute', top: 'O', left: '3rem' }}
                onClick={closeWindow}
            />
            {role === 'Update' ? (
                <h2>The {hotelData.name}</h2>
            ) : (
                <h2>Publish an hotel</h2>
            )}

            <div className="update-form-container__inputs">
                <label>Hotel name</label>
                <input
                    type="text"
                    required
                    value={updatedData.name}
                    onChange={(e) =>
                        setupdatedData({ ...updatedData, name: e.target.value })
                    }
                />
                <label>Location</label>
                <input
                    type="text"
                    required
                    value={updatedData.location}
                    onChange={(e) =>
                        setupdatedData({ ...updatedData, location: e.target.value })
                    }
                />
                <label>Description</label>
                <textarea
                    type="text"
                    required
                    value={updatedData.description}
                    onChange={(e) =>
                        setupdatedData({ ...updatedData, description: e.target.value })
                    }
                />
                <label>Images</label>
                <input
                    className="images-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                />
                <div className="uploaded-images">
                    {role === 'Update'
                        ? hotelData.images.map(
                            (image, index) => (
                                console.log(image),
                                (
                                    <div key={index} className="image-container">
                                        <img
                                            src={`http://localhost:3001/images/${image}`}
                                            alt={`Image ${index}`}
                                        />
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className="image-container__delete"
                                            onClick={() => handleDeleteImage(index)}
                                            style={{ color: '#ff5e6c' }}
                                        />
                                    </div>
                                )
                            )
                        )
                        : files.map((image, index) => (
                            <div key={index} className="image-container">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Image ${index}`}
                                />
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="image-container__delete"
                                    onClick={() => handleDeleteImage(index)}
                                    style={{ color: '#ff5e6c' }}
                                />
                            </div>
                        ))}
                </div>
            </div>
            {}
            <button
                onClick={role === 'Update' ? handleUpdateSubmit : handleCreateSubmit}
            >
                {role}
            </button>
        </div>
    );
};
