import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createDispute, getUserDisputes } from '../../../features/disputeSlice';

export default function Disputes(){
  const disputes = useSelector((state) => state.dispute.disputes);
  const dispatch = useDispatch();
  const [disputeData, setDisputeData] = React.useState({
    category: '',
    orderId: '',
    subject: '',
    description: '',

  });

  useEffect(() => {
    dispatch(getUserDisputes());
  }, [dispatch]);

  const saveDispute = () => {  
    dispatch(createDispute(disputeData));
    setDisputeData({
      category: '',
      orderId: '',
      subject: '',
      description: ''
    });
  };
  return (
    <div activeKey="disputes" pageTitle="Disputes / Tickets">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Disputes / Tickets</div>
        <div className="p-6">
          <p className="text-sm text-gray-600">Open support tickets and track their status.</p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              {disputes.length === 0 && (<p className="text-sm text-gray-600">No disputes or tickets found.</p>
              )}
              {disputes.map((dispute) => (
                <div key={dispute._id} className="p-4 border border-[#E0E0E0] rounded">
                  <p className="font-semibold text-[#333333]">Ticket #{dispute._id} · {dispute.subject}</p>
                  <p className="text-sm text-gray-600">Order #{dispute.orderId} · Opened: {dispute.createdAt}</p>
                  <p className="text-sm text-orange-600 mt-1">Status: {dispute.status}</p>
                </div>
              ))} 
            </div>
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Open New Ticket</div>
              <div className="p-6">
                <form className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" value={disputeData.category} onChange={(e) => setDisputeData({...disputeData, category: e.target.value})}>
                      <option value="order_issue">Order Issue</option>
                      <option>Payment Issue</option>
                      <option>Product Quality</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID (optional)</label>
                    <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="#17345" onChange={(e) => setDisputeData({...disputeData, orderId: e.target.value})} value={disputeData.orderId} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="Brief summary" onChange={(e) => setDisputeData({...disputeData, subject: e.target.value})} value={disputeData.subject} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" rows="4" placeholder="Describe your issue..." onChange={(e) => setDisputeData({...disputeData, description: e.target.value})} value={disputeData.description}></textarea>
                  </div>
                  <button type="button" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded text-sm" onClick={saveDispute}>Submit Ticket</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
