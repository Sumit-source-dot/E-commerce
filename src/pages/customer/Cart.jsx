// import { useCart } from "../../context/CartContext";

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity } = useCart();

//   // Calculate total cost
//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-[#2B2B2B] mb-6">Your Shopping Cart</h1>

//       {/* If cart is empty */}
//       {cartItems.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-[#5A5A5A] mb-4">Your cart is empty.</p>
//           <a href="/shop" className="text-[#E86C3B] hover:underline">
//             Continue Shopping
//           </a>
//         </div>
//       ) : (
//         <>
//           {/* Cart Items */}
//           <div className="grid gap-6">
//             {cartItems.map(item => (
//               <div
//                 key={item.id}
//                 className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
//               >
//                 <img
//                   src={item.thumbnail}
//                   alt={item.title}
//                   className="w-full sm:w-24 h-24 object-cover rounded"
//                 />

//                 <div className="flex-1">
//                   <h3 className="font-medium text-[#2B2B2B]">{item.title}</h3>
//                   <p className="text-sm text-[#5A5A5A] mb-2">₹{item.price}</p>

//                   <div className="flex items-center gap-4">
//                     {/* Quantity Controls */}
//                     <div className="flex items-center border rounded">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="px-3 py-1 text-lg"
//                         disabled={item.quantity <= 1}
//                       >
//                         -
//                       </button>
//                       <span className="px-3">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="px-3 py-1 text-lg"
//                       >
//                         +
//                       </button>
//                     </div>

//                     {/* Remove Item */}
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-sm text-red-600 hover:underline"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>

//                 {/* Subtotal */}
//                 <div className="font-medium text-right">
//                   ₹{(item.price * item.quantity).toFixed(2)}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart Total */}
//           <div className="mt-8 border-t pt-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-[#5A5A5A]">
//                   Total ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
//                 </p>
//                 <p className="text-xl font-bold text-[#2B2B2B]">₹{total.toFixed(2)}</p>
//               </div>
//               <button className="bg-[#E86C3B] hover:bg-[#d45a2a] text-white px-6 py-2 rounded-lg transition">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#2B2B2B] mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#5A5A5A] mb-4">Your cart is empty.</p>
          <a href="/shop" className="text-[#E86C3B] hover:underline">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full sm:w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-[#2B2B2B]">{item.title}</h3>
                  <p className="text-sm text-[#5A5A5A] mb-2">₹{item.price}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-lg"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-medium text-right">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#5A5A5A]">
                  Total ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                </p>
                <p className="text-xl font-bold text-[#2B2B2B]">₹{total.toFixed(2)}</p>
              </div>
              <button 
                onClick={handleCheckout}
                className="bg-[#E86C3B] hover:bg-[#d45a2a] text-white px-6 py-2 rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;