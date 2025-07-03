import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

const CarouselDefault = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="overflow-hidden relative h-48 sm:h-64 md:h-72 lg:h-80 bg-white-50">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            index === currentIndex
              ? "translate-x-0 z-0"
              : "translate-x-full z-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ))}

      {/* Navigation buttons positioned in the middle of image height */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-10 px-4">
        <GrPrevious
          className="cursor-pointer size-4 sm:size-5 md:size-6 lg:size-7 hover:scale-110 transition-transform bg-white/80 rounded-full p-1 pointer-events-auto"
          onClick={prevSlide}
        />
        <GrNext
          className="cursor-pointer size-4 sm:size-5 md:size-6 lg:size-7 hover:scale-110 transition-transform bg-white/80 rounded-full p-1 pointer-events-auto"
          onClick={nextSlide}
        />
      </div>
    </div>
  );
};

export default CarouselDefault;
