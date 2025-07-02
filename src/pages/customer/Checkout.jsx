import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [deliveryStatus, setDeliveryStatus] = useState("Preparing your order");
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    const statuses = [
      { text: "Preparing your order", progress: 20 },
      { text: "Order dispatched", progress: 40 },
      { text: "Out for delivery", progress: 70 },
      { text: "Almost there!", progress: 90 },
      { text: "Delivered!", progress: 100 }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 20;
      });

      setDeliveryStatus(() => {
        const currentStatus = statuses.find(s => s.progress >= progress) || statuses[0];
        return currentStatus.text;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [progress, cartItems, navigate]);

  const handleReturnToShop = () => {
    clearCart();
    navigate("/shop");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#2B2B2B] mb-6">Order Confirmed!</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-[#5A5A5A]">Delivery Progress</span>
            <span className="text-[#E86C3B]">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#E86C3B] h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-lg font-medium text-[#2B2B2B]">{deliveryStatus}</p>
          {progress >= 100 && (
            <p className="text-green-600 mt-2">Your order has been delivered successfully!</p>
          )}
        </div>

        <div className="mt-8 border-t pt-6">
          <button
            onClick={handleReturnToShop}
            className="w-full bg-[#E86C3B] hover:bg-[#d45a2a] text-white px-6 py-3 rounded-lg transition"
          >
            Return to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;