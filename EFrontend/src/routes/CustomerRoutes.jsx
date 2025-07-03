import CustomerLayout from '../layouts/CustomerLayout';
import Home from '../pages/customer/Home';
import Shop from '../pages/customer/Shop';
import Artisans from '../pages/customer/Artisans';
import Unauthorized from '../pages/Unauthorized';
import EmployeeLogin from '../pages/customer/EmployeeLogin';
import EmployeeSignup from '../pages/customer/EmployeeSignup';
import Cart from '../pages/customer/Cart';
import CustomerSignup from "../pages/customer/CustomerSignup";
import CustomerLogin from "../pages/customer/CustomerLogin";
import Checkout from '../pages/customer/Checkout';
import OrderSuccess from '../pages/customer/OrderSuccess';


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
      path: 'order-success',
      element: <OrderSuccess />
    },
    {
      path: 'employee/login',
      element: <EmployeeLogin />
    },
    {
      path: 'employee/signup',
      element: <EmployeeSignup />
    },
      {
      path: 'customer/signup',
      element: <CustomerSignup />
    },
    {
      path: 'customer/login',
      element: <CustomerLogin/>
    },
    {
      path: '401',
      element: <Unauthorized />
    }
  ]
};

export default CustomerRoutes;
