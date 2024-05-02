import React from 'react';

const Catalog = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="cursor-pointer w-full h-auto"
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
};

export default Catalog;
