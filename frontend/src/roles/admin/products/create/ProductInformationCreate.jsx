import React, { useState, useEffect } from "react";

const ProductInformationCreate = ({ productInfo }) => {
  // State for form data, initialized with productInfo or empty values
  const [formData, setFormData] = useState({
    productTitle: "",
    averageRating: "",
    reviewCount: "",
    categoryId: "",
    currency: "",
    productDescription: "",
    mobileDescription: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for submission status (e.g., loading, success, error)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Effect to populate form data when productInfo prop changes (e.g., for editing existing products)
  useEffect(() => {
    if (productInfo) {
      setFormData({
        productTitle: productInfo.subject || "",
        averageRating: productInfo.avg_evaluation_rating || "",
        reviewCount: productInfo.evaluation_count || "",
        categoryId: productInfo.category_id || "",
        currency: productInfo.currency_code || "",
        productDescription: productInfo.detail || "",
        mobileDescription: productInfo.mobile_detail || "",
      });
    }
  }, [productInfo]);

  // Handle input changes, updating the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the current field as the user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Client-side validation logic
  const validateForm = () => {
    let newErrors = {};

    // Validate Product Title
    if (!formData.productTitle.trim()) {
      newErrors.productTitle = "Product Title is required.";
    }

    // Validate Average Rating
    if (formData.averageRating !== "") {
      const rating = parseFloat(formData.averageRating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        newErrors.averageRating = "Average Rating must be a number between 0 and 5.";
      }
    }

    // Validate Review Count
    if (formData.reviewCount !== "") {
      const count = parseInt(formData.reviewCount, 10);
      if (isNaN(count) || count < 0) {
        newErrors.reviewCount = "Review Count must be a non-negative integer.";
      }
    }

    // Validate Category ID
    if (formData.categoryId !== "") {
      const category = parseInt(formData.categoryId, 10);
      if (isNaN(category) || category < 0) {
        newErrors.categoryId = "Category ID must be a non-negative integer.";
      }
    } else {
        newErrors.categoryId = "Category ID is required.";
    }

    // Validate Currency Code
    if (!formData.currency.trim()) {
      newErrors.currency = "Currency Code is required.";
    } else if (!/^[A-Z]{3}$/.test(formData.currency.trim())) {
      newErrors.currency = "Currency Code must be a 3-letter uppercase code (e.g., USD).";
    }

    // Validate Mobile Description as JSON
    if (formData.mobileDescription.trim()) {
      try {
        JSON.parse(formData.mobileDescription);
      } catch (e) {
        newErrors.mobileDescription = "Mobile Description must be valid JSON.";
      }
    }

    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitMessage(""); // Clear previous messages
    setIsSuccess(false);

    // Validate the form before attempting submission
    const isValid = validateForm();
    if (!isValid) {
      setSubmitMessage("Please correct the errors in the form.");
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true); // Set loading state

    try {
      // Simulate an API call
      // In a real application, you would send formData to your backend API
      console.log("Submitting Data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate a successful response
      setSubmitMessage("Product information saved successfully!");
      setIsSuccess(true);
      // Optional: Clear form data after successful submission for new entries
      if (!productInfo) {
          setFormData({
              productTitle: "",
              averageRating: "",
              reviewCount: "",
              categoryId: "",
              currency: "",
              productDescription: "",
              mobileDescription: "",
          });
      }

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("Failed to save product information. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false); // Reset loading state
      // Clear submit message after some time
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-xl my-8 font-[Inter]">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Product Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Product Title */}
        <div>
          <label htmlFor="productTitle" className="block text-gray-700 text-sm font-semibold mb-2">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="productTitle"
            id="productTitle"
            value={formData.productTitle}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              errors.productTitle ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product title"
            aria-invalid={errors.productTitle ? "true" : "false"}
            aria-describedby="productTitleError"
          />
          {errors.productTitle && (
            <p id="productTitleError" className="text-red-500 text-xs mt-1">{errors.productTitle}</p>
          )}
        </div>

        {/* Grid for short inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Average Rating */}
          <div>
            <label htmlFor="averageRating" className="block text-gray-700 text-sm font-semibold mb-2">
              Average Rating
            </label>
            <input
              type="number"
              step="0.1"
              name="averageRating"
              id="averageRating"
              value={formData.averageRating}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                errors.averageRating ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 4.6"
              aria-invalid={errors.averageRating ? "true" : "false"}
              aria-describedby="averageRatingError"
            />
            {errors.averageRating && (
              <p id="averageRatingError" className="text-red-500 text-xs mt-1">{errors.averageRating}</p>
            )}
          </div>

          {/* Review Count */}
          <div>
            <label htmlFor="reviewCount" className="block text-gray-700 text-sm font-semibold mb-2">
              Review Count
            </label>
            <input
              type="number"
              name="reviewCount"
              id="reviewCount"
              value={formData.reviewCount}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                errors.reviewCount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 588"
              aria-invalid={errors.reviewCount ? "true" : "false"}
              aria-describedby="reviewCountError"
            />
            {errors.reviewCount && (
              <p id="reviewCountError" className="text-red-500 text-xs mt-1">{errors.reviewCount}</p>
            )}
          </div>

          {/* Category ID */}
          <div>
            <label htmlFor="categoryId" className="block text-gray-700 text-sm font-semibold mb-2">
              Category ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="categoryId"
              id="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                errors.categoryId ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 200034143"
              aria-invalid={errors.categoryId ? "true" : "false"}
              aria-describedby="categoryIdError"
            />
            {errors.categoryId && (
              <p id="categoryIdError" className="text-red-500 text-xs mt-1">{errors.categoryId}</p>
            )}
          </div>

          {/* Currency Code */}
          <div>
            <label htmlFor="currency" className="block text-gray-700 text-sm font-semibold mb-2">
              Currency Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="currency"
              id="currency"
              value={formData.currency}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                errors.currency ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., USD"
              aria-invalid={errors.currency ? "true" : "false"}
              aria-describedby="currencyError"
            />
            {errors.currency && (
              <p id="currencyError" className="text-red-500 text-xs mt-1">{errors.currency}</p>
            )}
          </div>
        </div>

        {/* Product Description (HTML) */}
        <div>
          <label htmlFor="productDescription" className="block text-gray-700 text-sm font-semibold mb-2">
            Product Description (HTML)
          </label>
          <textarea
            name="productDescription"
            id="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-40 focus:ring-2 focus:ring-blue-500 transition duration-200 border-gray-300"
            placeholder="Paste HTML content here"
          />
        </div>

        {/* Mobile Description (JSON) */}
        <div>
          <label htmlFor="mobileDescription" className="block text-gray-700 text-sm font-semibold mb-2">
            Mobile Description (JSON)
          </label>
          <textarea
            name="mobileDescription"
            id="mobileDescription"
            value={formData.mobileDescription}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg h-40 focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              errors.mobileDescription ? "border-red-500" : "border-gray-300"
            }`}
            placeholder='Paste JSON like {"version":"2.0.0", "moduleList": [...]}'
            aria-invalid={errors.mobileDescription ? "true" : "false"}
            aria-describedby="mobileDescriptionError"
          />
          {errors.mobileDescription && (
            <p id="mobileDescriptionError" className="text-red-500 text-xs mt-1">{errors.mobileDescription}</p>
          )}
        </div>

        {/* Submit Button and Submission Message */}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-lg transition duration-300 ease-in-out
              ${isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Product"}
          </button>
          {submitMessage && (
            <p className={`mt-4 text-center text-sm font-medium ${isSuccess ? "text-green-600" : "text-red-600"}`}>
              {submitMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductInformationCreate;