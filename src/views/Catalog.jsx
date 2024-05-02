import React, { useState } from 'react';
import Catalog from '../components/Catalog';
import ImageCarousel from '../components/ImageCarousel';

const Journey = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // Define your array of images
  const images = [
    './assets/Image1.png',
    './assets/Image2.png',
    './assets/Image3.png',
    './assets/Image4.png',
    './assets/Image5.png',
    './assets/Image6.png',
    './assets/Image7.png',
    './assets/Image8.png',
    './assets/Image9.png',
    './assets/Image10.png',
    './assets/Image11.png',
    './assets/Image12.png',
    './assets/Image13.png',
    './assets/Image14.png',
  ];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };

  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
  };

  return (
    <div>
      {/* Add background color to the body element */}
      <style>{`body { background-color: #0f172a; }`}</style>
      <div className="container mx-auto my-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center text-green-500">Img Catalog</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="group rounded-lg overflow-hidden shadow-lg" onClick={() => handleImageClick(index)}>
              <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75 cursor-pointer" />
            </div>
          ))}
        </div>
        {isCarouselOpen && (
          <ImageCarousel images={images} initialIndex={selectedImageIndex} onClose={handleCloseCarousel} />
        )}
      </div>
    </div>
  );
};

export default Journey;
