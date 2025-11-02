import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  Camera, 
  AlertCircle, 
  CheckCircle,
  Star,
  Send
} from 'lucide-react';
import StarRating from './StarRating';

const ReviewForm = ({ 
  productId, 
  onSubmit, 
  onCancel,
  isSubmitting = false,
  initialData = null 
}) => {
  const [formData, setFormData] = useState({
    rating: initialData?.rating || 0,
    title: initialData?.title || '',
    comment: initialData?.comment || '',
    images: initialData?.images || [],
    pros: initialData?.pros || '',
    cons: initialData?.cons || '',
    recommend: initialData?.recommend || null,
    anonymous: initialData?.anonymous || false
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write a review comment';
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters long';
    }
    
    if (formData.title && formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const submitData = {
      ...formData,
      productId,
      images: formData.images.map(img => img.file)
    };
    
    if (onSubmit) {
      await onSubmit(submitData);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {initialData ? 'Edit Review' : 'Write a Review'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating *
          </label>
          <StarRating
            rating={formData.rating}
            onRatingChange={(rating) => handleInputChange('rating', rating)}
            interactive={true}
            size="lg"
            showLabel={false}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.rating}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Title (Optional)
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Summarize your review in a few words"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={100}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.title && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title}
              </p>
            )}
            <span className="text-sm text-gray-500 ml-auto">
              {formData.title.length}/100
            </span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => handleInputChange('comment', e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="5"
            minLength={10}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.comment && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.comment}
              </p>
            )}
            <span className="text-sm text-gray-500 ml-auto">
              {formData.comment.length} characters
            </span>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What did you like? (Optional)
            </label>
            <textarea
              value={formData.pros}
              onChange={(e) => handleInputChange('pros', e.target.value)}
              placeholder="Positive aspects..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What could be improved? (Optional)
            </label>
            <textarea
              value={formData.cons}
              onChange={(e) => handleInputChange('cons', e.target.value)}
              placeholder="Areas for improvement..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>
        </div>

        {/* Recommendation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Would you recommend this product?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={formData.recommend === 'yes'}
                onChange={(e) => handleInputChange('recommend', e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                Yes, I recommend it
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={formData.recommend === 'no'}
                onChange={(e) => handleInputChange('recommend', e.target.value)}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                <X className="w-4 h-4 mr-1 text-red-600" />
                No, I don't recommend it
              </span>
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photos (Optional)
          </label>
          
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop images here, or click to upload
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Images
            </label>
          </div>

          {/* Image Preview */}
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              {formData.images.map((image) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.preview}
                    alt="Review preview"
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Anonymous Option */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => handleInputChange('anonymous', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Post this review anonymously
            </span>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {initialData ? 'Update Review' : 'Submit Review'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
