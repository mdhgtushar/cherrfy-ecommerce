import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Download,
  Eye,
  EyeOff,
  Settings,
  RefreshCw,
  BarChart3,
  Package,
  DollarSign,
  Tag,
  Globe,
  Calendar,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  Pause,
  Stop,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Edit,
  Copy,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-toastify';

const ImportProductPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('idle'); // idle, preview, importing, completed
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState({ search: '', status: 'all' });
  const [importHistory, setImportHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please select a valid CSV or Excel file.');
        return;
      }
      
      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB.');
        return;
      }

      setFile(selectedFile);
      setError('');
      setPreview([]);
      setImportStatus('idle');
      setSelectedRows([]);
    }
  };

  const handlePreview = async () => {
    if (!file) return setError('Please select a file.');
    
    setLoading(true);
    setError('');
    
    // Simulate file processing
    setTimeout(() => {
      const mockData = [
        { 
          id: 1, 
          name: 'Wireless Bluetooth Headphones', 
          price: 89.99, 
          sku: 'WH-001', 
          category: 'Electronics',
          status: 'valid',
          description: 'High-quality wireless headphones with noise cancellation'
        },
        { 
          id: 2, 
          name: 'Smart Fitness Watch', 
          price: 199.99, 
          sku: 'SFW-002', 
          category: 'Electronics',
          status: 'valid',
          description: 'Advanced fitness tracking with heart rate monitor'
        },
        { 
          id: 3, 
          name: 'Organic Cotton T-Shirt', 
          price: 24.99, 
          sku: 'OCT-003', 
          category: 'Clothing',
          status: 'warning',
          description: 'Comfortable organic cotton t-shirt'
        },
        { 
          id: 4, 
          name: 'Kitchen Blender Pro', 
          price: 149.99, 
          sku: 'KBP-004', 
          category: 'Home & Garden',
          status: 'valid',
          description: 'Professional grade kitchen blender'
        },
        { 
          id: 5, 
          name: 'Gaming Mouse RGB', 
          price: 79.99, 
          sku: 'GMR-005', 
          category: 'Electronics',
          status: 'error',
          description: 'RGB gaming mouse with programmable buttons'
        }
      ];
      
      setPreview(mockData);
      setLoading(false);
      setImportStatus('preview');
      toast.success('File preview generated successfully!');
    }, 2000);
  };

  const handleImport = async () => {
    if (preview.length === 0) return;
    
    setImporting(true);
    setImportProgress(0);
    setImportStatus('importing');
    
    // Simulate import process
    const totalItems = preview.length;
    let completed = 0;
    
    const importInterval = setInterval(() => {
      completed += 1;
      const progress = Math.round((completed / totalItems) * 100);
      setImportProgress(progress);
      
      if (completed >= totalItems) {
        clearInterval(importInterval);
        setImporting(false);
        setImportStatus('completed');
        
        // Add to import history
        const importRecord = {
          id: Date.now(),
          filename: file.name,
          totalItems: totalItems,
          importedItems: totalItems - preview.filter(item => item.status === 'error').length,
          failedItems: preview.filter(item => item.status === 'error').length,
          timestamp: new Date().toISOString(),
          status: 'completed'
        };
        
        setImportHistory(prev => [importRecord, ...prev]);
        toast.success(`Import completed! ${importRecord.importedItems} products imported successfully.`);
      }
    }, 500);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(preview.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } };
      handleFileChange(event);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredPreview = preview.filter(item => {
    const searchMatch = filter.search 
      ? item.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.sku.toLowerCase().includes(filter.search.toLowerCase())
      : true;
    const statusMatch = filter.status === 'all' || item.status === filter.status;
    return searchMatch && statusMatch;
  });

  const stats = {
    total: preview.length,
    valid: preview.filter(item => item.status === 'valid').length,
    warning: preview.filter(item => item.status === 'warning').length,
    error: preview.filter(item => item.status === 'error').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Import Products</h1>
              <p className="text-gray-600 mt-1">Bulk import products from CSV or Excel files with validation and preview</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download Template
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                Import Settings
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Import Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload File</h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  file ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                
                {file ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">{file.name}</p>
                    <p className="text-sm text-gray-600 mb-4">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => {
                        setFile(null);
                        setPreview([]);
                        setImportStatus('idle');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Supports CSV and Excel files up to 5MB
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800">{error}</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handlePreview}
                  disabled={!file || loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {loading ? 'Processing...' : 'Preview Data'}
                </button>
                
                {importStatus === 'preview' && (
                  <button
                    onClick={handleImport}
                    disabled={importing}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {importing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Package className="w-4 h-4" />
                    )}
                    {importing ? 'Importing...' : 'Import Products'}
                  </button>
                )}
              </div>
            </div>

            {/* Import Progress */}
            {importing && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Processing products...</span>
                    <span className="text-sm font-medium text-gray-900">{importProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{Math.round((importProgress / 100) * preview.length)} of {preview.length} products processed</span>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Table */}
            {preview.length > 0 && (
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Data Preview</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={filter.search}
                          onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                        />
                      </div>
                      <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filter.status}
                        onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                      >
                        <option value="all">All Status</option>
                        <option value="valid">Valid</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === preview.length && preview.length > 0}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredPreview.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(item.id)}
                              onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            ${item.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.sku}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.category}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                              {getStatusIcon(item.status)}
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-700">
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Total Items</span>
                  </div>
                  <span className="font-semibold text-blue-900">{stats.total}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Valid</span>
                  </div>
                  <span className="font-semibold text-green-900">{stats.valid}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Warnings</span>
                  </div>
                  <span className="font-semibold text-yellow-900">{stats.warning}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-900">Errors</span>
                  </div>
                  <span className="font-semibold text-red-900">{stats.error}</span>
                </div>
              </div>
            </div>

            {/* Import History */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Imports</h3>
              <div className="space-y-3">
                {importHistory.slice(0, 5).map((record) => (
                  <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{record.filename}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{record.importedItems} imported</span>
                      {record.failedItems > 0 && (
                        <span className="text-red-600">{record.failedItems} failed</span>
                      )}
                    </div>
                  </div>
                ))}
                {importHistory.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No recent imports</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download Template
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  Import Settings
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Export History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportProductPage; 