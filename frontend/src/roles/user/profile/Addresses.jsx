import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addShippingAddress,
  fetchShippingAddresses,
} from '../../../features/shippingAddressSlice';

export default function Addresses() {
  const shippingAddresses = useSelector(
    (state) => state.shippingAddresses.shippingAddresses
  );
  const dispatch = useDispatch();

  // ✅ Default pre-filled address data
  const [addressData, setAddressData] = React.useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    dispatch(fetchShippingAddresses());
  }, [dispatch]);

  const SaveAddress = async () => {
    try {
      dispatch(addShippingAddress(addressData));
      // Clear form after saving
      setAddressData({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
      });
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div activeKey="addresses" pageTitle="Addresses">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">
          Shipping & Billing Addresses
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shippingAddresses.length === 0 ? (
              <p className="text-gray-500">No shipping addresses found.</p>
            ) : (
              shippingAddresses.map((address) => (
                <div key={address._id} className="p-4 border border-[#E0E0E0] rounded">
                  <p className="text-sm text-gray-500">{address.label}</p>
                  <p className="mt-1 font-semibold text-[#333333]">
                    {address.fullName}
                  </p>
                  <p className="text-sm text-gray-600">{address.address}</p>
                  <p className="text-sm text-gray-600">{address.city}</p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                  <div className="mt-2 flex items-center gap-3 text-sm">
                    <a href="#" className="text-[#D2042D] hover:underline">
                      Edit
                    </a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="text-gray-500 hover:underline">
                      Remove
                    </a>
                  </div>
                </div>
              ))
            )} 
          </div>

          {/* ✅ Add New Address Form */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#333333] mb-3">
              Add New Address
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                  onChange={(e) =>
                    setAddressData({ ...addressData, fullName: e.target.value })
                  }
                  value={addressData.fullName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                  onChange={(e) =>
                    setAddressData({ ...addressData, phone: e.target.value })
                  }
                  value={addressData.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                  onChange={(e) =>
                    setAddressData({ ...addressData, city: e.target.value })
                  }
                  value={addressData.city}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line
                </label>
                <input
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                  onChange={(e) =>
                    setAddressData({ ...addressData, address: e.target.value })
                  }
                  value={addressData.address}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                  onChange={(e) =>
                    setAddressData({ ...addressData, postalCode: e.target.value })
                  }
                  value={addressData.postalCode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                  onChange={(e) =>
                    setAddressData({ ...addressData, country: e.target.value })
                  }
                  value={addressData.country}
                >
                  <option value="">-- Choose --</option>  
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>USA</option>
                </select>
              </div>

              <div className="md:col-span-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" /> Set as default
                  shipping
                </label>
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded text-sm"
                  onClick={SaveAddress}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
