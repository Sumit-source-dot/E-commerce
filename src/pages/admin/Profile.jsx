import React from "react";


const Profile = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
       
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#2B2B2B]">Admin Profile</h1>
            <p className="text-[#5A5A5A] mt-2">Welcome back! Manage your profile and admin settings below.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <img
              src="https://i.imgur.com/0y8Ftya.png"
              alt="Admin Avatar"
              className="w-28 h-28 rounded-full border-4 border-[#2F7360] object-cover"
            />
          </div>
        </div>

     
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#5A5A5A]">Full Name</label>
              <p className="text-[#2B2B2B] font-medium">Ramesh Kumar</p>
            </div>
            <div>
              <label className="block text-[#5A5A5A]">Email Address</label>
              <p className="text-[#2B2B2B] font-medium">admin@artisanconnect.in</p>
            </div>
            <div>
              <label className="block text-[#5A5A5A]">Role</label>
              <p className="text-[#2B2B2B] font-medium">Administrator</p>
            </div>
            <div>
              <label className="block text-[#5A5A5A]">Location</label>
              <p className="text-[#2B2B2B] font-medium">Jaipur, Rajasthan</p>
            </div>
          </div>
        </section>

    
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button className="bg-[#E86C3B] text-white py-3 px-6 rounded hover:bg-[#cf5e30] font-semibold">
              Edit Profile
            </button>
            <button className="bg-[#F5B700] text-black py-3 px-6 rounded hover:bg-[#e0a900] font-semibold">
              View Orders
            </button>
            <button className="bg-[#3C4F76] text-white py-3 px-6 rounded hover:bg-[#2b3b5e] font-semibold">
              Manage Products
            </button>
          </div>
        </section>

       
        <section>
          <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-[#5A5A5A]">
            <li>
              <span className="text-[#E86C3B] font-medium">Updated</span> - Product "Handwoven Shawl - Kashmir"
            </li>
            <li>
              <span className="text-[#F5B700] font-medium">Viewed</span> - Order #12345
            </li>
            <li>
              <span className="text-[#2F7360] font-medium">Logged in</span> - 2 hours ago
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Profile;
