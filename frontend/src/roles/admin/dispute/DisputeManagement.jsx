import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDisputes, updateDisputeStatus } from '../../../features/disputeSlice';
import { 
  AlertCircle, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Filter, 
  Search, 
  Eye, 
  MessageCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  FileText,
  User,
  Calendar,
  DollarSign,
  Shield,
  Activity,
  Settings,
  Send,
  Reply,
  Flag,
  Star,
  Phone,
  Mail,
  MapPin,
  Package,
  CreditCard,
  Truck,
  Star as StarIcon
} from 'lucide-react';

const DisputeManagement = () => {
  const dispatch = useDispatch();
  const { disputes, loading, error } = useSelector((state) => state.dispute);
  
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
    search: ''
  });
  const [resolutionForm, setResolutionForm] = useState({
    action: '',
    amount: '',
    currency: 'USD',
    notes: ''
  });
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    dispatch(getAllDisputes());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleStatusUpdate = async (disputeId, status) => {
    try {
      await dispatch(updateDisputeStatus({ disputeId, status })).unwrap();
      // Refresh disputes
      dispatch(getAllDisputes());
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleResolutionSubmit = async () => {
    if (!selectedDispute || !resolutionForm.action) return;
    
    try {
      const resolution = {
        action: resolutionForm.action,
        amount: resolutionForm.amount ? parseFloat(resolutionForm.amount) : undefined,
        currency: resolutionForm.currency,
        notes: resolutionForm.notes
      };
      
      await dispatch(updateDisputeStatus({ 
        disputeId: selectedDispute._id, 
        status: 'resolved',
        resolution 
      })).unwrap();
      
      setResolutionForm({
        action: '',
        amount: '',
        currency: 'USD',
        notes: ''
      });
      
      // Refresh disputes
      dispatch(getAllDisputes());
    } catch (error) {
      console.error('Failed to submit resolution:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'under_review':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'escalated':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      order_issue: 'Order Issue',
      delivery_problem: 'Delivery Problem',
      product_quality: 'Product Quality',
      payment_issue: 'Payment Issue',
      refund_request: 'Refund Request',
      general_complaint: 'General Complaint',
      appeal: 'Appeal'
    };
    return categories[category] || category;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || colors.medium;
  };

  const filteredDisputes = disputes?.filter(dispute => {
    if (filters.status && dispute.status !== filters.status) return false;
    if (filters.category && dispute.category !== filters.category) return false;
    if (filters.priority && dispute.priority !== filters.priority) return false;
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        dispute.subject.toLowerCase().includes(searchTerm) ||
        dispute.description.toLowerCase().includes(searchTerm) ||
        dispute.user?.name?.toLowerCase().includes(searchTerm) ||
        dispute.order?.orderNumber?.toLowerCase().includes(searchTerm)
      );
    }
    return true;
  });

  // Analytics data
  const analytics = {
    total: disputes?.length || 0,
    open: disputes?.filter(d => d.status === 'open').length || 0,
    underReview: disputes?.filter(d => d.status === 'under_review').length || 0,
    resolved: disputes?.filter(d => d.status === 'resolved').length || 0,
    escalated: disputes?.filter(d => d.status === 'escalated').length || 0,
    urgent: disputes?.filter(d => d.priority === 'urgent').length || 0,
    avgResolutionTime: '2.5 days',
    satisfactionRate: '94.2%'
  };

  const MetricCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const DisputeCard = ({ dispute }) => {
    const status = dispute.status;
    const priority = dispute.priority;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              status === 'open' ? 'bg-blue-100' :
              status === 'under_review' ? 'bg-yellow-100' :
              status === 'resolved' ? 'bg-green-100' :
              status === 'escalated' ? 'bg-red-100' :
              'bg-gray-100'
            }`}>
              {getStatusIcon(status)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{dispute.subject}</h3>
              <p className="text-sm text-gray-500">{dispute.user?.name || 'Unknown User'}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
            {priority}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">{dispute.description.substring(0, 100)}...</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Category</p>
              <p className="font-medium text-gray-900">{getCategoryLabel(dispute.category)}</p>
            </div>
            <div>
              <p className="text-gray-600">Created</p>
              <p className="font-medium text-gray-900">{new Date(dispute.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Messages</p>
              <p className="font-medium text-gray-900">{dispute.messages?.length || 0}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedDispute(dispute)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Reply">
                  <Reply className="w-4 h-4" />
                </button>
                <button className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors" title="Escalate">
                  <Flag className="w-4 h-4" />
                </button>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dispute Management</h1>
              <p className="text-gray-600 mt-2">Manage and resolve customer disputes efficiently</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>New Dispute</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Disputes"
            value={analytics.total}
            change="+5.2%"
            trend="up"
            icon={FileText}
            color="blue"
          />
          <MetricCard
            title="Open Cases"
            value={analytics.open}
            change="+12.3%"
            trend="up"
            icon={Clock}
            color="yellow"
          />
          <MetricCard
            title="Resolved"
            value={analytics.resolved}
            change="+8.7%"
            trend="up"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="Urgent Cases"
            value={analytics.urgent}
            change="+2.1%"
            trend="down"
            icon={AlertTriangle}
            color="red"
          />
        </div>

        {/* Dispute Status Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispute Status Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{analytics.open}</p>
              <p className="text-sm text-blue-700">Open</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{analytics.underReview}</p>
              <p className="text-sm text-yellow-700">Under Review</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{analytics.resolved}</p>
              <p className="text-sm text-green-700">Resolved</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{analytics.escalated}</p>
              <p className="text-sm text-red-700">Escalated</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Activity className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-600">{analytics.avgResolutionTime}</p>
              <p className="text-sm text-gray-700">Avg Resolution</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search disputes..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="under_review">Under Review</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                <option value="escalated">Escalated</option>
              </select>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="order_issue">Order Issue</option>
                <option value="delivery_problem">Delivery Problem</option>
                <option value="product_quality">Product Quality</option>
                <option value="payment_issue">Payment Issue</option>
                <option value="refund_request">Refund Request</option>
                <option value="general_complaint">General Complaint</option>
                <option value="appeal">Appeal</option>
              </select>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters({ status: '', category: '', priority: '', search: '' })}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Disputes List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Disputes ({filteredDisputes?.length || 0})</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredDisputes?.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No disputes found</p>
                  </div>
                ) : (
                  filteredDisputes?.map((dispute) => (
                    <div
                      key={dispute._id}
                      onClick={() => setSelectedDispute(dispute)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedDispute?._id === dispute._id ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm truncate">{dispute.subject}</h4>
                        {getStatusIcon(dispute.status)}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {dispute.user?.name || 'Unknown User'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(dispute.priority)}`}>
                          {dispute.priority}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(dispute.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Dispute Details */}
          <div className="lg:col-span-2">
            {selectedDispute ? (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedDispute.subject}</h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedDispute.status)}
                      <span className="text-sm font-medium capitalize">{selectedDispute.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-600">User:</span>
                      <p className="font-medium">{selectedDispute.user?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <p className="font-medium">{getCategoryLabel(selectedDispute.category)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Priority:</span>
                      <p className="font-medium capitalize">{selectedDispute.priority}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <p className="font-medium">{new Date(selectedDispute.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2 text-gray-900">Description</h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border">{selectedDispute.description}</p>
                  </div>

                  {/* Messages */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-4 flex items-center text-gray-900">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Messages ({selectedDispute.messages?.length || 0})
                    </h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {selectedDispute.messages?.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium capitalize">{message.sender}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-gray-900">Update Status</h4>
                    <div className="flex space-x-2">
                      {['open', 'under_review', 'resolved', 'closed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(selectedDispute._id, status)}
                          disabled={selectedDispute.status === status}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            selectedDispute.status === status
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {status.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resolution Form */}
                  {selectedDispute.status === 'under_review' && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-3">Resolution</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Action</label>
                          <select
                            value={resolutionForm.action}
                            onChange={(e) => setResolutionForm({ ...resolutionForm, action: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Action</option>
                            <option value="refund">Full Refund</option>
                            <option value="partial_refund">Partial Refund</option>
                            <option value="replacement">Replacement</option>
                            <option value="compensation">Compensation</option>
                            <option value="no_action">No Action</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        {resolutionForm.action && resolutionForm.action !== 'no_action' && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Amount</label>
                            <div className="flex space-x-2">
                              <input
                                type="number"
                                value={resolutionForm.amount}
                                onChange={(e) => setResolutionForm({ ...resolutionForm, amount: e.target.value })}
                                placeholder="0.00"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <select
                                value={resolutionForm.currency}
                                onChange={(e) => setResolutionForm({ ...resolutionForm, currency: e.target.value })}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="BDT">BDT</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Notes</label>
                        <textarea
                          value={resolutionForm.notes}
                          onChange={(e) => setResolutionForm({ ...resolutionForm, notes: e.target.value })}
                          rows="3"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Additional notes about the resolution..."
                        />
                      </div>
                      
                      <div className="mt-4">
                        <button
                          onClick={handleResolutionSubmit}
                          disabled={!resolutionForm.action}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          Submit Resolution
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Resolution Info */}
                  {selectedDispute.resolution && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Resolution Applied</h4>
                      <div className="text-sm text-green-700">
                        <p><strong>Action:</strong> {selectedDispute.resolution.action}</p>
                        {selectedDispute.resolution.amount && (
                          <p><strong>Amount:</strong> {selectedDispute.resolution.amount} {selectedDispute.resolution.currency}</p>
                        )}
                        {selectedDispute.resolution.notes && (
                          <p><strong>Notes:</strong> {selectedDispute.resolution.notes}</p>
                        )}
                        <p><strong>Resolved:</strong> {new Date(selectedDispute.resolution.resolvedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a dispute to view details</p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputeManagement; 