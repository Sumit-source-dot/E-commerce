/E-commerce
├── /public
│   └── index.html
├── /src
│   ├── /assets                     # Images, logos, icons
│   ├── /components                # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   └── UserMenu.jsx           # User icon dropdown: Login/Signup/Logout
│   ├── /context                   # Global state (Cart, Auth)
│   │   ├── CartContext.js
│   │   └── AuthContext.js
│   ├── /layouts                   # App layouts
│   │   ├── CustomerLayout.jsx     # With Navbar + Footer
│   │   └── AdminLayout.jsx        # With Sidebar + Dashboard UI
│   ├── /pages
│   │   ├── /customer
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Artisans.jsx
│   │   │   ├── EmployeeLogin.jsx
│   │   │   └── EmployeeSignup.jsx
│   │   ├── /admin
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminSignup.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Profile.jsx
│   │   └── Error401.jsx           # 🔐 Unauthorized route
│   ├── /routes                    # Routing configs
│   │   ├── CustomerRoutes.jsx
│   │   ├── AdminRoutes.jsx
│   │   ├── CompoundRoutes.jsx     # Combines admin & customer routes
│   │   └── ProtectedRoute.jsx     # Guards for admin routes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Global Tailwind/custom CSS
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
