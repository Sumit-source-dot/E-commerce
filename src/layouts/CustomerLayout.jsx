import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-white shadow p-4">
        <Navbar />
      </div>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
