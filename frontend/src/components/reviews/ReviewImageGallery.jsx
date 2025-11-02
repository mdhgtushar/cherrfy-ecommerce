import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn } from 'lucide-react';

const ReviewImageGallery = ({ images, maxVisible = 3 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `review-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {images.slice(0, maxVisible).map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => openModal(image, index)}
          >
            <img
              src={image.url || image}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
              <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
        
        {images.length > maxVisible && (
          <div
            className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => openModal(images[maxVisible], maxVisible)}
          >
            <span className="text-sm font-medium text-gray-600">
              +{images.length - maxVisible}
            </span>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={images[currentIndex].url || images[currentIndex]}
              alt={`Review image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <button
                onClick={() => downloadImage(images[currentIndex].url || images[currentIndex])}
                className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                title="Download image"
              >
                <Download className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full">
                {currentIndex + 1} of {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewImageGallery;
