import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("https://e-commerce-omega-two-88.vercel.app//admin/login", { email, password });

    // ✅ If successful
    const data = res.data;
    login({ role: "admin", email: data.user.email }); // set context
    navigate("/admin");
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8F8F8]">
      <div className="w-full max-w-md px-6">
    
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Admin Portal</h1>
          <p className="text-[#5A5A5A]">Access your artisan marketplace dashboard</p>
        </div>

       
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#5A5A5A]/10">
          <div className="bg-[#3C4F76] p-4 text-center">
            <h2 className="text-xl font-semibold text-white">Admin Login</h2>
          </div>
          
          <form onSubmit={handleLogin} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#5A5A5A] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-2 border border-[#5A5A5A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-[#5A5A5A] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#5A5A5A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#E86C3B] hover:bg-[#d45a2a] text-white font-medium py-3 px-4 rounded-lg transition duration-300"
            >
              Login to Dashboard
            </button>

            <div className="mt-4 text-center text-sm text-[#5A5A5A]">
              Don't have an account?{" "}
              <Link 
                to="/admin/signup" 
                className="text-[#3C4F76] hover:text-[#2F7360] font-medium"
              >
                Create one
              </Link>
            </div>
          </form>
        </div>

        
        <div className="mt-8 text-center text-xs text-[#5A5A5A]">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
