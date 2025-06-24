import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); 

  const handleLogout = () => {
    localStorage.removeItem("role");
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative border-b border-[#5A5A5A]/20">

      <div className="flex gap-6 font-medium text-[#2B2B2B]">
        <Link 
          to="/" 
          className="hover:text-[#E86C3B] transition duration-300"
        >
          Home
        </Link>
        <Link 
          to="/shop" 
          className="hover:text-[#E86C3B] transition duration-300"
        >
          Shop
        </Link>
        <Link 
          to="/artisans" 
          className="hover:text-[#E86C3B] transition duration-300"
        >
          Artisans
        </Link>
      </div>

      <div className="flex items-center gap-4">
 
        <Link to="/cart" className="relative group">
          <ShoppingCart className="w-6 h-6 text-[#2B2B2B] group-hover:text-[#E86C3B] transition duration-300" />
          <span className="absolute -top-2 -right-2 bg-[#E86C3B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </Link>

        <Link
          to="/admin/login"
          className="bg-[#3C4F76] text-white px-3 py-1.5 rounded text-sm hover:bg-[#2F7360] transition duration-300"
        >
          Admin Panel
        </Link>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none group"
          >
            <User className="w-6 h-6 text-[#2B2B2B] group-hover:text-[#E86C3B] transition duration-300" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 border border-[#5A5A5A]/10">
              {!role ? (
                <>
                  <Link
                    to="/customer/login"
                    className="block px-4 py-2 text-sm text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B] transition duration-300"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Customer Login
                  </Link>
                  <Link
                    to="/customer/signup"
                    className="block px-4 py-2 text-sm text-[#2B2B2B] hover:bg-[#F5B700]/10 hover:text-[#E86C3B] transition duration-300"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Customer Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-[#E86C3B] hover:bg-[#F5B700]/10 transition duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;