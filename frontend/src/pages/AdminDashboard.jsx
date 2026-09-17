import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  FileText,
  IndianRupee,
  LogOut,
  MapPin,
  Moon,
  Phone,
  Search,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "https://dhruvisha-cab-service.onrender.com/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light",
  );

  const [dashboard, setDashboard] = useState({
    totalRides: 0,
    totalBillAmount: 0,
  });
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    loadDashboard();
    loadBills();
  }, [token, navigate]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const loadDashboard = async () => {
    try {
      const res = await fetch(`${API}/admin/dashboard`, { headers });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setDashboard(data.data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard.");
    }
  };

  const loadBills = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/admin/bills`, { headers });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setBills(data.bills || []);
    } catch (err) {
      setError(err.message || "Failed to load bills.");
    } finally {
      setLoading(false);
    }
  };

  const viewBill = async (id) => {
    try {
      setError("");

      const res = await fetch(`${API}/admin/bills/${id}`, { headers });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSelectedBill(data.bill);
    } catch (err) {
      setError(err.message || "Failed to load bill.");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const filteredBills = bills.filter((bill) => {
    const value = search.toLowerCase();

    return (
      bill.billNumber?.toLowerCase().includes(value) ||
      bill.customerName?.toLowerCase().includes(value) ||
      bill.mobile?.includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-[#050505] dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/95">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-black">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h1 className="text-base font-bold sm:text-lg">
                DHRUVISHA{" "}
                <span className="text-yellow-500 dark:text-yellow-400">
                  ADMIN
                </span>
              </h1>

              <p className="text-[11px] text-gray-500 sm:text-xs">
                Cab Service Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-yellow-400 hover:text-yellow-500 dark:border-white/10 dark:text-gray-300 dark:hover:text-yellow-400"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:border-red-400 hover:text-red-500 dark:border-white/10 dark:text-gray-300 dark:hover:border-red-500/40 dark:hover:text-red-400 sm:px-4"
            >
              <LogOut size={17} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:py-10">
        {/* Heading */}
        <div className="mb-7">
          <p className="mb-1 text-sm font-medium text-yellow-500 dark:text-yellow-400">
            Admin Dashboard
          </p>

          <h2 className="text-2xl font-bold sm:text-3xl">Overview</h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage rides and customer bills.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <StatCard
            title="Total Rides"
            value={dashboard.totalRides}
            text="Total generated bills"
            icon={<Car size={22} />}
          />

          <StatCard
            title="Total Bill Amount"
            value={`₹${dashboard.totalBillAmount.toLocaleString("en-IN")}`}
            text="Total amount from all rides"
            icon={<IndianRupee size={22} />}
          />
        </div>

        {/* Bills */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0c0c0c]">
          <div className="border-b border-gray-200 p-4 dark:border-white/10 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
                  <FileText size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">All Bills</h3>
                  <p className="text-xs text-gray-500">
                    {bills.length} total bills
                  </p>
                </div>
              </div>

              <div className="relative w-full sm:w-72">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search bill or customer..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-[#151515] dark:text-white dark:placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <EmptyState text="Loading bills..." />
          ) : filteredBills.length === 0 ? (
            <EmptyState text="No bills found." />
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-white/10">
              {filteredBills.map((bill) => (
                <button
                  key={bill._id}
                  onClick={() => viewBill(bill._id)}
                  className="flex w-full flex-col gap-3 p-4 text-left transition hover:bg-gray-50 dark:hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-yellow-500 dark:text-yellow-400">
                        {bill.billNumber}
                      </span>

                      <span className="text-xs text-gray-400 dark:text-gray-600">
                        {formatDate(bill.billDate)}
                      </span>
                    </div>

                    <p className="mt-2 truncate text-sm text-gray-700 dark:text-gray-300">
                      {bill.customerName}
                    </p>

                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-600">
                      {bill.mobile}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div>
                      <p className="font-semibold">
                        ₹{bill.totalAmount.toLocaleString("en-IN")}
                      </p>

                      <p className="mt-1 max-w-[220px] truncate text-xs text-gray-400 dark:text-gray-600">
                        {bill.pickup} → {bill.drop}
                      </p>
                    </div>

                    <p className="mt-2 text-xs text-yellow-500 dark:text-yellow-400">
                      View Details →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Bill Details */}
        {selectedBill && (
          <BillDetails
            bill={selectedBill}
            formatDate={formatDate}
            onBack={() => setSelectedBill(null)}
          />
        )}
      </main>
    </div>
  );
}

/* ---------- Stat Card ---------- */

function StatCard({ title, value, text, icon }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors dark:border-white/10 dark:bg-[#0c0c0c] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 truncate text-2xl font-bold sm:text-3xl">
            {value}
          </h3>

          <p className="mt-2 text-xs text-gray-400 dark:text-gray-600">
            {text}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-500 dark:text-yellow-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ---------- Empty State ---------- */

function EmptyState({ text }) {
  return (
    <div className="px-5 py-14 text-center text-sm text-gray-500">
      {text}
    </div>
  );
}

/* ---------- Bill Details ---------- */

function BillDetails({ bill, formatDate, onBack }) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0c0c0c]">
      <div className="border-b border-gray-200 p-4 dark:border-white/10 sm:p-6">
        <button
          onClick={onBack}
          className="mb-5 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to bills
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Bill Number
            </p>

            <h3 className="mt-1 text-2xl font-bold text-yellow-500 dark:text-yellow-400">
              {bill.billNumber}
            </h3>
          </div>

          <div className="rounded-lg bg-yellow-400/10 px-4 py-2">
            <p className="text-xs text-gray-500">Total Amount</p>

            <p className="text-lg font-bold text-yellow-500 dark:text-yellow-400">
              ₹{bill.totalAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-2">
        <InfoCard
          title="Customer Details"
          items={[
            [User, "Customer Name", bill.customerName],
            [Phone, "Mobile Number", bill.mobile],
          ]}
        />

        <InfoCard
          title="Trip Details"
          items={[
            [MapPin, "Route", `${bill.pickup} → ${bill.drop}`],
            [CalendarDays, "Bill Date", formatDate(bill.billDate)],
          ]}
        />

        <InfoCard
          title="Vehicle Details"
          items={[
            [Car, "Vehicle", bill.vehicle],
            [Car, "Vehicle Number", bill.vehicleNumber],
          ]}
        />

        <InfoCard
          title="Driver Details"
          items={[
            [User, "Driver Name", bill.driver],
            [Phone, "Driver Mobile", bill.driverMobile],
          ]}
        />
      </div>
    </section>
  );
}

/* ---------- Info Card ---------- */

function InfoCard({ title, items }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-[#111] sm:p-5">
      <h4 className="mb-5 font-semibold">{title}</h4>

      <div className="space-y-4">
        {items.map(([Icon, label, value]) => (
          <div key={label} className="flex gap-3">
            <Icon
              size={18}
              className="mt-0.5 shrink-0 text-yellow-500 dark:text-yellow-400"
            />

            <div className="min-w-0">
              <p className="text-xs text-gray-400 dark:text-gray-600">
                {label}
              </p>

              <p className="mt-1 break-words text-sm text-gray-700 dark:text-gray-300">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;