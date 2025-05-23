import React, { useState } from "react";

const ProductInformationCreate = ({productInfo}) => {
  const [formData, setFormData] = useState({
    productTitle: productInfo?.subject,
    averageRating: productInfo?.avg_evaluation_rating,
    reviewCount: productInfo?.evaluation_count,
    categoryId: productInfo?.category_id,
    currency: productInfo?.currency_code,
    productDescription: productInfo?.detail,
    mobileDescription: productInfo?.mobile_detail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Add your submit logic here
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto bg-white ">
      <h2 className="text-2xl font-bold mb-6">Product Information</h2>

      {/* Full-width long input fields */}
      <div className="mb-6">
        <label htmlFor="productTitle" className="block font-medium mb-1">
          Product Title
        </label>
        <input
          type="text"
          name="productTitle"
          value={formData.productTitle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Enter product title"
        />
      </div>

      {/* Grid for short inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="averageRating" className="block font-medium mb-1">
            Average Rating
          </label>
          <input
            type="number"
            step="0.1"
            name="averageRating"
            value={formData.averageRating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g., 4.6"
          />
        </div>

        <div>
          <label htmlFor="reviewCount" className="block font-medium mb-1">
            Review Count
          </label>
          <input
            type="number"
            name="reviewCount"
            value={formData.reviewCount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g., 588"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block font-medium mb-1">
            Category ID
          </label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g., 200034143"
          />
        </div>

        <div>
          <label htmlFor="currency" className="block font-medium mb-1">
            Currency Code
          </label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g., USD"
          />
        </div>
      </div>

      {/* Full-width long input fields */}
      <div className="mb-6">
        <label htmlFor="productDescription" className="block font-medium mb-1">
          Product Description (HTML)
        </label>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          className="w-full border p-2 rounded h-40"
          placeholder="Paste HTML content here"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="mobileDescription" className="block font-medium mb-1">
          Mobile Description (JSON)
        </label>
        <textarea
          name="mobileDescription"
          value={formData.mobileDescription}
          onChange={handleChange}
          className="w-full border p-2 rounded h-40"
          placeholder='Paste JSON like {"version":"2.0.0", "moduleList": [...]}'
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductInformationCreate;
