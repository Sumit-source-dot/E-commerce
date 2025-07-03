// Frontend/src/pages/customer/OrderSuccess.jsx
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const OrderSuccess = () => {
  const { state } = useLocation();

  useEffect(() => {
    // Clear cart on success
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
      <p className="mb-4">Thank you for your purchase</p>
      {state?.orderId && (
        <p className="mb-4">Order ID: {state.orderId}</p>
      )}
      <a 
        href="/shop" 
        className="bg-[#E86C3B] text-white px-4 py-2 rounded"
      >
        Go to Shop
      </a>
    </div>
  );
};

export default OrderSuccess;