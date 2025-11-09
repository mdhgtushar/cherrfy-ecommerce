import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';  
import { fetchPaymentMethods } from '../../../features/paymentMethodSlice';

export default function Payments(){
  const paymentMethods = useSelector(state => state.paymentMethods.paymentMethods);

  const dispatch = useDispatch();

useEffect(() => { 
  dispatch(fetchPaymentMethods());
}, [dispatch]);

  return (
    <div activeKey="payments" pageTitle="Payment Methods">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Payment Methods</div>
        <div className="p-6">
          <div className="space-y-3">
            {paymentMethods.length === 0 && (<p className="text-sm text-gray-600">No payment methods added yet.</p>
            )}
            {paymentMethods.map(method => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded">
                <div> 
                  <p className="font-semibold text-[#333333]">{method.type}</p>
                  <p className="text-sm text-gray-600">{method.accountNumber}</p>
                </div>
                <div className="space-x-2">
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Default</span>
                  <a href="#" className="text-sm text-[#D2042D] hover:underline">Edit</a>
                  <a href="#" className="text-sm text-gray-500 hover:underline">Remove</a>
                </div>    
              </div>
            ))} 
              
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-[#333333] mb-2">Add Payment Method</h3>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="4242 4242 4242 4242" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVC</label>
                <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="CVC" />
              </div>
              <div className="md:col-span-4 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" defaultChecked /> Set as default</label>
                <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded text-sm">Save Card</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
