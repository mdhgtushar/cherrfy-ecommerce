import React from 'react'; 

export default function Reviews(){
  return (
    <div activeKey="reviews" pageTitle="Product Reviews">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Your Product Reviews</div>
        <div className="p-6 space-y-4">
          <div className="p-4 border border-[#E0E0E0] rounded bg-white">
            <p className="font-semibold text-[#333333]">Wireless Bluetooth Earbuds</p>
            <div className="mt-1 text-sm text-gray-600">Rated 5/5 · "Great sound and battery life!"</div>
            <div className="mt-2 space-x-3">
              <a href="#" className="text-sm text-[#D2042D] hover:underline">Edit Review</a>
              <a href="#" className="text-sm text-gray-500 hover:underline">Delete</a>
            </div>
          </div>
          <div className="p-4 border border-[#E0E0E0] rounded bg-white">
            <p className="font-semibold text-[#333333]">Luxury Silver Bracelet</p>
            <div className="mt-1 text-sm text-gray-600">Rated 4/5 · "Nice shine, good price."</div>
            <div className="mt-2 space-x-3">
              <a href="#" className="text-sm text-[#D2042D] hover:underline">Edit Review</a>
              <a href="#" className="text-sm text-gray-500 hover:underline">Delete</a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white border border-[#E0E0E0] rounded">
          <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Write a Review</div>
          <div className="p-6">
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product</label>
                <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm">
                  <option>Hiphop Cross Necklace</option>
                  <option>Magnetic Phone Case</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm">
                  <option>5 - Excellent</option>
                  <option>4 - Good</option>
                  <option>3 - Average</option>
                  <option>2 - Poor</option>
                  <option>1 - Terrible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Review</label>
                <textarea className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" rows="3" placeholder="Share your experience..."></textarea>
              </div>
              <button type="button" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded text-sm">Submit Review</button>
            </form>
          </div>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded">
          <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Pending Reviews</div>
          <div className="p-6 space-y-3">
            <div className="p-4 border border-[#E0E0E0] rounded flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#333333]">Designer Sunglasses</p>
                <p className="text-xs text-gray-600">Delivered 2025-10-05</p>
              </div>
              <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded">Review</a>
            </div>
            <div className="p-4 border border-[#E0E0E0] rounded flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#333333]">Professional Hair Trimmer Set</p>
                <p className="text-xs text-gray-600">Delivered 2025-09-28</p>
              </div>
              <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded">Review</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
