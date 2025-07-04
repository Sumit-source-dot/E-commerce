import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, UserCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const [empDropdownOpen, setEmpDropdownOpen] = useState(false);
  const [custDropdownOpen, setCustDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const customerToken = localStorage.getItem("customerToken");

  const handleLogout = () => {
    localStorage.removeItem("role");
    setEmpDropdownOpen(false);
    navigate("/");
  };

  const handleCustomerLogout = () => {
    localStorage.removeItem("customerToken");
    setCustDropdownOpen(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar (md and larger screens) */}
      <nav className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow-md relative border-b border-[#5A5A5A]/20">
        {/* Left links */}
        <div className="flex gap-6 font-medium text-[#2B2B2B]">
          <Link to="/" className="hover:text-[#E86C3B] transition">Home</Link>
          <Link to="/shop" className="hover:text-[#E86C3B] transition">Shop</Link>
          <Link to="/artisans" className="hover:text-[#E86C3B] transition">Artisans</Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative group">
            <ShoppingCart className="w-6 h-6 text-[#2B2B2B] group-hover:text-[#E86C3B] transition" />
            <span className="absolute -top-2 -right-2 bg-[#E86C3B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Admin Shortcut */}
          <Link
            to="/admin/login"
            className="bg-[#3C4F76] text-white px-3 py-1.5 rounded text-sm hover:bg-[#2F7360] transition"
          >
            Admin Panel
          </Link>

          {/* Employee Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setEmpDropdownOpen(!empDropdownOpen);
                setCustDropdownOpen(false);
              }} 
              className="focus:outline-none group"
            >
              <User className="w-6 h-6 text-[#2B2B2B] group-hover:text-[#E86C3B] transition" />
            </button>

            {empDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 border">
                {!role ? (
                  <>
                    <Link
                      to="/employee/login"
                      onClick={() => setEmpDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Employee Login
                    </Link>
                    <Link
                      to="/employee/signup"
                      onClick={() => setEmpDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Employee Signup
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#E86C3B] hover:bg-[#F5B700]/10"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Customer Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setCustDropdownOpen(!custDropdownOpen);
                setEmpDropdownOpen(false);
              }} 
              className="focus:outline-none group"
            >
              <UserCircle className="w-6 h-6 text-[#2B2B2B] group-hover:text-[#E86C3B] transition" />
            </button>

            {custDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 border">
                {!customerToken ? (
                  <>
                    <Link
                      to="/customer/login"
                      onClick={() => setCustDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Customer Login
                    </Link>
                    <Link
                      to="/customer/signup"
                      onClick={() => setCustDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Customer Signup
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleCustomerLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#E86C3B] hover:bg-[#F5B700]/10"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar (sm and smaller screens) */}
      <nav className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-md relative border-b border-[#5A5A5A]/20">
        <button onClick={toggleMobileMenu} className="p-2">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-3">
          {/* Cart - Always visible */}
          <Link to="/cart" className="relative group">
            <ShoppingCart className="w-5 h-5 text-[#2B2B2B] group-hover:text-[#E86C3B] transition" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#E86C3B] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Admin Shortcut - Compact version */}
          <Link
            to="/admin/login"
            className="bg-[#3C4F76] text-white px-2 py-1 rounded text-xs hover:bg-[#2F7360] transition"
          >
            Admin
          </Link>

          {/* Employee Icon - Now visible on mobile */}
          <div className="relative">
            <button 
              onClick={() => {
                setEmpDropdownOpen(!empDropdownOpen);
                setCustDropdownOpen(false);
              }} 
              className="focus:outline-none group"
            >
              <User className="w-5 h-5 text-[#2B2B2B] group-hover:text-[#E86C3B] transition" />
            </button>

            {empDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50 border">
                {!role ? (
                  <>
                    <Link
                      to="/employee/login"
                      onClick={() => setEmpDropdownOpen(false)}
                      className="block px-3 py-1.5 text-xs text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Employee Login
                    </Link>
                    <Link
                      to="/employee/signup"
                      onClick={() => setEmpDropdownOpen(false)}
                      className="block px-3 py-1.5 text-xs text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Employee Signup
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-1.5 text-xs text-[#E86C3B] hover:bg-[#F5B700]/10"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Customer Icon */}
          <div className="relative">
            <button 
              onClick={() => {
                setCustDropdownOpen(!custDropdownOpen);
                setEmpDropdownOpen(false);
              }} 
              className="focus:outline-none group"
            >
              <UserCircle className="w-5 h-5 text-[#2B2B2B] group-hover:text-[#E86C3B] transition" />
            </button>

            {custDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50 border">
                {!customerToken ? (
                  <>
                    <Link
                      to="/customer/login"
                      onClick={() => setCustDropdownOpen(false)}
                      className="block px-3 py-1.5 text-xs text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Customer Login
                    </Link>
                    <Link
                      to="/customer/signup"
                      onClick={() => setCustDropdownOpen(false)}
                      className="block px-3 py-1.5 text-xs text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B]"
                    >
                      Customer Signup
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleCustomerLogout}
                    className="block w-full text-left px-3 py-1.5 text-xs text-[#E86C3B] hover:bg-[#F5B700]/10"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 border-b border-[#5A5A5A]/20">
          <Link 
            to="/" 
            onClick={toggleMobileMenu}
            className="block py-2 hover:text-[#E86C3B] transition"
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            onClick={toggleMobileMenu}
            className="block py-2 hover:text-[#E86C3B] transition"
          >
            Shop
          </Link>
          <Link 
            to="/artisans" 
            onClick={toggleMobileMenu}
            className="block py-2 hover:text-[#E86C3B] transition"
          >
            Artisans
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;