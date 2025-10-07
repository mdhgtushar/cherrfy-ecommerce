import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);

  // 🧠 API থেকে ইমেজ লোড
  useEffect(() => {
    fetch("http://localhost:8080/api/media")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Failed to load images:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-center mb-6">📸 Media Gallery</h1>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images found 😢</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="p-2 text-center">
                <p className="text-sm text-gray-700 truncate">{img.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
