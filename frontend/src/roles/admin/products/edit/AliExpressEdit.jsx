import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { 
  getAllCountriesData, 
  updateAllCountriesData, 
  refreshAllCountriesData 
} from "../../../../features/productSlice";
import Loader from "../../../../components/Loader";
import Countries from "../../../../util/Countries";

const AliExpressEdit = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [productId, setProductId] = useState(searchParams.get("productId") || id || "");
  const [activeTab, setActiveTab] = useState("overview");
  const [editingData, setEditingData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkuIndex, setEditingSkuIndex] = useState(null); // Track which SKU is being edited
  const [applyToAllCountries, setApplyToAllCountries] = useState(false); // Shared for all tabs
  
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector((state) => state.products);

  // Auto-load product data if productId is provided in URL
  useEffect(() => {
    console.log("AliExpressEdit: productId from URL:", productId);
    console.log("AliExpressEdit: selectedProduct:", selectedProduct);
    
    if (productId && !selectedProduct.productId) {
      console.log("AliExpressEdit: Fetching product data for:", productId);
      fetchProductData();
    }
  }, [productId]);

  // Update editing data when selectedProduct changes
  useEffect(() => {
    if (selectedProduct.ali_data) {
      console.log("AliExpressEdit: Setting editing data from selectedProduct");
      setEditingData(selectedProduct.ali_data);
    }
  }, [selectedProduct]);

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "countries", label: "Countries Data", icon: "🌍" },
    { id: "skus", label: "SKUs", icon: "📦" },
    { id: "properties", label: "Properties", icon: "⚙️" },
    { id: "images", label: "Images", icon: "🖼️" }
  ];

  const fetchProductData = async (e) => {
    if (e) e.preventDefault();
    if (!productId.trim()) {
      toast.error("Please enter a valid Product ID.");
      return;
    }

    try {
      const response = await dispatch(getAllCountriesData(productId));
      if (response.error) {
        toast.error(response.error.message || "Failed to fetch product data.");
      } else {
        setEditingData(response.payload.data.ali_data);
        toast.success("Product data loaded successfully.");
      }
    } catch (error) {
      toast.error("Error fetching product data.");
    }
  };

  const handleRefreshData = async () => {
    if (!productId.trim()) {
      toast.error("Please enter a Product ID first.");
      return;
    }

    try {
      const response = await dispatch(refreshAllCountriesData(productId));
      if (response.error) {
        toast.error(response.error.message || "Failed to refresh data.");
      } else {
        setEditingData(response.payload.data.ali_data);
        toast.success("Data refreshed successfully from AliExpress.");
      }
    } catch (error) {
      toast.error("Error refreshing data.");
    }
  };

  const handleSaveChanges = async () => {
    if (!productId.trim()) {
      toast.error("Please enter a Product ID first.");
      return;
    }

    try {
      const response = await dispatch(updateAllCountriesData({ 
        productId, 
        ali_data: editingData 
      }));
      if (response.error) {
        toast.error(response.error.message || "Failed to save changes.");
      } else {
        toast.success("All countries data updated successfully.");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Error saving changes.");
    }
  };

  const handleDataChange = (country, field, value) => {
    setEditingData(prev => ({
      ...prev,
      [country]: {
        ...prev[country],
        [field]: value
      }
    }));
    setIsEditing(true);
  };

  const handleSkuChange = (country, skuIndex, field, value) => {
    setEditingData(prev => ({
      ...prev,
      [country]: {
        ...prev[country],
        ae_item_sku_info_dtos: {
          ...prev[country].ae_item_sku_info_dtos,
          ae_item_sku_info_d_t_o: prev[country].ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map((sku, index) =>
            index === skuIndex ? { ...sku, [field]: value } : sku
          )
        }
      }
    }));
    setIsEditing(true);
  };

  // Helper: Styled checkbox
  const ApplyToAllCheckbox = (
    <label className="flex items-center gap-2 cursor-pointer select-none font-medium">
      <input
        type="checkbox"
        checked={applyToAllCountries}
        onChange={() => setApplyToAllCountries((prev) => !prev)}
        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
      />
      <span>Apply to all countries</span>
    </label>
  );

  // Modified handleSaveSku to support apply to all countries
  const handleSaveSku = async (country, skuIndex) => {
    if (!productId.trim()) {
      toast.error("Please enter a Product ID first.");
      return;
    }
    try {
      let ali_data;
      if (applyToAllCountries) {
        ali_data = { ...editingData };
        Object.keys(ali_data).forEach((ctry) => {
          if (ali_data[ctry]?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o?.[skuIndex]) {
            ali_data[ctry] = {
              ...ali_data[ctry],
              ae_item_sku_info_dtos: {
                ...ali_data[ctry].ae_item_sku_info_dtos,
                ae_item_sku_info_d_t_o: ali_data[ctry].ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map((sku, idx) =>
                  idx === skuIndex ? { ...editingData[country].ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[skuIndex] } : sku
                )
              }
            };
          }
        });
      } else {
        const updatedCountryData = {
          ...editingData[country],
          ae_item_sku_info_dtos: {
            ...editingData[country].ae_item_sku_info_dtos,
            ae_item_sku_info_d_t_o: editingData[country].ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map((sku, idx) =>
              idx === skuIndex ? { ...sku } : sku
            )
          }
        };
        ali_data = {
          ...editingData,
          [country]: updatedCountryData
        };
      }
      const response = await dispatch(updateAllCountriesData({ productId, ali_data }));
      if (response.error) {
        toast.error(response.error.message || "Failed to save SKU changes.");
      } else {
        toast.success(applyToAllCountries ? "SKU updated for all countries." : "SKU updated successfully.");
        setEditingSkuIndex(null);
      }
    } catch (error) {
      toast.error("Error saving SKU changes.");
    }
  };

  // Modified handleSaveProperties to support apply to all countries
  const handleSaveProperties = async (country) => {
    if (!productId.trim()) {
      toast.error("Please enter a Product ID first.");
      return;
    }
    try {
      let ali_data;
      if (applyToAllCountries) {
        ali_data = { ...editingData };
        Object.keys(ali_data).forEach((ctry) => {
          if (ali_data[ctry]?.ae_item_properties) {
            ali_data[ctry] = {
              ...ali_data[ctry],
              ae_item_properties: { ...editingData[country].ae_item_properties }
            };
          }
        });
      } else {
        ali_data = {
          ...editingData,
          [country]: {
            ...editingData[country],
            ae_item_properties: { ...editingData[country].ae_item_properties }
          }
        };
      }
      const response = await dispatch(updateAllCountriesData({ productId, ali_data }));
      if (response.error) {
        toast.error(response.error.message || "Failed to save property changes.");
      } else {
        toast.success(applyToAllCountries ? "Properties updated for all countries." : "Properties updated successfully.");
      }
    } catch (error) {
      toast.error("Error saving property changes.");
    }
  };

  // Modified handleSaveCountriesData to support apply to all countries
  const handleSaveCountriesData = async (country) => {
    if (!productId.trim()) {
      toast.error("Please enter a Product ID first.");
      return;
    }
    try {
      let ali_data;
      if (applyToAllCountries) {
        ali_data = { ...editingData };
        Object.keys(ali_data).forEach((ctry) => {
          ali_data[ctry] = {
            ...editingData[ctry],
            ae_item_base_info_dto: { ...editingData[country].ae_item_base_info_dto },
            ae_item_description_dto: { ...editingData[country].ae_item_description_dto }
          };
        });
      } else {
        ali_data = {
          ...editingData,
          [country]: {
            ...editingData[country],
            ae_item_base_info_dto: { ...editingData[country].ae_item_base_info_dto },
            ae_item_description_dto: { ...editingData[country].ae_item_description_dto }
          }
        };
      }
      const response = await dispatch(updateAllCountriesData({ productId, ali_data }));
      if (response.error) {
        toast.error(response.error.message || "Failed to save country data changes.");
      } else {
        toast.success(applyToAllCountries ? "Country data updated for all countries." : "Country data updated successfully.");
      }
    } catch (error) {
      toast.error("Error saving country data changes.");
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter AliExpress Product ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Countries</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
              {Object.keys(editingData).length} / {Countries.length}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button
            onClick={fetchProductData}
            disabled={status === "loading"}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "loading" ? "Loading..." : "Load Data"}
          </button>
          <button
            onClick={handleRefreshData}
            disabled={status === "loading"}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {status === "loading" ? "Refreshing..." : "Refresh from AliExpress"}
          </button>
        </div>
      </div>

      {selectedProduct.productId && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Object.keys(editingData).length}</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(editingData).reduce((total, country) => 
                  total + (country.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o?.length || 0), 0
                )}
              </div>
              <div className="text-sm text-gray-600">Total SKUs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(editingData).reduce((total, country) => 
                  total + (country.ae_item_properties?.ae_item_property?.length || 0), 0
                )}
              </div>
              <div className="text-sm text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Object.values(editingData).reduce((total, country) => 
                  total + (country.ae_multimedia_info_dto?.image_urls?.split(';')?.length || 0), 0
                )}
              </div>
              <div className="text-sm text-gray-600">Images</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCountriesData = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 md:gap-0">
          {ApplyToAllCheckbox}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={applyToAllCountries}
            >
              {Countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        {editingData[selectedCountry] && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                <input
                  type="text"
                  value={editingData[selectedCountry].ae_item_base_info_dto?.subject || ""}
                  onChange={(e) => handleDataChange(selectedCountry, "ae_item_base_info_dto", {
                    ...editingData[selectedCountry].ae_item_base_info_dto,
                    subject: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
                <input
                  type="text"
                  value={editingData[selectedCountry].ae_item_base_info_dto?.product_id || ""}
                  onChange={(e) => handleDataChange(selectedCountry, "ae_item_base_info_dto", {
                    ...editingData[selectedCountry].ae_item_base_info_dto,
                    product_id: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editingData[selectedCountry].ae_item_description_dto?.description || ""}
                onChange={(e) => handleDataChange(selectedCountry, "ae_item_description_dto", {
                  ...editingData[selectedCountry].ae_item_description_dto,
                  description: e.target.value
                })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleSaveCountriesData(selectedCountry)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSkus = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 md:gap-0">
          {ApplyToAllCheckbox}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={applyToAllCountries}
            >
              {Countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        {editingData[selectedCountry]?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o?.map((sku, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-3">SKU {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU ID</label>
                <input
                  type="text"
                  value={sku.sku_id || ""}
                  onChange={(e) => handleSkuChange(selectedCountry, index, "sku_id", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={editingSkuIndex !== index}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
                <input
                  type="number"
                  value={sku.offer_sale_price || ""}
                  onChange={(e) => handleSkuChange(selectedCountry, index, "offer_sale_price", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={editingSkuIndex !== index}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  value={sku.sku_available_stock || ""}
                  onChange={(e) => handleSkuChange(selectedCountry, index, "sku_available_stock", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={editingSkuIndex !== index}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {editingSkuIndex === index ? (
                <button
                  onClick={() => handleSaveSku(selectedCountry, index)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingSkuIndex(index)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 md:gap-0">
          {ApplyToAllCheckbox}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={applyToAllCountries}
            >
              {Countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        {editingData[selectedCountry]?.ae_item_properties?.ae_item_property?.map((prop, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                <input
                  type="text"
                  value={prop.attr_name || ""}
                  onChange={(e) => {
                    const newProps = [...editingData[selectedCountry].ae_item_properties.ae_item_property];
                    newProps[index] = { ...newProps[index], attr_name: e.target.value };
                    handleDataChange(selectedCountry, "ae_item_properties", {
                      ...editingData[selectedCountry].ae_item_properties,
                      ae_item_property: newProps
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Value</label>
                <input
                  type="text"
                  value={prop.attr_value || ""}
                  onChange={(e) => {
                    const newProps = [...editingData[selectedCountry].ae_item_properties.ae_item_property];
                    newProps[index] = { ...newProps[index], attr_value: e.target.value };
                    handleDataChange(selectedCountry, "ae_item_properties", {
                      ...editingData[selectedCountry].ae_item_properties,
                      ae_item_property: newProps
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleSaveProperties(selectedCountry)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Images for {selectedCountry}</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs (semicolon separated)</label>
          <textarea
            value={editingData[selectedCountry]?.ae_multimedia_info_dto?.image_urls || ""}
            onChange={(e) => handleDataChange(selectedCountry, "ae_multimedia_info_dto", {
              ...editingData[selectedCountry].ae_multimedia_info_dto,
              image_urls: e.target.value
            })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image1.jpg;https://example.com/image2.jpg"
          />
        </div>

        {editingData[selectedCountry]?.ae_multimedia_info_dto?.image_urls && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-3">Preview Images</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {editingData[selectedCountry].ae_multimedia_info_dto.image_urls.split(';').map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url.trim()}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x100?text=Image+Error';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "countries":
        return renderCountriesData();
      case "skus":
        return renderSkus();
      case "properties":
        return renderProperties();
      case "images":
        return renderImages();
      default:
        return renderOverview();
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  // Show error state if product is not found
  if (productId && !selectedProduct.productId && status === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Not Found</h1>
                <p className="text-gray-600">The product with ID "{productId}" could not be found.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Not Found</h3>
              <p className="text-gray-600 mb-4">
                The product with ID "{productId}" could not be found in the database.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Go Back
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">AliExpress Product Editor</h1>
                <p className="text-gray-600">Edit product data for all 40 countries simultaneously</p>
              </div>
            </div>
            {productId && (
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Product ID: {productId}
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="flex space-x-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={handleSaveChanges}
              disabled={status === "loading"}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-lg"
            >
              {status === "loading" ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="fixed top-6 right-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AliExpressEdit;
