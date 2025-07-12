import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById, clearSelectedProduct } from '../../../../features/productSlice';
import Loader from '../../../../components/Loader';
import ADMIN_PATHS from '../../ADMIN_PATHS';
import ProductAnalytics from '../components/ProductAnalytics';
import ProductQuickActions from '../components/ProductQuickActions';
import { 
  ArrowLeft, 
  Eye, 
  ShoppingCart, 
  MousePointer, 
  TrendingUp, 
  Star, 
  Calendar,
  DollarSign,
  Package,
  Globe,
  Edit,
  ExternalLink,
  BarChart3,
  Activity,
  Users,
  Clock
} from 'lucide-react';

const ProductViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, status, error } = useSelector((state) => state.products);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    console.log('ProductViewPage: Product ID from params:', id);
    console.log('ProductViewPage: Current status:', status);
    console.log('ProductViewPage: Current error:', error);
    console.log('ProductViewPage: Selected product:', selectedProduct);
    
    if (id) {
      console.log('ProductViewPage: Dispatching fetchProductById with:', { id, country: 'BD', currency: 'BDT' });
      dispatch(fetchProductById({ id, country: 'BD', currency: 'BDT' }));
    } else {
      console.log('ProductViewPage: No ID provided');
    }
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  // Debug logging for state changes
  useEffect(() => {
    console.log('ProductViewPage: Status changed to:', status);
    console.log('ProductViewPage: Selected product updated:', selectedProduct);
    console.log('ProductViewPage: Error updated:', error);
  }, [status, selectedProduct, error]);

  if (status === 'loading') {
    console.log('ProductViewPage: Showing loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    console.log('ProductViewPage: Showing failed state with error:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-900">Failed to load product</h3>
                <p className="text-red-700">Error: {error || 'Unknown error occurred'}</p>
                <p className="text-red-700 text-sm mt-1">Product ID: {id}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProduct || Object.keys(selectedProduct).length === 0) {
    console.log('ProductViewPage: No selected product available');
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">Product not found</h3>
                <p className="text-yellow-700">No product data available for ID: {id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('ProductViewPage: Rendering product view with data:', selectedProduct);

  // Enhanced product data extraction
  const title = selectedProduct.name || (selectedProduct.sku && selectedProduct.sku.sku_attr) || 'No title';
  const images = Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0
    ? selectedProduct.images
    : (selectedProduct.sku && selectedProduct.sku.ae_sku_property_dtos && selectedProduct.sku.ae_sku_property_dtos.ae_sku_property_d_t_o
      ? selectedProduct.sku.ae_sku_property_dtos.ae_sku_property_d_t_o.map((prop) => prop.sku_image).filter(Boolean)
      : []);
  const price = selectedProduct.price || (selectedProduct.sku && selectedProduct.sku.offer_sale_price) || 'N/A';
  const currency = selectedProduct.currency || (selectedProduct.sku && selectedProduct.sku.converted_currency) || '';
  const productId = selectedProduct.productId || (selectedProduct.sku && selectedProduct.sku.sku_id) || 'N/A';

  // Mock analytics data (replace with real API calls)
  const analytics = {
    views: { total: 1247, today: 23, week: 156, month: 892 },
    clicks: { total: 89, today: 3, week: 12, month: 67 },
    orders: { total: 12, today: 0, week: 2, month: 8 },
    revenue: { total: 2400, today: 0, week: 400, month: 1800 },
    conversionRate: 13.5,
    avgOrderValue: 200,
    rating: 4.2,
    reviews: 8
  };

  const performanceMetrics = [
    { label: 'Total Views', value: analytics.views.total, icon: Eye, color: 'blue', change: '+12%' },
    { label: 'Total Clicks', value: analytics.clicks.total, icon: MousePointer, color: 'green', change: '+8%' },
    { label: 'Total Orders', value: analytics.orders.total, icon: ShoppingCart, color: 'purple', change: '+15%' },
    { label: 'Revenue', value: `$${analytics.revenue.total}`, icon: DollarSign, color: 'emerald', change: '+23%' },
    { label: 'Conversion Rate', value: `${analytics.conversionRate}%`, icon: TrendingUp, color: 'orange', change: '+5%' },
    { label: 'Avg Order Value', value: `$${analytics.avgOrderValue}`, icon: Package, color: 'indigo', change: '+7%' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'details', label: 'Product Details', icon: Package },
    { id: 'actions', label: 'Quick Actions', icon: Edit }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.length > 0 ? (
                  images.slice(0, 8).map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`${title} ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 group-hover:shadow-md transition-shadow"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-gray-400 text-center py-12">
                    <Package className="w-12 h-12 mx-auto mb-3" />
                    <p>No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl border shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <span className="text-sm font-medium text-green-600">{metric.change}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <ProductAnalytics productId={selectedProduct._id} analytics={analytics} />
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="font-semibold text-green-600">{analytics.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Average Order Value</span>
                    <span className="font-semibold text-blue-600">${analytics.avgOrderValue}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Customer Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{analytics.rating}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= analytics.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">New order received</span>
                    <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm">Product viewed 15 times</span>
                    <span className="text-xs text-gray-500 ml-auto">4h ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm">New review added</span>
                    <span className="text-xs text-gray-500 ml-auto">1d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-5 h-5 ${star <= analytics.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{analytics.rating}</span>
                  <span className="text-sm text-gray-500">({analytics.reviews} reviews)</span>
                </div>
              </div>
              
              {/* Mock reviews */}
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium">Customer {review}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Great product! Fast delivery and excellent quality. Highly recommended.</p>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Product Name</span>
                    <span className="font-semibold">{title}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Product ID</span>
                    <span className="font-semibold">{productId}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Price</span>
                    <span className="font-semibold">{currency} {price}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Country</span>
                    <span className="font-semibold">{selectedProduct.country}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Currency</span>
                    <span className="font-semibold">{selectedProduct.currency}</span>
                  </div>
                  {selectedProduct.rate && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Exchange Rate</span>
                      <span className="font-semibold">{selectedProduct.rate}</span>
                    </div>
                  )}
                </div>

                {selectedProduct.sku && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">SKU Details</h4>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">SKU ID</span>
                      <span className="font-semibold">{selectedProduct.sku.sku_id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Original Price</span>
                      <span className="font-semibold">{selectedProduct.sku.original_price}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Sale Price</span>
                      <span className="font-semibold">{selectedProduct.sku.offer_sale_price}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Bulk Price</span>
                      <span className="font-semibold">{selectedProduct.sku.offer_bulk_sale_price}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'actions':
        return (
          <div className="space-y-6">
            <ProductQuickActions 
              product={selectedProduct} 
              onAction={(action, product) => {
                switch (action) {
                  case 'view':
                    // Already on view page
                    break;
                  case 'edit':
                    navigate(`${ADMIN_PATHS.PRODUCTS.EDIT}${product._id}`);
                    break;
                  case 'analytics':
                    setActiveTab('analytics');
                    break;
                  default:
                    break;
                }
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-1">Product ID: {productId}</p>
            </div>
            
            <div className="flex gap-3">
              <a 
                href={`https://www.aliexpress.com/item/${selectedProduct.productId}.html`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View on AliExpress
              </a>
              <Link 
                to={`${ADMIN_PATHS.PRODUCTS.EDIT}${selectedProduct._id}`}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Product
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage; 