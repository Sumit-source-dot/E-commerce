// import AdminLayout from '../layouts/AdminLayout';
// import Profile from '../pages/admin/Profile';
// import { Navigate } from 'react-router-dom';
// import { adminAuthLoader } from './adminAuthLoader';
// import AdminLogin from '../pages/admin/Login';
// import AdminSignup from '../pages/admin/Signup';
// // import ProtectedRoute from './ProtectedRoute';

// const AdminRoutes = {
//   path: '/admin',
//   children: [
//     { path: 'login', element: <AdminLogin /> },
//     { path: 'signup', element: <AdminSignup /> },
//     {
//       path: '',
//       element: 
//        <AdminLayout />, 
//       loader: adminAuthLoader,
//       children: [
//         { index: true, element: <Navigate to="profile" /> },
//         { path: 'profile', element: <Profile /> },

//       ]
//     }
//   ]
// };

// export default AdminRoutes;/

import AdminLayout from '../layouts/AdminLayout';
import Profile from '../pages/admin/Profile';
import { Navigate } from 'react-router-dom';
import { adminAuthLoader } from './adminAuthLoader';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminSignup from '../pages/admin/AdminSignup';
import ProtectedRoute from './ProtectedRoute';


const AdminRoutes =  {
  path: '/admin',
  children: [
    { path: 'login', element: <AdminLogin /> },
    { path: 'signup', element: <AdminSignup /> },
    {
      path: '',
      element: (
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      loader: adminAuthLoader,
      children: [
        { index: true, element: <Navigate to="profile" /> },
        { path: 'profile', element: <Profile /> },

      ]
    }
  ]
};

export default AdminRoutes;
