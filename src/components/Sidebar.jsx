import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="p-6 space-y-4 bg-white h-full shadow-sm border-r border-[#5A5A5A]/10">
      <Link 
        to="/" 
        className="flex items-center gap-3 p-3 rounded-lg text-[#2B2B2B] hover:text-[#E86C3B] hover:bg-[#F5B700]/10 transition duration-300"
      >
        <span>🏠</span>
        <span>Home</span>
      </Link>
      
    
      
      <Link 
        to="/shop" 
        className="flex items-center gap-3 p-3 rounded-lg text-[#2B2B2B] hover:text-[#E86C3B] hover:bg-[#F5B700]/10 transition duration-300"
      >
        <span>🛍️</span>
        <span>Shop</span>
      </Link>
      
      <Link 
        to="/artisans" 
        className="flex items-center gap-3 p-3 rounded-lg text-[#2B2B2B] hover:text-[#E86C3B] hover:bg-[#F5B700]/10 transition duration-300"
      >
        <span>👨‍🎨</span>
        <span>Artisans</span>
      </Link>

      <div className="border-t border-[#5A5A5A]/20 pt-4 mt-4">
     
        
        <Link 
          to="/cart" 
          className="flex items-center gap-3 p-3 rounded-lg text-[#2B2B2B] hover:text-[#2F7360] hover:bg-[#2F7360]/10 transition duration-300"
        >
          <span>📦</span>
          <span>Orders</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
