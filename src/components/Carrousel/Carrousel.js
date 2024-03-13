import { useState } from 'react';

export const Carousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className="carousel">
            <button
                onClick={prevSlide}
                className="carousel__btn carousel__btn--prev"
            ></button>
            <img
                src={`http://localhost:3001/images/${images[activeIndex]}`}
                alt={`Slide ${activeIndex}`}
                className="carousel__img"
            />
            <button
                onClick={nextSlide}
                className="carousel__btn carousel__btn--next"
            ></button>
        </div>
    );
};