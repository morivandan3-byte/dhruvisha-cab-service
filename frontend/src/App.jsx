import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./sections/Home";
import About from "./sections/About";
import TripRoutes from "./sections/TripRoutes";
import Contact from "./sections/Contact";
import Bill from "./sections/Bill";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Home />
        <About />
        <TripRoutes />
        <Contact />
        <Bill />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard"element={<ProtectedAdminRoute>
          
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;