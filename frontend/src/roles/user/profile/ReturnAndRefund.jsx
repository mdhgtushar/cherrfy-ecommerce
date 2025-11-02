import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { createReturnRefund, getUserReturnRefunds } from '../../../features/returnRefundSlice'; 

export default function Returns(){
  const returns = useSelector(state => state.returns.userRequests);
  const dispatch = useDispatch(); 
  const [returnData, setReturnData] = useState({
    order: '',
    product: '',
    reason: '',
    details: ''
  });
  
  useEffect(() => {
    // Dispatch action to fetch return and refund data
    dispatch(getUserReturnRefunds());
  } , [dispatch]);

  const saveReturnRequest = () => {
    // Logic to save return request can be added here
    dispatch(createReturnRefund(returnData));
    setReturnData({
      order: '',
      product: '',
      reason: '',
      details: ''
    });
  }
  return (
    <div activeKey="returns" pageTitle="Returns & Refunds">
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
              <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="#17345" onChange={(e) => setReturnData({...returnData, order: e.target.value})} value={returnData.order} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Item</label>
              <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" onChange={(e) => setReturnData({...returnData, product: e.target.value})} value={returnData.product}>
                <option value="6856bdc15fa235d5e41bee6d">Hiphop Cross Necklace</option>
                <option value="6856bd455fa235d5e41bee66">Designer Sunglasses</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" onChange={(e) => setReturnData({...returnData, reason: e.target.value})} value={returnData.reason}>
                <option>Damaged item</option>
                <option>Wrong item received</option>
                {/* <option>Wrong item</option>
                <option>Not as described</option>
                <option>Changed mind</option> */}
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Additional Details</label>
              <textarea className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" rows="3" placeholder="Describe the issue..." onChange={(e) => setReturnData({...returnData, details: e.target.value})} value={returnData.details}></textarea>
            </div>
            <div className="md:col-span-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">By submitting, you agree to our Return Policy.</p>
              <button type="button" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded text-sm" onClick={saveReturnRequest}>Submit Return</button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Return History</div>
        <div className="p-6 space-y-3">

          {returns.length === 0 && (<p className="text-sm text-gray-600">No return or refund requests found.</p>
          )}
          {returns.map((ret) => (
            <div className="p-4 border border-[#E0E0E0] rounded flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#333333]">Return #R-1001 · Order #17110</p>
                <p className="text-xs text-gray-600">Item: Luxury Silver Bracelet</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Refunded</span>
            </div>
          ))}
 
        </div>
      </div>
    </div>
  );
}
