import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSignup = async (e) => {
  e.preventDefault();
  setError("");

  console.log("Submitting Admin Signup:", { name, email, password }); // ✅ Debug log

  try {
    const res = await axios.post("https://e-commerce-omega-two-88.vercel.app//admin/signup", { name, email, password });

    login({ role: "admin", email: res.data.user.email });
    navigate("/admin");
  } catch (err) {
    console.error("Signup error:", err);
    setError(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8F8F8]">
      <div className="w-full max-w-md px-6">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Create Admin Account</h1>
          <p className="text-[#5A5A5A]">Set up your artisan marketplace admin dashboard</p>
        </div>

     
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#5A5A5A]/10">
          <div className="bg-[#2F7360] p-4 text-center">
            <h2 className="text-xl font-semibold text-white">Admin Registration</h2>
          </div>
          
          <form onSubmit={handleSignup} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-[#5A5A5A] mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-[#5A5A5A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#5A5A5A] mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
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
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-[#5A5A5A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-[#5A5A5A] mt-1">Use 8 or more characters</p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#E86C3B] hover:bg-[#d45a2a] text-white font-medium py-3 px-4 rounded-lg transition duration-300 mb-4"
            >
              Create Admin Account
            </button>

            <div className="text-center text-sm text-[#5A5A5A]">
              Already have an account?{" "}
              <Link 
                to="/admin/login" 
                className="text-[#3C4F76] hover:text-[#2F7360] font-medium"
              >
                Login instead
              </Link>
            </div>
          </form>
        </div>

      
        <div className="mt-8 text-center text-xs text-[#5A5A5A]">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
