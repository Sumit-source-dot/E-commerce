import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EmployeeSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

const handleSignup = async (e) => {
  e.preventDefault();
  setErrors({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#%&*])[A-Za-z\d@!#%&*]{6,}$/;

  const validationErrors = {};
  if (!name.trim()) validationErrors.name = "Name is required";
  if (!emailRegex.test(email)) validationErrors.email = "Invalid email format";
  if (!passwordRegex.test(password)) {
    validationErrors.password = "Password must be 6+ chars with uppercase, number, and special char";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const res = await fetch("/api/employee/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ email: data.message || "Signup failed" });
      return;
    }

    login({ role: "customer", email: data.user.email });
    navigate("/");
  } catch (err) {
    console.error("Employee signup error:", err.message);
    setErrors({ email: "Something went wrong" });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#0369a1] p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-blue-100 mt-1">Join our artisan marketplace community</p>
        </div>

        <form onSubmit={handleSignup} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#0369a1] focus:border-transparent`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#0369a1] focus:border-transparent`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#0369a1] focus:border-transparent`}
            />
            {errors.password ? (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            ) : (
              <p className="text-gray-500 text-xs mt-1">6+ characters with uppercase, number, and special character</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0369a1] hover:bg-[#0284c7] text-white font-medium py-3 px-4 rounded-lg transition duration-300"
          >
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-600 pt-2">
            Already have an account?{" "}
            <Link to="/customer/login" className="text-[#0369a1] hover:underline font-medium">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeSignup;