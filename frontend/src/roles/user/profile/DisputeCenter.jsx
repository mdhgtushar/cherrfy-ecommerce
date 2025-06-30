import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDispute, getUserDisputes, addMessage, getDisputeStats } from '../../../features/disputeSlice';
import { AlertCircle, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle, Plus, Send } from 'lucide-react';

const DisputeCenter = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { disputes, stats, loading, error } = useSelector((state) => state.dispute);
  
  const [activeTab, setActiveTab] = useState('new');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [form, setForm] = useState({
    subject: '',
    orderId: '',
    category: 'general_complaint',
    description: '',
    evidence: []
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getUserDisputes());
    dispatch(getDisputeStats());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDispute(form)).unwrap();
      setSubmitted(true);
      setForm({
        subject: '',
        orderId: '',
        category: 'general_complaint',
        description: '',
        evidence: []
      });
      // Refresh disputes list
      dispatch(getUserDisputes());
      dispatch(getDisputeStats());
    } catch (error) {
      console.error('Failed to create dispute:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedDispute) return;
    
    try {
      await dispatch(addMessage({
        disputeId: selectedDispute._id,
        message: newMessage
      })).unwrap();
      setNewMessage('');
      // Refresh the selected dispute
      const updatedDispute = disputes.find(d => d._id === selectedDispute._id);
      setSelectedDispute(updatedDispute);
    } catch (error) {
      console.error('Failed to send message:', error);
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Dispute Center / Appeal</h1>
        <p className="text-gray-600">
          Submit disputes, track their progress, and communicate with our support team.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Disputes</p>
              <p className="text-2xl font-semibold">{stats?.total || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Open Cases</p>
              <p className="text-2xl font-semibold">{stats?.open || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-semibold">
                {stats?.byStatus?.find(s => s._id === 'resolved')?.count || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Escalated</p>
              <p className="text-2xl font-semibold">
                {stats?.byStatus?.find(s => s._id === 'escalated')?.count || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow border mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('new')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'new'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              New Dispute
            </button>
            <button
              onClick={() => setActiveTab('existing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'existing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              My Disputes ({disputes?.length || 0})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'new' && (
            <div>
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  ✅ Your dispute has been submitted successfully. We will review and respond within 48 hours.
                  <button
                    onClick={() => setSubmitted(false)}
                    className="ml-4 text-green-800 underline"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Category *</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general_complaint">General Complaint</option>
                        <option value="order_issue">Order Issue</option>
                        <option value="delivery_problem">Delivery Problem</option>
                        <option value="product_quality">Product Quality</option>
                        <option value="payment_issue">Payment Issue</option>
                        <option value="refund_request">Refund Request</option>
                        <option value="appeal">Appeal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Order ID (if applicable)</label>
                    <input
                      type="text"
                      name="orderId"
                      value={form.orderId}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., #123456"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Detailed Description *</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Please provide detailed information about your issue, including any relevant dates, order numbers, and specific problems you encountered..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Submit Dispute
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === 'existing' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Disputes List */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold mb-4">Your Disputes</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {disputes?.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No disputes found</p>
                  ) : (
                    disputes?.map((dispute) => (
                      <div
                        key={dispute._id}
                        onClick={() => setSelectedDispute(dispute)}
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                          selectedDispute?._id === dispute._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm truncate">{dispute.subject}</h4>
                          {getStatusIcon(dispute.status)}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          {getCategoryLabel(dispute.category)}
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

              {/* Dispute Details */}
              <div className="lg:col-span-2">
                {selectedDispute ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{selectedDispute.subject}</h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedDispute.status)}
                        <span className="text-sm font-medium capitalize">{selectedDispute.status.replace('_', ' ')}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                        <div>
                          <span className="text-gray-600">Messages:</span>
                          <p className="font-medium">{selectedDispute.messages?.length || 0}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-gray-700 bg-white p-3 rounded border">{selectedDispute.description}</p>
                    </div>

                    {/* Messages */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Messages</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedDispute.messages?.map((message, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${
                              message.sender === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'
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

                    {/* Add Message */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Resolution Info */}
                    {selectedDispute.resolution && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Resolution</h4>
                        <div className="text-sm text-green-700">
                          <p><strong>Action:</strong> {selectedDispute.resolution.action}</p>
                          {selectedDispute.resolution.amount && (
                            <p><strong>Amount:</strong> {selectedDispute.resolution.amount} {selectedDispute.resolution.currency}</p>
                          )}
                          {selectedDispute.resolution.notes && (
                            <p><strong>Notes:</strong> {selectedDispute.resolution.notes}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a dispute to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default DisputeCenter;
