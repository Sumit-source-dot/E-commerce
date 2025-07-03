import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import PaymentQR from '../../components/PaymentQR';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  // Get products from direct-buy or cart
  const products = location.state?.product
    ? [{ ...location.state.product, quantity: location.state.quantity }]
    : cartItems;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentProof: null,
  });

  const totalAmount = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentProof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('customerToken');
    if (!token) {
      alert('Please login as a customer to place an order');
      return;
    }

    try {
      const payload = new FormData();

     const orderItems = products.map((p) => ({
  product: String(p._id || p.id),
  quantity: p.quantity,
  price: p.price,
  title: p.title,
  thumbnail: p.thumbnail,
  description: p.description,
}));
payload.append('items', JSON.stringify(orderItems));


      // ✅ Append shipping info
      payload.append(
        'shippingAddress',
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        })
      );

      payload.append('totalAmount', totalAmount);
      payload.append('paymentProof', formData.paymentProof);

      const response = await axios.post('http://localhost:5000/api/orders', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert("Order placed successfully!");
        clearCart();
        localStorage.removeItem('cart');
        navigate('/order-success', {
          state: { orderId: response.data.orderId },
        });
      } else {
        alert(response.data.message || 'Order failed. Try again.');
      }
    } catch (error) {
      console.error("🚨 Checkout Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong during checkout');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#2B2B2B] mb-8">
        Complete Your Purchase
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {products.map((item) => (
            <div
              key={item._id || item.id}
              className="flex gap-4 py-4 border-b border-gray-100"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
                <p className="font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Form */}
        <div className="md:col-span-2 space-y-6">
          <PaymentQR amount={totalAmount} />

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-semibold mb-4">
              Shipping Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Screenshot (After UPI Payment)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E86C3B] file:text-white hover:file:bg-[#d45a2a]"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload screenshot of successful payment
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E86C3B] hover:bg-[#d45a2a] text-white py-2 px-4 rounded-md transition"
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
