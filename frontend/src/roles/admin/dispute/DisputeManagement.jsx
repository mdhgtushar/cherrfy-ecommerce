import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDisputes, updateDisputeStatus } from '../../../features/disputeSlice';
import { AlertCircle, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle, Filter, Search, Eye, MessageCircle } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Dispute Management</h1>
        <p className="text-gray-600">
          Manage and resolve customer disputes and appeals
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 mr-2" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search disputes..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ status: '', category: '', priority: '', search: '' })}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disputes List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Disputes ({filteredDisputes?.length || 0})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredDisputes?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No disputes found</p>
              ) : (
                filteredDisputes?.map((dispute) => (
                  <div
                    key={dispute._id}
                    onClick={() => setSelectedDispute(dispute)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
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
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{selectedDispute.subject}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedDispute.status)}
                    <span className="text-sm font-medium capitalize">{selectedDispute.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
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

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded border">{selectedDispute.description}</p>
                </div>

                {/* Messages */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2 flex items-center">
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
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Update Status</h4>
                  <div className="flex space-x-2">
                    {['open', 'under_review', 'resolved', 'closed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedDispute._id, status)}
                        disabled={selectedDispute.status === status}
                        className={`px-3 py-1 rounded text-sm ${
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
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Resolution</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Action</label>
                        <select
                          value={resolutionForm.action}
                          onChange={(e) => setResolutionForm({ ...resolutionForm, action: e.target.value })}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                              value={resolutionForm.currency}
                              onChange={(e) => setResolutionForm({ ...resolutionForm, currency: e.target.value })}
                              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Additional notes about the resolution..."
                      />
                    </div>
                    
                    <div className="mt-4">
                      <button
                        onClick={handleResolutionSubmit}
                        disabled={!resolutionForm.action}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
            <div className="bg-white rounded-lg shadow border p-8 text-center text-gray-500">
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
  );
};

export default DisputeManagement; 