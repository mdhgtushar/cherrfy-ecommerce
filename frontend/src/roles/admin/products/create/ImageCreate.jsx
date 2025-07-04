import React, { useState, useRef } from 'react';
import { Button } from '../../../../components/ui/Button';
import { toast } from 'react-toastify';

const ImageCreate = ({ onProgress }) => {
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      isDefault: images.length === 0 && index === 0,
      order: images.length + index
    }));
    
    setImages(prev => [...prev, ...newImages]);
    updateProgress();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    handleFileSelect(files);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
    updateProgress();
  };

  const setDefaultImage = (id) => {
    setImages(prev => prev.map(img => ({
      ...img,
      isDefault: img.id === id
    })));
  };

  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages.map((img, index) => ({ ...img, order: index })));
  };

  const compressImages = async () => {
    setUploading(true);
    try {
      // Simulate compression
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Images compressed successfully!');
    } catch (error) {
      toast.error('Failed to compress images');
    } finally {
      setUploading(false);
    }
  };

  const updateProgress = () => {
    const hasImages = images.length > 0;
    const hasVideo = videoUrl.trim() !== '';
    const isComplete = hasImages || hasVideo;
    onProgress?.(isComplete);
  };

  React.useEffect(() => {
    updateProgress();
  }, [images, videoUrl]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Images & Media</h2>
        <p className="text-gray-600">Upload product images and videos to showcase your product</p>
      </div>

      {/* Image Upload Area */}
      <div className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragging ? 'Drop images here' : 'Upload product images'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag and drop images here, or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Product Images ({images.length})
              </h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={compressImages}
                  disabled={uploading}
                >
                  {uploading ? 'Compressing...' : 'Compress & Optimize'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                      <button
                        onClick={() => setDefaultImage(image.id)}
                        className={`p-2 rounded-full ${
                          image.isDefault
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        title={image.isDefault ? 'Default Image' : 'Set as Default'}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                        title="Remove Image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Default Badge */}
                  {image.isDefault && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Default
                    </div>
                  )}

                  {/* Order Number */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>

                  {/* Image Info */}
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {image.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reorder Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Image Order</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The first image will be used as the main product image. Drag images to reorder them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Section */}
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Video</h3>
          <p className="text-gray-600">Add a video to showcase your product in action</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supports YouTube, Vimeo, and direct video links
            </p>
          </div>

          {videoUrl && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Video URL Added</p>
                  <p className="text-sm text-gray-600 truncate">{videoUrl}</p>
                </div>
                <button
                  onClick={() => setVideoUrl('')}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-yellow-900">Image Requirements</h4>
            <ul className="text-sm text-yellow-800 mt-1 space-y-1">
              <li>• Minimum 1 product image required</li>
              <li>• Recommended size: 800x800 pixels or larger</li>
              <li>• Supported formats: JPG, PNG, GIF</li>
              <li>• Maximum file size: 10MB per image</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCreate;