import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkout,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import USER_PATHS from "../USER_PATHS";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const [voucher, setVoucher] = useState("");
  const [applied, setApplied] = useState(null); // {code,type,value,label}

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.quantity * it.price, 0),
    [items]
  );

  const discount = useMemo(() => {
    if (!applied) return 0;
    if (applied.type === "percent") return Math.min(subtotal * applied.value, 1000);
    if (applied.type === "fixed") return Math.min(applied.value, subtotal);
    return 0;
  }, [applied, subtotal]);

  const total = useMemo(
    () => +(Math.max(subtotal - discount, 0)).toFixed(2),
    [subtotal, discount]
  );

  function apply() {
    const code = (voucher || "").trim().toUpperCase();
    const map = {
      CHERRY10: { type: "percent", value: 0.1, label: "10% off applied" },
      SAVE5: { type: "fixed", value: 5, label: "$5 discount applied" },
    };
    if (!code) return setApplied(null);
    setApplied(map[code] ? { code, ...map[code] } : null);
  }

  function goCheckout() {
    const selectedItems = items.map((it) => ({
      id: it.id,
      name: it.name,
      price: it.price,
      quantity: it.quantity,
      image: it.image,
      sku_id: it.sku_id,
    }));
    dispatch(checkout(selectedItems));
    navigate(USER_PATHS.SHIPPING);
  }

  if (!items) return "Loading...";

  return (
    <div className="min-h-screen text-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="bg-white border border-[#E0E0E0] rounded-md p-4 mb-6">
          <ol className="flex items-center text-xs text-gray-500 gap-2">
            <li className="flex items-center gap-2 font-semibold text-[#D2042D]">
              <span className="w-6 h-6 rounded-full border border-[#D2042D] text-[#D2042D] flex items-center justify-center">
                1
              </span>{" "}
              Cart
            </li>
            <span className="text-gray-300">—</span>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center">
                2
              </span>{" "}
              Address
            </li>
            <span className="text-gray-300">—</span>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center">
                3
              </span>{" "}
              Payment
            </li>
            <span className="text-gray-300">—</span>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center">
                4
              </span>{" "}
              Review
            </li>
          </ol>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#333333]">Your Cart</h1>
          <p className="text-sm text-gray-500">
            Review your items and apply vouchers before shipping.
          </p>
          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="text-xs text-red-600 hover:underline mt-1"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Cart + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white border border-[#E0E0E0] rounded p-6 text-center text-sm text-gray-600">
                Your cart is empty.
              </div>
            ) : (
              items.map((it) => (
                <div
                  key={it.id}
                  className="bg-white border border-[#E0E0E0] rounded p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={it.image || "https://via.placeholder.com/80"}
                      alt={it.name}
                      className="w-16 h-16 bg-[#F8F8F8] border border-[#E0E0E0] rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#333333]">{it.name}</p>
                      <p className="text-xs text-gray-500">In stock · Ships in 24h</p>
                      <button
                        onClick={() => dispatch(removeFromCart(it.id))}
                        className="mt-1 text-xs text-[#D2042D] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: it.id,
                              quantity: Math.max(1, it.quantity - 1),
                            })
                          )
                        }
                        className="w-7 h-7 border border-[#E0E0E0] rounded hover:border-[#D2042D]"
                      >
                        -
                      </button>
                      <input
                        readOnly
                        value={it.quantity}
                        className="w-12 text-center border border-[#E0E0E0] rounded px-2 py-1"
                      />
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: it.id,
                              quantity: it.quantity + 1,
                            })
                          )
                        }
                        className="w-7 h-7 border border-[#E0E0E0] rounded hover:border-[#D2042D]"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-4 w-24 text-right">
                      <p className="text-sm font-semibold text-[#333333]">
                        ${(it.quantity * it.price).toFixed(2)}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        ${it.price} each
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">
                Order Summary
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="font-semibold text-[#333333]">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#333333]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold text-green-700">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Tax is calculated at checkout after address.
                </p>
                <div className="pt-2 border-t border-[#E0E0E0] flex justify-between text-lg">
                  <span className="font-semibold text-[#333333]">Total</span>
                  <span className="font-bold text-[#D2042D]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                {/* Voucher */}
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                      className="flex-1 border border-[#E0E0E0] rounded px-3 py-2"
                      placeholder="Voucher code (e.g., CHERRY10, SAVE5)"
                    />
                    <button
                      onClick={apply}
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded text-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {!!applied && (
                    <p className="mt-1 text-[11px] text-green-700">{applied.label}</p>
                  )}
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="block text-center w-full border border-[#E0E0E0] hover:border-[#D2042D] text-[#333333] font-medium py-2.5 rounded"
            >
              Continue Shopping
            </Link>
            <button
              onClick={goCheckout}
              disabled={items.length === 0}
              className="block text-center w-full bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold py-3 rounded disabled:opacity-50"
            >
              Proceed to next
            </button>
            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500">
              <span>🔒 SSL Secured</span>
              <span>💳 PCI-DSS Compliant</span>
              <span>✅ Money-back Guarantee</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
