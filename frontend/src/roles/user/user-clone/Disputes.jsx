import React from 'react';
import SharedLayout from './SharedLayout.jsx';

export default function Disputes(){
  return (
    <SharedLayout activeKey="disputes" pageTitle="Disputes / Tickets">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Disputes / Tickets</div>
        <div className="p-6">
          <p className="text-sm text-gray-600">Open support tickets and track their status.</p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              <div className="p-4 border border-[#E0E0E0] rounded">
                <p className="font-semibold text-[#333333]">Ticket #2025-001 · Order not received</p>
                <p className="text-sm text-gray-600">Order #17345 · Opened: 2025-10-18</p>
                <p className="text-sm text-orange-600 mt-1">Status: Pending</p>
              </div>
              <div className="p-4 border border-[#E0E0E0] rounded">
                <p className="font-semibold text-[#333333]">Ticket #2025-002 · Refund inquiry</p>
                <p className="text-sm text-gray-600">Order #17110 · Opened: 2025-10-06</p>
                <p className="text-sm text-green-600 mt-1">Status: Resolved</p>
              </div>
            </div>
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Open New Ticket</div>
              <div className="p-6">
                <form className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm">
                      <option>Order Issue</option>
                      <option>Payment Issue</option>
                      <option>Product Quality</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID (optional)</label>
                    <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="#17345" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="Brief summary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" rows="4" placeholder="Describe your issue..."></textarea>
                  </div>
                  <button type="button" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded text-sm">Submit Ticket</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
