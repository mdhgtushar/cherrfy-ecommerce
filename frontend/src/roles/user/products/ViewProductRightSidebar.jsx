import React, { useEffect, useState, useMemo } from "react";
import ShippingDetailsPopup from "./ShippingDetailsPopup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, checkout } from "../../../features/cartSlice";
import USER_PATHS from "../USER_PATHS";
import API from "../../../util/API";
import { addToWishlist } from "../../../features/wishlistSlice";
import {
  Heart,
  ShoppingBasket,
  ShoppingCart,
  Star,
  WashingMachine,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const ViewProductRightSidebar = ({
  selectedProduct,
  selectedSKU,
  selectedImage,
  allProductImages,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { shipToCountry } = useSelector((state) => state.userSettings);

  const [mockShippingData, setMockShippingData] = useState([]);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isAddingToFavorite, setIsAddingToFavorite] = useState(false);

  // Memoized product info for safe access
  const productInfo = useMemo(() => {
    return {
      subject: selectedProduct?.name || "Unnamed Product",
      productId: selectedProduct?.productId || null,
    };
  }, [selectedProduct]);

  const onQtyChange = async () => {
    if (!selectedSKU?.sku_id || !productInfo.productId) {
      // Reset if no SKU or productId
      setMockShippingData([]);
      setIsShippingLoading(false);
      return;
    }

    setIsShippingLoading(true);
    try {
      const result = await API.post("/logistic", {
        product_id: productInfo.productId,
        country: shipToCountry,
        sku_id: selectedSKU.sku_id,
        quantity: qty,
      });

      setMockShippingData(result.data);
    } catch (error) {
      console.error("Error fetching shipping info:", error);
      setMockShippingData([]);
    } finally {
      setIsShippingLoading(false);
    }
  };

  useEffect(() => {
    onQtyChange();
  }, [selectedSKU, shipToCountry, qty]);

  const goOrder = () => {
    if (!selectedSKU || selectedSKU.sku_available_stock === 0 || qty === 0) {
      alert(
        "Please select a product option and ensure it's in stock with a valid quantity before ordering."
      );
      return;
    }
    setIsOrdering(true);
    dispatch(
      checkout([
        {
          id: selectedProduct?._id,
          name: productInfo.subject,
          price: selectedSKU?.offer_sale_price || 0,
          image: selectedImage || allProductImages?.[0] || "/placeholder.png",
          quantity: qty,
          sku_id: selectedSKU?.sku_id,
        },
      ])
    );
    navigate(USER_PATHS.CHECKOUT);
    setIsOrdering(false);
  };

  const handleQtyChange = (e) => {
    let newQty = parseInt(e.target.value) || 1;
    const maxStock = selectedSKU?.sku_available_stock || 1;
    const maxAllowed = Math.min(maxStock, 12);

    if (newQty < 1) newQty = 1;
    if (newQty > maxAllowed) newQty = maxAllowed;

    setQty(newQty);
  };

  const handleIncrementQty = () => {
    const maxStock = selectedSKU?.sku_available_stock || 1;
    const maxAllowed = Math.min(maxStock, 12);
    setQty((prevQty) => (prevQty < maxAllowed ? prevQty + 1 : prevQty));
  };

  const handleDecrementQty = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
  };

  const handleAddToCart = () => {
    if (selectedSKU && selectedSKU.sku_available_stock > 0 && qty > 0) {
      setIsAddingToCart(true);
      dispatch(
        addToCart({
          id: selectedProduct?._id,
          name: productInfo.subject,
          price: selectedSKU?.offer_sale_price || 0,
          quantity: qty,
          image: selectedImage || allProductImages?.[0] || "/placeholder.png",
          sku_id: selectedSKU?.sku_id,
        })
      );
      toast.success("Product added to cart!");
      setIsAddingToCart(false);
    } else {
      toast.error(
        "Cannot add to cart: Please select a valid option and ensure quantity is positive and in stock."
      );
    }
  };

  const handleAddToFavorite = () => {
    setIsAddingToFavorite(true);
    alert("Product added to favorites!");
    setIsAddingToFavorite(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productInfo.subject || "Check out this product!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing product:", error);
      }
    } else {
      alert(
        "Share functionality is not supported in this browser. You can copy the URL to share."
      );
    }
  };

  const isAvailable = selectedSKU?.sku_available_stock > 0;
  const commonDisabled =
    isShippingLoading || isAddingToCart || isOrdering || isAddingToFavorite;

  const isAddToCartDisabled = !isAvailable || qty === 0 || commonDisabled;
  const isOrderNowDisabled = !isAvailable || qty === 0 || commonDisabled;
  const isAddToFavoriteDisabled = !isAvailable || commonDisabled;
  const isAddToWishlistDisabled = isAvailable || commonDisabled;
  const isShareButtonDisabled = commonDisabled;

  const onAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
    toast.success("Wishlist Added.");
  };
  return (
    <div className="w-full md:w-1/4 p-4 pt-0 bg-white">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Shipping & Purchase
        </h2>

        {isShippingLoading ? (
          <p className="text-blue-600 text-center py-4">
            Loading shipping info...
          </p>
        ) : (
          mockShippingData &&
          Object.keys(mockShippingData).length > 0 && (
            <ShippingDetailsPopup
              data={mockShippingData}
              isLoading={isShippingLoading}
            />
          )
        )}

        <div className="my-4 flex items-center space-x-2 p-3 rounded-md bg-gray-50">
          {isAvailable ? (
            <span className="text-green-700 font-semibold text-sm flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>In Stock</span>
            </span>
          ) : (
            <span className="text-red-700 font-semibold text-sm flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Out of Stock</span>
            </span>
          )}
          {isAvailable && (
            <span className="text-gray-500 text-xs">
              ({selectedSKU?.sku_available_stock} available)
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center space-x-3">
          <label htmlFor="qty" className="text-sm font-medium text-gray-700">
            Qty:
          </label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <button
              type="button"
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
              onClick={handleDecrementQty}
              disabled={qty <= 1 || isAddToCartDisabled}
            >
              -
            </button>
            <input
              id="qty"
              type="number"
              min="1"
              max={Math.min(selectedSKU?.sku_available_stock || 1, 12)}
              value={qty}
              className="w-16 text-center text-gray-800 font-medium bg-white focus:ring-0 focus:border-transparent outline-none py-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              onChange={handleQtyChange}
              disabled={!isAvailable || isShippingLoading}
            />
            <button
              type="button"
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
              onClick={handleIncrementQty}
              disabled={
                qty >= Math.min(selectedSKU?.sku_available_stock || 1, 12) ||
                isAddToCartDisabled
              }
            >
              +
            </button>
          </div>
          <button
            className="flex-1 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-4 py-2 rounded-md shadow-md hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:from-gray-400 disabled:to-gray-500"
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
          >
            {isAddingToCart ? (
              "Adding..."
            ) : (
              <span className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart
              </span>
            )}
          </button>
        </div>

        <button
          onClick={goOrder}
          className="mt-4 block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-bold px-4 py-2 rounded-md shadow-md hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:from-gray-400 disabled:to-gray-500"
          disabled={isOrderNowDisabled}
        >
          {isOrdering ? "Ordering..." : "Order Now"}
        </button>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            className="border  border-gray-300 text-yellow-700 px-4 py-2 rounded-md w-full hover:bg-gray-100 transition duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transform hover:scale-102 focus:outline-none focus:ring-1 focus:ring-gray-400"
            onClick={handleAddToFavorite}
            disabled={isAddToFavoriteDisabled}
          >
            <span>
              {isAddingToFavorite ? (
                "Favoriting..."
              ) : (
                <span className="flex items-center">
                  <Star /> <span className="text-sm ml-1">Favorite</span>
                </span>
              )}
            </span>
          </button>

          <button
            className="border  border-gray-300 text-primary px-4 py-2 rounded-md w-full hover:bg-gray-100 transition duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transform hover:scale-102 focus:outline-none focus:ring-1 focus:ring-gray-400"
            onClick={() => onAddToWishlist(id)}
            // disabled={isAddToWishlistDisabled}
          >
            <Heart /> <span className="text-sm ml-1">Wishlist</span>
          </button>
        </div>

        <button
          className="mt-2 block w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transform hover:scale-102 focus:outline-none focus:ring-1 focus:ring-gray-400"
          onClick={handleShare}
          disabled={isShareButtonDisabled}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            ></path>
          </svg>
          <span>Share</span>
        </button>

        <div className="mt-6 border-t pt-4 text-xs text-gray-600 space-y-2">
          <p className="flex items-center space-x-2">
            <span className="text-green-500 font-bold text-base">✅</span>
            <span>7-day hassle-free returns</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-blue-500 font-bold text-base">🔒</span>
            <span>Secure and encrypted payments</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-orange-500 font-bold text-base">📦</span>
            <span>Meticulously packaged orders</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-purple-500 font-bold text-base">⭐</span>
            <span>Dedicated customer support</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-indigo-500 font-bold text-base">🌍</span>
            <span>Delivery Over 40+ Countries</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProductRightSidebar;
