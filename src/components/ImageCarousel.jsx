import React from 'react';
import { motion } from 'framer-motion';

const ImageCarousel = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50" onClick={handleClose}>
      <motion.div
        className="relative w-full h-full overflow-hidden bg-slate-900 rounded-lg shadow-lg flex items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the carousel
      >
        <button
          className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10"
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10"
          onClick={nextSlide}
        >
          Next
        </button>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="mx-auto max-h-full"
        />
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
