import React, { useEffect, useState } from "react";
import { ChevronRight, X, Truck, CalendarDays, MapPin, CheckCircle, Package } from "lucide-react"; // Added more icons

// Helper components for the loading spinner SVG
const Circle = (props) => (
  <circle {...props} />
);

const Path = (props) => (
  <path {...props} />
);

const ShippingDetailsPopup = ({ data, isLoading }) => {
  // Extract delivery options from data, defaulting to an empty array if not present
  const deliveryOptions = data?.freight_data?.delivery_option_d_t_o || [];
  const destinationCountry = data?.country || "Unknown"; // Assuming country is available at top level

  // Logic to find the cheapest shipping option
  const getCheapestOption = () => {
    if (!deliveryOptions.length) return null;
    const sorted = [...deliveryOptions].sort((a, b) => {
      const priceA = a.free_shipping ? 0 : parseFloat(a.shipping_fee_cent || 999);
      const priceB = b.free_shipping ? 0 : parseFloat(b.shipping_fee_cent || 999);
      return priceA - priceB;
    });
    return sorted[0];
  };

  const [selected, setSelected] = useState(() => getCheapestOption());
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const newCheapestOption = getCheapestOption();
    if (newCheapestOption && (!selected || newCheapestOption.code !== selected.code)) {
        setSelected(newCheapestOption);
    } else if (!newCheapestOption && selected) {
        setSelected(null);
    }
  }, [data]);

  const handleSelect = (option) => {
    setSelected(option);
    setShowPopup(false);
  };

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500 justify-center py-4">
        <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <Circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <Path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Fetching shipping info...</span>
      </div>
    );
  }

  if (!selected) return null;

  return (
    <div className="mt-4 font-sans antialiased">
      {/* Clickable box displaying current shipping details */}
      <button
        onClick={() => setShowPopup(true)}
        className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg shadow-sm bg-white hover:border-indigo-500 hover:shadow-md
                   transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-300 transform active:scale-98 group"
      >
        <div className="text-left flex-grow">
          {/* Shipping Cost */}
          <p className="text-sm text-gray-700 font-medium flex items-center">
            <Truck className="w-4 h-4 mr-1 text-gray-500" /> {/* Icon for shipping cost */}
            Shipping Cost:{" "}
            <span className="font-semibold text-gray-800 ml-1">
              {selected.free_shipping
                ? <span className="text-green-600">Free</span>
                : selected.shipping_fee_format || "—"}
            </span>
          </p>
          {/* Delivery Date/Range */}
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <CalendarDays className="w-3 h-3 mr-1 text-gray-400" /> {/* Icon for delivery */}
            Delivery:{" "}
            <span className="font-normal">
              {selected.guaranteed_delivery_days && selected.guaranteed_delivery_days !== "0" && selected.delivery_date_desc
                ? `Guaranteed by ${selected.delivery_date_desc}`
                : selected.delivery_date_desc
                  ? `Est. by ${selected.delivery_date_desc}`
                  : `${selected.min_delivery_days || '—'} - ${selected.max_delivery_days || '—'} days`}
            </span>
          </p>
          {/* Ship To Destination */}
          {destinationCountry && destinationCountry !== "Unknown" && (
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-gray-400" /> {/* Icon for destination */}
              Ship to: <span className="font-normal ml-1">{destinationCountry}</span>
            </p>
          )}
        </div>
        {/* ChevronRight icon, visually indicating expandability */}
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0 ml-2" />
      </button>

      {/* Shipping Options Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4 sm:p-6 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-hidden flex flex-col transform scale-95 opacity-0 animate-scale-in border border-gray-100">
            {/* Popup Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-800">Select Delivery Option</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close delivery options"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Delivery Options List - Scrollable area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {deliveryOptions.length > 0 ? (
                deliveryOptions.map((option, index) => {
                  const isSelected = selected?.code === option.code;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(option)}
                      className={`w-full flex items-start text-left p-4 rounded-lg border-2 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-300 shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 shadow-sm"
                      } transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex-grow">
                        <h3 className="text-base font-semibold text-gray-800 mb-1">
                          {option.company}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-600 mt-2">
                            {/* Shipping Cost */}
                            <p className="flex items-center">
                                <Truck className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="font-medium">Shipping:</span>{" "}
                                {option.free_shipping
                                    ? <span className="text-green-600 font-semibold">Free</span>
                                    : <span className="font-semibold">{option.shipping_fee_format || "—"}</span>}
                            </p>
                            {/* Delivery Date/Range */}
                            <p className="flex items-center">
                                <CalendarDays className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="font-medium">Delivery:</span>{" "}
                                <span className="font-normal">
                                  {option.delivery_date_desc && option.guaranteed_delivery_days && option.guaranteed_delivery_days !== "0"
                                    ? `Guaranteed by ${option.delivery_date_desc}`
                                    : option.delivery_date_desc
                                      ? `Est. by ${option.delivery_date_desc}`
                                      : `${option.min_delivery_days || '—'} - ${option.max_delivery_days || '—'} days`}
                                </span>
                            </p>
                            {/* Ship From Country */}
                            {option.ship_from_country && (
                              <p className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="font-medium">Ship From:</span>{" "}
                                <span className="font-normal">{option.ship_from_country}</span>
                              </p>
                            )}
                            {/* Tracking Availability */}
                            <p className="flex items-center">
                                <Package className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="font-medium">Tracking:</span>{" "}
                                {option.tracking
                                    ? <span className="text-green-700 font-semibold">Available</span>
                                    : <span className="text-red-500 font-semibold">Unavailable</span>}
                            </p>
                            {/* Guaranteed Delivery Days */}
                            {option.guaranteed_delivery_days && option.guaranteed_delivery_days !== "0" && (
                              <p className="text-xs text-blue-700 font-semibold mt-1">
                                Guaranteed within {option.guaranteed_delivery_days} days
                              </p>
                            )}
                             {/* Premium Free Shipping */}
                            {option.mayHavePFS && (
                              <p className="text-xs text-yellow-700 font-semibold mt-1">
                                May Have Premium Free Shipping
                              </p>
                            )}
                        </div>
                      </div>
                      {/* Selection Indicator (Radio button style) */}
                      <div className="ml-3 flex-shrink-0 flex items-center justify-center">
                          {isSelected ? (
                            <CheckCircle className="h-6 w-6 text-indigo-600 fill-current" /> // Filled check circle for selected
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 group-hover:border-indigo-400 transition-colors"></div> // Empty circle for unselected
                          )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-6 border-t border-gray-100 mt-4 pt-4">
                  No delivery options found for your location.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Tailwind CSS custom animations for popup */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default ShippingDetailsPopup;
