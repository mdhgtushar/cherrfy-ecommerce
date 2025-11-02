import React from 'react'; 

export default function Vouchers(){
  const vouchers = [1,2,3];
  return (
    <div activeKey="vouchers" pageTitle="Vouchers & Coupons">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Vouchers & Coupons</div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-sm text-gray-600">You have <span className="font-semibold">3</span> available vouchers.</p>
            <div className="flex items-center gap-2">
              <input className="border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="Enter voucher code" />
              <button className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-4 rounded text-sm">Apply</button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {vouchers.map((i)=> (
              <div key={i} className="p-4 border border-dashed border-[#D2042D] rounded bg-white">
                <p className="font-semibold text-[#D2042D]">CHERRY-SAVE-{1000+i}</p>
                <p className="text-xs text-gray-600 mt-1">10% off, min spend $20. Expires in 7 days.</p>
                <a href="#" className="mt-2 inline-flex items-center text-sm text-white bg-[#D2042D] hover:bg-[#FA0F3E] px-3 py-1.5 rounded">Apply</a>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#333333] mb-2">Applied Vouchers</h3>
            <div className="p-4 border border-[#E0E0E0] rounded bg-[#F8F8F8] flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#333333]">CHERRY-SAVE-1001</p>
                <p className="text-xs text-gray-600">Applied to order #17345</p>
              </div>
              <a href="#" className="text-sm text-gray-500 hover:underline">Remove</a>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">Terms apply. Vouchers cannot be combined unless stated otherwise.</p>
        </div>
      </div>
    </div>
  );
}
