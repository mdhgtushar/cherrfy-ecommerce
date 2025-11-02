import React from 'react';
import SharedLayout from './SharedLayout.jsx';

export default function Returns(){
  return (
    <SharedLayout activeKey="returns" pageTitle="Returns & Refunds">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E0E0E0] rounded p-4">
          <p className="text-xs text-gray-500">Return window</p>
          <p className="text-xl font-bold text-[#333333] mt-1">15 days</p>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded p-4">
          <p className="text-xs text-gray-500">Open returns</p>
          <p className="text-xl font-bold text-[#333333] mt-1">1</p>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded p-4">
          <p className="text-xs text-gray-500">Last refund</p>
          <p className="text-xl font-bold text-[#333333] mt-1">$29.99</p>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Start a Return</div>
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Order ID</label>
              <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="#17345" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Item</label>
              <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm">
                <option>Hiphop Cross Necklace</option>
                <option>Designer Sunglasses</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm">
                <option>Damaged</option>
                <option>Wrong item</option>
                <option>Not as described</option>
                <option>Changed mind</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Additional Details</label>
              <textarea className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" rows="3" placeholder="Describe the issue..."></textarea>
            </div>
            <div className="md:col-span-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">By submitting, you agree to our Return Policy.</p>
              <button type="button" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded text-sm">Submit Return</button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Return History</div>
        <div className="p-6 space-y-3">
          <div className="p-4 border border-[#E0E0E0] rounded flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#333333]">Return #R-1001 · Order #17110</p>
              <p className="text-xs text-gray-600">Item: Luxury Silver Bracelet</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Refunded</span>
          </div>
          <div className="p-4 border border-[#E0E0E0] rounded flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#333333]">Return #R-1002 · Order #17088</p>
              <p className="text-xs text-gray-600">Item: Designer Sunglasses</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Processing</span>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
