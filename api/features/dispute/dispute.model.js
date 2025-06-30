const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false // Optional, as disputes can be about general issues
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['order_issue', 'delivery_problem', 'product_quality', 'payment_issue', 'refund_request', 'general_complaint', 'appeal'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'under_review', 'resolved', 'closed', 'escalated'],
    default: 'open'
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  evidence: [{
    type: String, // URLs to uploaded files/images
    required: false
  }],
  adminResponse: {
    message: String,
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    respondedAt: Date
  },
  resolution: {
    action: {
      type: String,
      enum: ['refund', 'replacement', 'partial_refund', 'compensation', 'no_action', 'other']
    },
    amount: Number,
    currency: String,
    notes: String,
    resolvedAt: Date
  },
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    attachments: [String] // URLs to files
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: Date,
  escalationLevel: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Index for better query performance
disputeSchema.index({ user: 1, status: 1 });
disputeSchema.index({ order: 1 });
disputeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Dispute', disputeSchema); 