import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerSignup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/customers/signup", formData);
      alert("Signup successful! Please log in.");
      navigate("/customer/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Customer Signup</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2">Sign Up</button>
    </form>
  );
};

export default CustomerSignup;
