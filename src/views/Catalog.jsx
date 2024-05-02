import React, { useState } from 'react';
import Catalog from '../components/Catalog';
import ImageCarousel from '../components/ImageCarousel';

const Journey = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
    './assets/Image15.png',
    './assets/Image16.png',
    './assets/Image17.png',
    './assets/Image18.png',
    './assets/Image19.png',
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
      <style>{`body { background-color: #0f172a; }`}</style>
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center text-green-500">Img Catalog</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <div key={index} className="group rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => handleImageClick(index)}>
              <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75" />
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
