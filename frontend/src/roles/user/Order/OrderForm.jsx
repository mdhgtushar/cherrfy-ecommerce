import React, { useState, useMemo } from 'react';

export default function Checkout(){
  const [region, setRegion] = useState('BD');
  const [method, setMethod] = useState('gpay');
  const [billingSame, setBillingSame] = useState(true);
  // no shipping method in this variant
  const [voucher, setVoucher] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null); // {code,type,value,label}
  const [termsAccepted, setTermsAccepted] = useState(false);
  const cart = [
    { name: 'Hiphop Cross Necklace', qty: 1, price: 15.99 },
    { name: 'Designer Sunglasses', qty: 1, price: 29.99 },
  ];

  const recommendedFor = useMemo(() => ({
    gpay: region === 'US',
    bkash: region === 'BD',
    card: true,
  }), [region]);

  const subtotal = useMemo(() => cart.reduce((s, it)=> s + it.qty * it.price, 0), [cart]);
  const discount = useMemo(() => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.type === 'percent') return Math.min(subtotal * appliedVoucher.value, 1000);
    if (appliedVoucher.type === 'fixed') return Math.min(appliedVoucher.value, subtotal);
    return 0;
  }, [appliedVoucher, subtotal]);
  const taxRate = useMemo(() => (region === 'BD' ? 0.05 : region === 'US' ? 0.085 : 0.07), [region]);
  const tax = useMemo(() => +((Math.max(subtotal - discount, 0)) * taxRate).toFixed(2), [subtotal, discount, taxRate]);
  const total = useMemo(() => +((Math.max(subtotal - discount, 0)) + tax).toFixed(2), [subtotal, discount, tax]);

  function applyVoucher(){
    const code = (voucher || '').trim().toUpperCase();
    const map = {
      'CHERRY10': { type: 'percent', value: 0.10, label: '10% off applied' },
      'SAVE5': { type: 'fixed', value: 5, label: '$5 discount applied' },
      'SHIPFREE': { type: 'shipfree', value: 0, label: 'Free shipping applied' },
    };
    if (!code) { setAppliedVoucher(null); return; }
    setAppliedVoucher(map[code] ? { code, ...map[code] } : null);
  }

  return (
    <div className="min-h-screen text-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#333333]">Checkout</h1>
          <p className="text-sm text-gray-500">Complete your order securely.</p>
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded-md p-4 mb-6">
          <ol className="flex items-center text-xs text-gray-500 gap-2">
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-[#D2042D] text-white flex items-center justify-center">1</span> Cart</li>
            <span className="text-gray-300">—</span>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-[#D2042D] text-white flex items-center justify-center">2</span> Address</li>
            <span className="text-gray-300">—</span>
            <li className="flex items-center gap-2 font-semibold text-[#D2042D]"><span className="w-6 h-6 rounded-full border border-[#D2042D] text-[#D2042D] flex items-center justify-center">3</span> Payment</li>
            <span className="text-gray-300">—</span>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center">4</span> Review</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Delivery Details</div>
              <div className="p-6 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm text-[#333333]">Al Sadman Awal · <span className="text-gray-600">+8801XXXXXXX</span></p>
                    <a href="#" className="text-xs text-[#D2042D] hover:underline">Change</a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ship to</p>
                    <p className="text-sm text-[#333333]">123 Main St, Dhaka, Bangladesh</p>
                    <a href="#" className="text-xs text-[#D2042D] hover:underline">Change</a>
                  </div>
                </div>
                <div className="border border-[#E0E0E0] rounded p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#333333]">Billing Address</p>
                    <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={billingSame} onChange={e=>setBillingSame(e.target.checked)} className="rounded"/> Same as shipping</label>
                  </div>
                  {!billingSame && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600">Full name</label>
                        <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="Name" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600">Address</label>
                        <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="Address line" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600">City</label>
                        <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="City" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping removed per requirement */}

            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Payment Method</div>
              <div className="p-6 space-y-4">
                {/* Country selector */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 text-sm">
                  <div className="flex items-center gap-3">
                    <label className="text-gray-600">Your country:</label>
                    <select value={region} onChange={e=>setRegion(e.target.value)} className="border border-[#E0E0E0] rounded px-3 py-2">
                      <option value="BD">🇧🇩 Bangladesh</option>
                      <option value="US">🇺🇸 United States</option>
                      <option value="INTL">🌐 International</option>
                    </select>
                  </div>
                  <span className="md:ml-auto text-xs text-gray-500">We’ll show available methods for your country.</span>
                </div>
                <div className="text-xs text-gray-500 bg-[#F8F8F8] border border-[#E0E0E0] rounded p-3">
                  {region === 'US' && (
                    <span>Available: Google Pay, PayPal, Cards, Cash App, Venmo, Zelle, Wise</span>
                  )}
                  {region === 'BD' && (
                    <span>Available: bKash, Nagad, Rocket, Upay, Cards, Wise</span>
                  )}
                  {region === 'INTL' && (
                    <span>Available: PayPal, Cards, Wise</span>
                  )}
                </div>

                {/* Category tabs */}
                <div className="flex items-center gap-2 text-sm" role="tablist">
                  {['quick','card','mfs'].map(cat => (
                    <button key={cat} onClick={()=>setMethod(cat==='quick'? 'gpay': cat==='card'?'card':'mfs')} className={`px-3 py-1.5 rounded border ${['gpay','wise','paypal'].includes(method) && cat==='quick' || method==='card' && cat==='card' || method==='mfs' && cat==='mfs' ? 'border-[#D2042D] bg-[#FEE7E8] text-[#D2042D]' : 'border-[#E0E0E0] hover:border-[#D2042D]'}`}>
                      {cat==='quick' ? 'Quick Pay' : cat==='card' ? 'Cards' : 'Mobile Wallets'}
                    </button>
                  ))}
                </div>

                {/* Quick Pay: GPay / Wise / PayPal (availability by region) */}
                {(['gpay','wise','paypal'].includes(method)) && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* GPay (US, INTL) */}
                      {['US','INTL'].includes(region) && (
                        <div className={`border rounded p-3 ${method==='gpay' ? 'ring-2 ring-[#D2042D]/30 border-[#D2042D]' : 'border-[#E0E0E0]'}`}>
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name="method" value="gpay" checked={method==='gpay'} onChange={()=>setMethod('gpay')} className="mr-3" />
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-[#333333] flex items-center gap-2">Google Pay <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded">GPay</span></span>
                              {region==='US' && <span className="ml-2 text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">Recommended</span>}
                              <p className="text-xs text-gray-500">Fast checkout via Google.</p>
                            </div>
                          </label>
                          {method==='gpay' && <div className="mt-3"><button className="w-full bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold py-2.5 rounded text-sm">Pay with Google Pay</button></div>}
                        </div>
                      )}

                      {/* Wise (all) */}
                      {['BD','US','INTL'].includes(region) && (
                        <div className={`border rounded p-3 ${method==='wise' ? 'ring-2 ring-[#D2042D]/30 border-[#D2042D]' : 'border-[#E0E0E0]'}`}>
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name="method" value="wise" checked={method==='wise'} onChange={()=>setMethod('wise')} className="mr-3" />
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-[#333333] flex items-center gap-2">Wise <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded">Bank</span></span>
                              <p className="text-xs text-gray-500">Bank transfer via Wise.</p>
                            </div>
                          </label>
                          {method==='wise' && <div className="mt-3"><button className="w-full bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold py-2.5 rounded text-sm">Pay with Wise</button></div>}
                        </div>
                      )}

                      {/* PayPal (US, INTL) */}
                      {['US','INTL'].includes(region) && (
                        <div className={`border rounded p-3 ${method==='paypal' ? 'ring-2 ring-[#D2042D]/30 border-[#D2042D]' : 'border-[#E0E0E0]'}`}>
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name="method" value="paypal" checked={method==='paypal'} onChange={()=>setMethod('paypal')} className="mr-3" />
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-[#333333] flex items-center gap-2">PayPal <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">PP</span></span>
                              <p className="text-xs text-gray-500">Checkout with PayPal.</p>
                            </div>
                          </label>
                          {method==='paypal' && <div className="mt-3"><button className="w-full bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold py-2.5 rounded text-sm">Continue to PayPal</button></div>}
                        </div>
                      )}
                    </div>
                    {(['US','INTL'].includes(region) ? false : true) && (
                      <p className="text-xs text-gray-500">No quick pay methods are available for your country.</p>
                    )}
                  </div>
                )}

                {/* Cards (all regions) */}
                {method==='card' && (
                  <div className="space-y-3">
                    <div className={`border border-[#D2042D] ring-2 ring-[#D2042D]/30 rounded-md p-3`}>
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#333333]">Debit / Credit Card</span>
                            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Popular</span>
                          </div>
                          <p className="text-xs text-gray-500">Visa, Mastercard, AmEx — processed securely.</p>
                        </div>
                      </div>
                      <form className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Card number</label>
                          <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="4242 4242 4242 4242" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name on card</label>
                          <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="Full name" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Expiry</label>
                            <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">CVC</label>
                            <input className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2" placeholder="CVC" />
                          </div>
                        </div>
                        <div className="md:col-span-2 flex items-center justify-between">
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Save this card</label>
                          <button type="button" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold py-2 px-5 rounded text-sm">Pay Now</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* MFS (country specific) */}
                {method==='mfs' && (
                  <div className="space-y-3">
                    {region==='US' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <button type="button" className="border border-[#E0E0E0] hover:border-[#D2042D] rounded py-2 flex items-center justify-center gap-2"><span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded">$</span> Cash App</button>
                        <button type="button" className="border border-[#E0E0E0] hover:border-[#D2042D] rounded py-2 flex items-center justify-center gap-2"><span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">V</span> Venmo</button>
                        <button type="button" className="border border-[#E0E0E0] hover:border-[#D2042D] rounded py-2 flex items-center justify-center gap-2"><span className="text-[10px] bg-purple-600 text-white px-1.5 py-0.5 rounded">Z</span> Zelle</button>
                      </div>
                    )}
                    {region==='BD' && (
                      <>
                        <div className={`border rounded p-3 ${method==='bkash' ? 'ring-2 ring-[#D2042D]/30 border-[#D2042D]' : 'border-[#E0E0E0]'}`}>
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name="method-bd" value="bkash" onChange={()=>setMethod('bkash')} className="mr-3" />
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-[#333333] flex items-center gap-2">bKash <span className="text-[10px] bg-pink-600 text-white px-1.5 py-0.5 rounded">b</span></span>
                              <span className="ml-2 text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">Recommended</span>
                              <p className="text-xs text-gray-500">Mobile wallet payment in Bangladesh.</p>
                            </div>
                          </label>
                        </div>
                        <div className={`border rounded p-3 ${method==='nagad' ? 'ring-2 ring-[#D2042D]/30 border-[#D2042D]' : 'border-[#E0E0E0]'}`}>
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name="method-bd" value="nagad" onChange={()=>setMethod('nagad')} className="mr-3" />
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-[#333333] flex items-center gap-2">Nagad <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded">N</span></span>
                              <p className="text-xs text-gray-500">Mobile wallet payment in Bangladesh.</p>
                            </div>
                          </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <button type="button" className="border border-[#E0E0E0] hover:border-[#D2042D] rounded py-2 flex items-center justify-center gap-2"><span className="text-[10px] bg-orange-600 text-white px-1.5 py-0.5 rounded">R</span> Rocket</button>
                          <button type="button" className="border border-[#E0E0E0] hover:border-[#D2042D] rounded py-2 flex items-center justify-center gap-2"><span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">U</span> Upay</button>
                        </div>
                      </>
                    )}
                    {region==='INTL' && (
                      <p className="text-xs text-gray-500">Mobile wallets are not available for your country. Try Quick Pay or Cards.</p>
                    )}
                  </div>
                )}

                <div className="bg-white border border-[#E0E0E0] rounded p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#333333]">Order Notes</label>
                      <textarea rows={3} className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm" placeholder="Delivery instructions, gift message, etc."/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#333333]">Gift Options</label>
                      <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" className="rounded"/> Mark as gift</label>
                      <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" className="rounded"/> Add gift receipt</label>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Your payment is encrypted and processed securely. By placing your order, you agree to our <a href="#" className="text-[#D2042D] hover:underline">Terms</a> and <a href="#" className="text-[#D2042D] hover:underline">Privacy Policy</a>.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Order Summary</div>
              <div className="p-4 space-y-3 text-sm">
                {cart.map((it, idx)=> (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-600">{it.name} × {it.qty}</span>
                    <span className="font-semibold text-[#333333]">${(it.qty*it.price).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#E0E0E0] flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#333333]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold text-green-700">- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-[#333333]">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#E0E0E0] flex items-center justify-between text-lg">
                  <span className="font-semibold text-[#333333]">Total</span>
                  <span className="font-bold text-[#D2042D]">${total.toFixed(2)}</span>
                </div>
                <div className="pt-2">
                  <label className="sr-only" htmlFor="voucher">Voucher</label>
                  <div className="flex items-center gap-2">
                    <input id="voucher" value={voucher} onChange={e=>setVoucher(e.target.value)} className="flex-1 border border-[#E0E0E0] rounded px-3 py-2" placeholder="Voucher code (e.g., CHERRY10, SAVE5, SHIPFREE)" />
                    <button type="button" onClick={applyVoucher} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded text-xs">Apply</button>
                  </div>
                  {!!appliedVoucher && (
                    <p className="mt-1 text-[11px] text-green-700">{appliedVoucher.label}</p>
                  )}
                </div>
                <label className="flex items-center gap-2 text-xs mt-2"><input type="checkbox" checked={termsAccepted} onChange={e=>setTermsAccepted(e.target.checked)} className="rounded"/> I agree to the Terms and Privacy Policy.</label>
              </div>
            </div>
            <button disabled={!termsAccepted} className={`w-full text-white font-semibold py-3 rounded ${termsAccepted ? 'bg-[#D2042D] hover:bg-[#FA0F3E]' : 'bg-[#D2042D]/60 cursor-not-allowed'}`}>Place Order</button>
            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500">
              <span>🔒 SSL Secured</span>
              <span>💳 PCI-DSS Compliant</span>
              <span>✅ Money-back Guarantee</span>
            </div>
            <p className="text-center text-[11px] text-gray-500">We’ll only charge after you complete the payment step above.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
