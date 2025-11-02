import React from 'react'; 

export default function Addresses(){
  return (
    <div activeKey="addresses" pageTitle="Addresses">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Shipping & Billing Addresses</div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-[#E0E0E0] rounded">
              <p className="text-sm text-gray-500">Default Shipping Address</p>
              <p className="mt-1 font-semibold text-[#333333]">Al Sadman Awal</p>
              <p className="text-sm text-gray-600">123 Main Street, Dhaka</p>
              <p className="text-sm text-gray-600">Bangladesh</p>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <a href="#" className="text-[#D2042D] hover:underline">Edit</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-gray-500 hover:underline">Remove</a>
              </div>
            </div>
            <div className="p-4 border border-[#E0E0E0] rounded">
              <p className="text-sm text-gray-500">Billing Address</p>
              <p className="mt-1 font-semibold text-[#333333]">Same as shipping</p>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <a href="#" className="text-[#D2042D] hover:underline">Manage</a>
              </div>
            </div>
            <div className="p-4 border border-[#E0E0E0] rounded">
              <p className="text-sm text-gray-500">Secondary Address</p>
              <p className="mt-1 font-semibold text-[#333333]">Office</p>
              <p className="text-sm text-gray-600">56 Kawran Bazar, Dhaka</p>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <a href="#" className="text-[#D2042D] hover:underline">Edit</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-gray-500 hover:underline">Remove</a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#333333] mb-3">Add New Address</h3>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address Line</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm">
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>USA</option>
                </select>
              </div>
              <div className="md:col-span-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Set as default shipping</label>
                <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded text-sm">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
