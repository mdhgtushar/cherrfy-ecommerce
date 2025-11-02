import { useRef, useState } from "react";

const ImageZoom = ({ imageList , selectedImage, setSelectedImage }) => {
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef();
  const zoomLensRef = useRef();
  
  // 🚨 UI/UX Adjustments for Perfect Corner Viewing and Friendly Distance
  const ZOOM_FACTOR = 2.5;    // Increased zoom for better detail view
  const LENS_SIZE = 180;      // Fixed size for the circular lens
  const LENS_OFFSET_X = 20;   // ⬅️ Adjusted offset: Reduced from 80 for a "friendlier" look
  const LENS_OFFSET_Y = 20;   // ⬆️ Adjusted offset: Reduced from 30 for a "friendlier" look

  const handleMouseMove = (e) => {
    if (!isZooming) return;
    const rect = containerRef.current.getBoundingClientRect();
    const imageWidth = rect.width;
    const imageHeight = rect.height;

    // 1. Calculate mouse position relative to the image container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 2. Determine UNCONSTRAINED lens position (centered on mouse + custom friendly offset)
    let unconstrainedLensLeft = mouseX - LENS_SIZE / 2 + LENS_OFFSET_X;
    let unconstrainedLensTop = mouseY - LENS_SIZE / 2 + LENS_OFFSET_Y;

    // 3. 🚨 CONSTRAIN Lens Position to keep it entirely within the container (The perfect adjustment!)
    
    // X-axis constraint
    let zoomLensLeft = Math.max(0, unconstrainedLensLeft); // Prevent from moving past left edge
    zoomLensLeft = Math.min(zoomLensLeft, imageWidth - LENS_SIZE); // Prevent from moving past right edge

    // Y-axis constraint
    let zoomLensTop = Math.max(0, unconstrainedLensTop); // Prevent from moving past top edge
    zoomLensTop = Math.min(zoomLensTop, imageHeight - LENS_SIZE); // Prevent from moving past bottom edge

    // 4. Calculate Background Position for Magnification
    // The background position must still be calculated based on the UNCONSTRAINED MOUSE position
    // to ensure the magnified area is correct, regardless of where the lens is forced.
    const backgroundImagePositionX = -(mouseX * ZOOM_FACTOR - LENS_SIZE / 2);
    const backgroundImagePositionY = -(mouseY * ZOOM_FACTOR - LENS_SIZE / 2);

    // 5. Apply Styles
    if (zoomLensRef.current) {
        zoomLensRef.current.style.width = `${LENS_SIZE}px`;
        zoomLensRef.current.style.height = `${LENS_SIZE}px`;
        zoomLensRef.current.style.top = `${zoomLensTop}px`;
        zoomLensRef.current.style.left = `${zoomLensLeft}px`;
        zoomLensRef.current.style.backgroundPosition = `${backgroundImagePositionX}px ${backgroundImagePositionY}px`;
        zoomLensRef.current.style.backgroundSize = `${imageWidth * ZOOM_FACTOR}px ${imageHeight * ZOOM_FACTOR}px`;
        zoomLensRef.current.style.opacity = '1'; // Ensure full visibility when constrained
    }
  };

  return (
    // UI remains clean, using rounded-xl, shadows, and red accents
    <div className="w-full md:w-3/5 flex space-x-4 p-2 md:p-4 md:h-[500px] h-[300px]"> 
      
      {/* Thumbnails (Visual Sidebar) */}
      <div className="w-20 sm:w-24 overflow-y-auto space-y-3 pt-1">
        {imageList.map((image, index) => (
          <div
            key={index}
            className={`
              w-full p-0.5 border-2 rounded-lg transition-all duration-200 
              cursor-pointer aspect-square
              ${selectedImage === image 
                ? "border-red-600 shadow-md ring-2 ring-red-200" 
                : "border-gray-200 hover:border-red-400"
              }
            `}
            onClick={() => setSelectedImage(image)}
          >
             <img
              src={image}
              alt={`Thumb ${index}`}
              className="w-full h-full object-cover rounded-md" 
            />
          </div>
        ))}
      </div>

      {/* Selected Image with Magnifier Zoom */}
      <div
        className="flex-1 relative border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        style={{ cursor: "zoom-in" }}
      >
        {/* Main Image Container for centering and "object-contain" */}
        <div className="flex items-center justify-center w-full h-full p-2">
            <img
            src={selectedImage}
            alt="Selected Product View"
            className="object-contain max-w-full max-h-full" 
            />
        </div>

        {/* Zoom Lens */}
        {isZooming && (
          <div
            ref={zoomLensRef}
            className="absolute pointer-events-none border-4 border-gray-900 bg-white rounded-full opacity-90 z-50 transition-opacity duration-100" 
            style={{
              // Size is now controlled by LENS_SIZE constant in handleMouseMove
              width: `${LENS_SIZE}px`,
              height: `${LENS_SIZE}px`,
              backgroundImage: `url(${selectedImage})`,
              backgroundRepeat: "no-repeat",
              boxShadow: "0 0 12px rgba(0,0,0,0.4)", 
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ImageZoom;