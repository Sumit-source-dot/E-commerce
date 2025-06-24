// import React from 'react';
// import { CartProvider } from "./context/CartContext";
// import './index.css'; // 
// import ReactDOM from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
// import router from './routes/CompoundRoutes'; // ✅ must match

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <CartProvider>
//     <RouterProvider router={router} />
//     </CartProvider>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import router from './routes/CompoundRoutes';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // ✅ import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap your app in AuthProvider */}
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
