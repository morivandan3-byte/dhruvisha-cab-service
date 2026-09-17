import { useEffect, useState } from "react";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light",
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://dhruvisha-cab-service.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem(
        "adminData",
        JSON.stringify(data.admin),
      );

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10 text-gray-900 transition-colors dark:bg-[#050505] dark:text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Login Card */}
          <div className="relative w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-colors dark:border-white/10 dark:bg-[#0c0c0c] sm:p-8">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-yellow-400 hover:text-yellow-500 dark:border-white/10 dark:text-gray-300 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
                <ShieldCheck size={28} />
              </div>

              <h1 className="text-2xl font-bold">
                Admin Login
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to manage Dhruvisha Cab Service
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter admin email"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-[#151515] dark:text-white dark:placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-[#151515] dark:text-white dark:placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
              Authorized admin access only
            </p>
          </div>

          {/* Home Button */}
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-yellow-400 hover:text-yellow-500 dark:border-white/10 dark:bg-[#0c0c0c] dark:text-gray-300 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
            >
              <Home size={17} />
              Home / Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;