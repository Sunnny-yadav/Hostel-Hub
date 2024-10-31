import React, { useState, useEffect } from 'react';
import acc1 from '../../assets/Intopage/Accomadations/acc1.png'
import acc2 from '../../assets/Intopage/Accomadations/acc2.png'
import acc3 from '../../assets/Intopage/Accomadations/acc3.png'
import complaint from '../../assets/Intopage/Accomadations/complaint.png'
import boys from '../../assets/Intopage/Accomadations/boys.png'
import girls from '../../assets/Intopage/Accomadations/girls.png'
import groupboys from '../../assets/Intopage/groupboys.png'
import hostelImg from '../../assets/Intopage/hostelImg.png'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { src: hostelImg, alt: 'Slide 0' }, 
    { src: groupboys, alt: 'Slide 1' }, 
    { src: complaint, alt: 'Slide 2' }, 
    { src: boys, alt: 'Slide 3' },
    { src: girls, alt: 'Slide 4' },
    { src: acc1, alt: 'Slide 5' },
    { src: acc2, alt: 'Slide 6' },
    { src: acc3, alt: 'Slide 7' }
  ];
  const totalSlides = slides.length;

  const updateCarousel = (index) => {
    setCurrentIndex(index);
  };

  const showNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % totalSlides);
  };

  const showPrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const intervalId = setInterval(showNextSlide, 3000);
    return () => clearInterval(intervalId); 
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden">
      <div
        id="carousel-inner"
        className="flex transition-transform duration-500 ease-in-out w-screen h-[500px]"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>
      <button
        id="prev"
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={showPrevSlide}
      >
        Prev
      </button>
      <button
        id="next"
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={showNextSlide}
      >
        Next
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white opacity-100' : 'bg-gray-500 opacity-50'}`}
            onClick={() => updateCarousel(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
