import React, { useState } from "react";
import AddProperty from "./AddProperty";
import AddSKU from "./AddSKU";
import Button from "../../../components/ui/Button";

const ManualCreatePage = () => {
  const [source, setSource] = useState("manual");
  const [status, setStatus] = useState("published");
  const [formData, setFormData] = useState({
    averageRating: "",
    reviewCount: "",
    categoryId: "",
    currency: "",
    productDescription: "",
    mobileDescription: "",
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
    <>
    <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white">
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
    <AddProperty />
    <AddSKU />
     <h1 className="text-3xl font-bold">📦 Product Management (All Sources)</h1>

      {/* Add New Product */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        >
          <option value="manual">Manual</option>
          <option value="aliexpress">AliExpress</option>
          <option value="factory">Factory</option>
          <option value="vendor">Vendor</option>
        </select>

        <input placeholder="Product Name" className="block w-full mb-2 p-2 border rounded" />
        <textarea placeholder="Description" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Price" type="number" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="MOQ (Min Order Qty)" type="number" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Variants (e.g., Size, Color)" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Assign Vendor / Factory Name" className="block w-full mb-2 p-2 border rounded" />
        <input type="file" multiple className="block w-full mb-2" />
        <div className="flex space-x-2">
          <Button variant="gray">Save as Draft</Button>
          <Button variant="green">Publish</Button>
        </div>
      </section>

      {/* Draft / Published / Disabled */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Product Status View</h2>
        <select
          className="w-full p-2 border rounded mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="disabled">Disabled</option>
        </select>
        <div className="space-x-2">
          <Button variant="green">Approve / Publish</Button>
          <Button variant="gray">Temporarily Disable</Button>
          <Button variant="red">Archive Product</Button>
        </div>
      </section>

      {/* SEO Fields */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">SEO Fields</h2>
        <input placeholder="Meta Title" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Meta Description" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="URL Slug" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Focus Keyword" className="block w-full mb-2 p-2 border rounded" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Index this page</span>
        </label>
      </section>

      {/* Tag & Category Mapping */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Tag & Category Mapping</h2>
        <input placeholder="Internal Tags (e.g. Luxury, Minimal)" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Main Category" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Subcategory" className="block w-full mb-2 p-2 border rounded" />
        <Button variant="blue">Auto-Assign Category</Button>
      </section>

      {/* Gallery/Image Editor */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Gallery / Image Editor</h2>
        <input type="file" multiple className="block w-full mb-2" />
        <Button variant="gray">Reorder Images</Button>
        <Button variant="green">Set Default Image</Button>
        <input placeholder="Video Demo URL (YouTube, Vimeo)" className="block w-full mb-2 p-2 border rounded" />
        <Button variant="black">Compress & Optimize</Button>
      </section>

      {/* Labels */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Labels (Hot, Trending, Flash)</h2>
        <input placeholder="Label Name (e.g., Hot, Flash)" className="block w-full mb-2 p-2 border rounded" />
        <input placeholder="Label Color (#hex or name)" className="block w-full mb-2 p-2 border rounded" />
        <input type="datetime-local" className="block w-full mb-2 p-2 border rounded" />
        <Button variant="red">Schedule Flash Sale</Button>
      </section>
    </>
  );
};

export default ManualCreatePage;
