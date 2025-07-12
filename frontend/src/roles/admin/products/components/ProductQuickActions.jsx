import React, { useState } from 'react';
import { 
  Edit, 
  Eye, 
  Copy, 
  Share2, 
  Download, 
  Trash2, 
  Archive, 
  Star,
  TrendingUp,
  Settings,
  MoreVertical,
  ExternalLink,
  Link as LinkIcon,
  QrCode,
  BarChart3
} from 'lucide-react';
import { toast } from 'react-toastify';

const ProductQuickActions = ({ product, onAction }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action) => {
    setShowMenu(false);
    
    switch (action) {
      case 'view':
        onAction?.('view', product);
        break;
      case 'edit':
        onAction?.('edit', product);
        break;
      case 'copy':
        navigator.clipboard.writeText(product.productId || product._id);
        toast.success('Product ID copied to clipboard');
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: product.name || 'Product',
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard');
        }
        break;
      case 'download':
        // Generate product data for download
        const dataStr = JSON.stringify(product, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `product-${product.productId || product._id}.json`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('Product data downloaded');
        break;
      case 'archive':
        onAction?.('archive', product);
        toast.info('Archive functionality coming soon');
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this product?')) {
          onAction?.('delete', product);
        }
        break;
      case 'analytics':
        onAction?.('analytics', product);
        break;
      case 'external':
        if (product.productId) {
          window.open(`https://www.aliexpress.com/item/${product.productId}.html`, '_blank');
        }
        break;
      default:
        break;
    }
  };

  const actions = [
    {
      id: 'view',
      label: 'View Details',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      id: 'edit',
      label: 'Edit Product',
      icon: Edit,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      id: 'external',
      label: 'View on AliExpress',
      icon: ExternalLink,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    },
    {
      id: 'copy',
      label: 'Copy Product ID',
      icon: Copy,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    },
    {
      id: 'share',
      label: 'Share Product',
      icon: Share2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100'
    },
    {
      id: 'download',
      label: 'Download Data',
      icon: Download,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 hover:bg-teal-100'
    },
    {
      id: 'archive',
      label: 'Archive Product',
      icon: Archive,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100'
    },
    {
      id: 'delete',
      label: 'Delete Product',
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100'
    }
  ];

  return (
    <div className="relative">
      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {actions.slice(0, 4).map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${action.bgColor} ${action.color}`}
          >
            <action.icon className="w-4 h-4" />
            {action.label}
          </button>
        ))}
        
        {/* More Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
            More
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border shadow-lg z-10">
              {actions.slice(4).map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${action.color}`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Status Badge */}
      <div className="flex items-center gap-4 mb-4">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          product.status === 'published' ? 'bg-green-100 text-green-800' :
          product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {product.status || 'draft'}
        </span>
        
        {product.featured && (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
            <Star className="w-3 h-3" />
            Featured
          </span>
        )}
        
        {product.trending && (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
            <TrendingUp className="w-3 h-3" />
            Trending
          </span>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-3 rounded-lg border text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.floor(Math.random() * 1000) + 100}
          </div>
          <div className="text-xs text-gray-600">Views</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border text-center">
          <div className="text-2xl font-bold text-green-600">
            {Math.floor(Math.random() * 50) + 1}
          </div>
          <div className="text-xs text-gray-600">Orders</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border text-center">
          <div className="text-2xl font-bold text-purple-600">
            ${Math.floor(Math.random() * 1000) + 100}
          </div>
          <div className="text-xs text-gray-600">Revenue</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {(Math.random() * 2 + 3).toFixed(1)}
          </div>
          <div className="text-xs text-gray-600">Rating</div>
        </div>
      </div>

      {/* Product Links */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Product Links</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Product ID:</span>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.productId || product._id}
            </code>
          </div>
          
          {product.sku?.sku_id && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">SKU ID:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {product.sku.sku_id}
              </code>
            </div>
          )}
          
          {product.productId && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AliExpress URL:</span>
              <a
                href={`https://www.aliexpress.com/item/${product.productId}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                View
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickActions; 