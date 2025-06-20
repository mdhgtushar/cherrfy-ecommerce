import { useRef, useState } from "react";

const ImageZoom = ({ imageList , selectedImage, setSelectedImage }) => {
//   const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef();
  const zoomLensRef = useRef();

  const handleMouseMove = (e) => {
    if (!isZooming) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 80;
    const y = e.clientY - rect.top + 30;
    const zoomFactor = 2;
    const zoomLensWidth = rect.width;
    const zoomLensHeight = rect.height;
    const zoomLensLeft = x - zoomLensWidth / 2;
    const zoomLensTop = y - zoomLensHeight / 2;
    const backgroundImagePositionX = -(x * zoomFactor - zoomLensWidth / 2);
    const backgroundImagePositionY = -(y * zoomFactor - zoomLensHeight / 2);

    zoomLensRef.current.style.top = `${zoomLensTop}px`;
    zoomLensRef.current.style.left = `${zoomLensLeft}px`;
    zoomLensRef.current.style.backgroundPosition = `${backgroundImagePositionX}px ${backgroundImagePositionY}px`;
    zoomLensRef.current.style.backgroundSize = `${zoomLensWidth * zoomFactor}px ${zoomLensHeight * zoomFactor}px`;
  };

  return (
    <div className="w-full md:w-3/5 flex p-2 md:p-4 md:h-[500px] h-[300px]">
      {/* Thumbnails */}
      <div className="w-24 overflow-y-auto space-y-2">
        {imageList.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumb ${index}`}
            onClick={() => setSelectedImage(image)}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-red-500 ${
              selectedImage === image ? "border-red-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Selected Image with Magnifier Zoom */}
      <div
        className="flex-1 relative border border-gray-200 rounded-md bg-white overflow-hidden"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        style={{ cursor: "crosshair" }}
      >
        {/* Main Image */}
        <img
          src={selectedImage}
          alt="Selected"
          className="object-contain w-full"
        />

        {/* Zoom Lens */}
        {isZooming && (
          <div
            ref={zoomLensRef}
            className="absolute pointer-events-none border-2 border-gray-300 rounded overflow-hidden"
            style={{
              width: "200px",
              height: "200px",
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ImageZoom;

