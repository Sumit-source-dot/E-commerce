import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/customers/login", formData);
      localStorage.setItem("customerToken", res.data.token);
      alert("Login successful!");
      navigate("/checkout"); // or redirect where needed
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Customer Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
      <button type="submit" className="w-full bg-green-600 text-white p-2">Log In</button>
    </form>
  );
};

export default CustomerLogin;
