import React, { useState } from "react";

export default function StorefrontBranding() {
  const [brandingData, setBrandingData] = useState({
    factoryName: "",
    description: "",
    logo: null,
    banner: null,
    localization: "en-us",
    featuredProduct: "",
    socialMedia: {
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name.startsWith("socialMedia.")) {
      const socialKey = name.split(".")[1];
      setBrandingData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setBrandingData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Branding Data:", brandingData);
    // Handle form submission
  };

  const handleEditProfile = () => {
    console.log("Editing factory profile");
    // Handle profile editing
  };

  const handleLinkSocialMedia = () => {
    console.log("Linking social media and website");
    // Handle social media linking
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Storefront Branding & Localization</h2>
        <p className="text-gray-600">Customize your factory storefront appearance and localization settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Factory Profile Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Factory Profile</h3>
            <button 
              type="button"
              onClick={handleEditProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Factory Name *
              </label>
              <input 
                type="text" 
                name="factoryName"
                value={brandingData.factoryName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter factory name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localized Storefront
              </label>
              <select 
                name="localization"
                value={brandingData.localization}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en-us">English - USD</option>
                <option value="fr-fr">French - EUR</option>
                <option value="de-de">German - EUR</option>
                <option value="es-es">Spanish - EUR</option>
                <option value="ja-jp">Japanese - JPY</option>
                <option value="zh-cn">Chinese - CNY</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Factory Description
            </label>
            <textarea 
              name="description"
              value={brandingData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your factory, products, and values"
            />
          </div>
        </div>

        is {/* Media Upload Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Media Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Factory Logo
              </label>
              <input 
                type="file" 
                name="logo"
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".jpg,.jpeg,.png,.svg"
              />
              <div className="mt-2 text-xs text-gray-500">
                Recommended: 200x200px, PNG or SVG format
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storefront Banner
              </label>
              <input 
                type="file" 
                name="banner"
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".jpg,.jpeg,.png"
              />
              <div className="mt-2 text-xs text-gray-500">
                Recommended: 1200x400px, JPG or PNG format
              </div>
            </div>
          </div>
        </div>

        {/* Featured Product Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Featured Product Highlighting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Product ID
              </label>
              <input 
                type="text" 
                name="featuredProduct"
                value={brandingData.featuredProduct}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product ID to feature"
              />
            </div>
            <div className="flex items-end">
              <button 
                type="button"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Preview Featured Product
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Website Links */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Social Media & Website Links</h3>
            <button 
              type="button"
              onClick={handleLinkSocialMedia}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Link Social Media
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input 
                type="url" 
                name="socialMedia.website"
                value={brandingData.socialMedia.website}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://your-website.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook Page
              </label>
              <input 
                type="url" 
                name="socialMedia.facebook"
                value={brandingData.socialMedia.facebook}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://facebook.com/your-page"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Profile
              </label>
              <input 
                type="url" 
                name="socialMedia.instagram"
                value={brandingData.socialMedia.instagram}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://instagram.com/your-profile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter Profile
              </label>
              <input 
                type="url" 
                name="socialMedia.twitter"
                value={brandingData.socialMedia.twitter}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://twitter.com/your-profile"
              />
            </div>
          </div>
        </div>

        {/* Storefront Preview */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Storefront Preview</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {brandingData.factoryName || "Your Factory Name"}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {brandingData.description || "Factory description will appear here"}
              </div>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>🌐 Website</span>
                <span>📘 Facebook</span>
                <span>📷 Instagram</span>
                <span>🐦 Twitter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Save Branding Settings
          </button>
        </div>
      </form>
    </div>
  );
}
