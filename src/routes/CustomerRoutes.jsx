import CustomerLayout from '../layouts/CustomerLayout';
import Home from '../pages/customer/Home';
import Shop from '../pages/customer/Shop';
import Artisans from '../pages/customer/Artisans';
import Unauthorized from '../pages/Unauthorized';
import CustomerLogin from '../pages/customer/EmployeeLogin';
import CustomerSignup from '../pages/customer/EmployeeSignup';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';


const CustomerRoutes = {
  path: '/',
  element: <CustomerLayout />,
  children: [
    {
      path: '',
      element: <Home />
    },
    {
      path: 'shop',
      element: <Shop />
    },
    {
      path: 'cart',
      element: <Cart />
    },
    {
      path: 'checkout',
      element: <Checkout />
    },
    {
      path: 'artisans',
      element: <Artisans />
    },
    {
      path: 'customer/login',
      element: <CustomerLogin />
    },
    {
      path: 'customer/signup',
      element: <CustomerSignup />
    },
    {
      path: '401',
      element: <Unauthorized />
    }
  ]
};

export default CustomerRoutes;
